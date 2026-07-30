"use client";

import { useState, useRef, useEffect } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm Cashew Advisor, your AI lending assistant. I can help you with loan pre-qualification, repayment planning, and credit counseling.\n\nTo get started, tell me a bit about what you're looking for — for example, how much you'd like to borrow, your annual income, or your credit score range.",
};

function streamText(
  text: string,
  onUpdate: (partial: string) => void,
  onDone: () => void
) {
  let index = 0;
  const interval = setInterval(() => {
    index += Math.floor(Math.random() * 3) + 1;
    if (index >= text.length) {
      onUpdate(text);
      clearInterval(interval);
      onDone();
    } else {
      onUpdate(text.slice(0, index));
    }
  }, 15);
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingIndex, setStreamingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingIndex]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };

      const withPlaceholder = [...updatedMessages, { ...assistantMessage, content: "" }];
      const newIndex = withPlaceholder.length - 1;
      setMessages(withPlaceholder);
      setStreamingIndex(newIndex);

      streamText(
        data.response,
        (partial) => {
          setMessages((prev) => {
            const next = [...prev];
            next[newIndex] = { role: "assistant", content: partial };
            return next;
          });
        },
        () => {
          setStreamingIndex(null);
          setIsLoading(false);
        }
      );
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground shadow-sm"
                }`}
              >
                {message.role === "assistant" && (
                  <p className="mb-1 text-xs font-semibold text-primary">
                    Cashew Advisor
                  </p>
                )}
                {message.content}
                {streamingIndex === i && (
                  <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary/60" />
                )}
              </div>
            </div>
          ))}

          {isLoading && streamingIndex === null && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                <p className="mb-1 text-xs font-semibold text-primary">
                  Cashew Advisor
                </p>
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border bg-white px-4 py-4 md:px-6">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about loans, rates, or repayment plans..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
