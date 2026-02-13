import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const getOpenAI = () =>
  new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

/** Strip OpenAI-style citations 【...】 from text. Handles citations split across chunks. */
function stripCitations(chunk: string, buffer: { value: string }): string {
  const s = buffer.value + chunk;
  buffer.value = "";
  let out = "";
  let i = 0;
  while (i < s.length) {
    const open = s.indexOf("【", i);
    if (open === -1) {
      out += s.slice(i);
      break;
    }
    out += s.slice(i, open);
    const close = s.indexOf("】", open);
    if (close === -1) {
      buffer.value = s.slice(open);
      break;
    }
    i = close + 1;
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!apiKey?.trim() || !assistantId?.trim()) {
      return NextResponse.json(
        {
          error:
            "OpenAI is not configured. Add OPENAI_API_KEY and OPENAI_ASSISTANT_ID in Vercel Project Settings → Environment Variables, then redeploy.",
        },
        { status: 503 },
      );
    }

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

    const openai = getOpenAI();

    // Reuse existing thread or create a new one
    const thread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // Stream the assistant's response
    const assistantStream = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId, // already validated above
    });

    // Build a ReadableStream that forwards SSE events to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        // First event: send the threadId so the client can track conversations
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "thread.id", threadId: thread.id })}\n\n`,
          ),
        );

        // Listen for text deltas, strip citations 【...】, then forward
        const citationBuffer = { value: "" };
        assistantStream.on("textDelta", (delta) => {
          if (delta.value) {
            const cleaned = stripCitations(delta.value, citationBuffer);
            if (cleaned) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "text.delta", text: cleaned })}\n\n`,
                ),
              );
            }
          }
        });

        // When the run completes, signal done and close
        assistantStream.on("end", () => {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });

        // Handle errors
        assistantStream.on("error", (err) => {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: err instanceof Error ? err.message : "Stream error" })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
