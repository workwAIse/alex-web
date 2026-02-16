"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Lottie from "lottie-react";
import aiLogoAnimation from "../../public/AI logo Foriday.json";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatModalProps {
  /** The job title that was clicked — drives the initial prompt when initialPrompt is not provided. */
  jobTitle: string;
  /** Called when the user closes the modal. */
  onClose: () => void;
  /** Optional: use this as the first user message instead of "Tell me more about {jobTitle}". */
  initialPrompt?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Stable AI avatar — extracted so it never remounts during streaming */
/* ------------------------------------------------------------------ */
const AiAvatar = memo(function AiAvatar() {
  return (
    <div className="mr-2 mt-1 flex h-12 w-12 shrink-0 items-center justify-center">
      <Lottie
        animationData={aiLogoAnimation}
        loop
        autoplay
        style={{ width: 48, height: 48 }}
      />
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ChatModal({ jobTitle, onClose, initialPrompt }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentInitial = useRef(false);

  /* Auto-scroll when messages change */
  useEffect(() => {
    const el = scrollRef.current;
    if (el && typeof el.scrollTo === "function") {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  /* Helper: update the last assistant message in the array */
  const updateLastAssistant = useCallback(
    (updater: (content: string) => string) => {
      setMessages((prev) => {
        const idx = prev.findLastIndex((m) => m.role === "assistant");
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], content: updater(updated[idx].content) };
        return updated;
      });
    },
    [],
  );

  /*
   * Buffered typewriter: accumulate incoming deltas in a queue,
   * then drain them in small chunks at a steady pace (~30 ms per chunk).
   */
  const textQueueRef = useRef("");
  const drainingRef = useRef(false);

  const drainQueue = useCallback(() => {
    if (drainingRef.current) return;
    drainingRef.current = true;

    const tick = () => {
      if (textQueueRef.current.length === 0) {
        drainingRef.current = false;
        return;
      }
      // Flush a small chunk each tick (2-4 chars) for a natural pace
      const chunkSize = Math.min(
        textQueueRef.current.length,
        Math.random() < 0.3 ? 4 : 2,
      );
      const chunk = textQueueRef.current.slice(0, chunkSize);
      textQueueRef.current = textQueueRef.current.slice(chunkSize);
      updateLastAssistant((prev) => prev + chunk);
      setTimeout(tick, 30);
    };
    tick();
  }, [updateLastAssistant]);

  const enqueueText = useCallback(
    (text: string) => {
      textQueueRef.current += text;
      drainQueue();
    },
    [drainQueue],
  );

  /* Send a message to the API and stream the response */
  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: Message = { role: "user", content: text };
      // Add user message + empty assistant placeholder in one batch
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "assistant", content: "" },
      ]);
      setLoading(true);
      textQueueRef.current = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, threadId }),
        });

        if (!res.ok) {
          let message = "Something went wrong. Please try again.";
          try {
            const data = (await res.json()) as { error?: string };
            if (typeof data?.error === "string" && data.error.trim()) {
              message = data.error;
            }
          } catch {
            // ignore non-JSON or parse errors
          }
          throw new Error(message);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let sseBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          sseBuffer += decoder.decode(value, { stream: true });

          // Process complete SSE lines
          const lines = sseBuffer.split("\n");
          sseBuffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const payload = trimmed.slice(6);
            if (payload === "[DONE]") continue;

            try {
              const event = JSON.parse(payload) as {
                type: string;
                threadId?: string;
                text?: string;
                message?: string;
              };

              if (event.type === "thread.id" && event.threadId) {
                setThreadId(event.threadId);
              } else if (event.type === "text.delta" && event.text) {
                enqueueText(event.text);
              } else if (event.type === "error") {
                textQueueRef.current = "";
                const msg =
                  typeof event.message === "string" && event.message.trim()
                    ? event.message
                    : "Something went wrong. Please try again.";
                updateLastAssistant(() => msg);
              }
            } catch {
              // ignore malformed JSON lines
            }
          }
        }

        // Wait for the typewriter queue to finish draining
        await new Promise<void>((resolve) => {
          const wait = () => {
            if (textQueueRef.current.length === 0 && !drainingRef.current) {
              resolve();
            } else {
              setTimeout(wait, 50);
            }
          };
          wait();
        });
      } catch (err) {
        textQueueRef.current = "";
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        updateLastAssistant(() => message);
      } finally {
        setLoading(false);
      }
    },
    [threadId, updateLastAssistant, enqueueText],
  );

  /* Auto-send the initial prompt on mount */
  useEffect(() => {
    if (hasSentInitial.current) return;
    hasSentInitial.current = true;
    const message =
      initialPrompt?.trim() || `Tell me more about ${jobTitle}`;
    sendMessage(message);
  }, [jobTitle, initialPrompt, sendMessage]);

  /* Handle form submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput("");
    sendMessage(trimmed);
  };

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="chat-backdrop"
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        style={{ cursor: "default" }}
        data-cursor-area="nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* macOS-style browser window */}
        <motion.div
          className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
          style={{ width: "min(720px, 92vw)", height: "min(560px, 80vh)" }}
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Title bar ── */}
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#f5f5f5] px-4 py-2.5">
            {/* Traffic lights */}
            <button
              onClick={onClose}
              className="group flex items-center justify-center h-3 w-3 rounded-full bg-[#ff5f57] transition-colors hover:bg-[#ff3b30]"
              aria-label="Close"
            >
              <svg
                className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 6 6"
                fill="none"
                stroke="#4a0002"
                strokeWidth="1.2"
              >
                <line x1="0.5" y1="0.5" x2="5.5" y2="5.5" />
                <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" />
              </svg>
            </button>
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />

            {/* Centered title */}
            <span className="flex-1 text-center text-xs font-medium text-black/50 select-none truncate">
              alex-buechel.com
            </span>

            {/* Spacer to balance traffic lights */}
            <span className="w-[52px]" />
          </div>

          {/* ── Chat messages ── */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white"
          >
            {messages.map((msg, i) =>
              /* Hide empty assistant placeholder (loading dots shown separately) */
              msg.role === "assistant" && msg.content === "" ? null : (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && <AiAvatar />}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#e8e8e8] text-black"
                      : "text-[#374151]"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>,
                        li: ({ children }) => <li className="mb-0.5">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => (
                          <code className="rounded bg-black/5 px-1.5 py-0.5 text-xs font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="my-2 overflow-x-auto rounded-lg bg-black/5 p-3 text-xs">
                            {children}
                          </pre>
                        ),
                        h1: ({ children }) => <h1 className="mb-2 text-lg font-bold">{children}</h1>,
                        h2: ({ children }) => <h2 className="mb-2 text-base font-bold">{children}</h2>,
                        h3: ({ children }) => <h3 className="mb-1.5 text-sm font-bold">{children}</h3>,
                        a: ({ children, href }) => (
                          <a href={href} className="text-indigo-600 underline hover:text-indigo-800" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-2 border-l-2 border-black/20 pl-3 italic text-black/60">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator — only while waiting for the first token */}
            {loading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" &&
              messages[messages.length - 1].content === "" && (
                <div className="flex justify-start">
                  <AiAvatar />
                  <div className="flex items-center gap-1.5 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-black/25 animate-[pulse_1.4s_ease-in-out_infinite]" />
                    <span className="h-2 w-2 rounded-full bg-black/25 animate-[pulse_1.4s_ease-in-out_0.2s_infinite]" />
                    <span className="h-2 w-2 rounded-full bg-black/25 animate-[pulse_1.4s_ease-in-out_0.4s_infinite]" />
                  </div>
                </div>
              )}
          </div>

          {/* ── Input bar ── */}
          <div className="border-t border-black/10 bg-[#f5f5f5]">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up..."
                disabled={loading}
                className="flex-1 rounded-lg bg-[#e8e8e8] px-4 py-2 text-sm text-black placeholder-black/40 outline-none ring-1 ring-black/10 focus:ring-black/25 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
            <p className="pb-3 text-center text-[11px] text-black/50">
              We don’t store your data but send it to OpenAI. AI can make
              mistakes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
