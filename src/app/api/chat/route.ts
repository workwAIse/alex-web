import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = (await req.json()) as {
      message: string;
      threadId?: string;
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    // Reuse existing thread or create a new one
    const thread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // Run the assistant and wait for completion (SDK handles polling)
    await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Fetch the latest assistant message
    const messages = await openai.beta.threads.messages.list(thread.id, {
      order: "desc",
      limit: 1,
    });

    const assistantMsg = messages.data.find((m) => m.role === "assistant");

    let responseText = "Sorry, I couldn't generate a response.";
    if (assistantMsg) {
      const textBlock = assistantMsg.content.find((c) => c.type === "text");
      if (textBlock && textBlock.type === "text") {
        responseText = textBlock.text.value;
      }
    }

    return NextResponse.json({
      response: responseText,
      threadId: thread.id,
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
