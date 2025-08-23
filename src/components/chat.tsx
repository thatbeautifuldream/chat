"use client";

import { useChat } from "@ai-sdk/react";
import { eventIteratorToStream } from "@orpc/client";
import { client } from "@/lib/orpc";
import { useState } from "react";

export function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: {
      async sendMessages(options) {
        return eventIteratorToStream(
          await client.chat(
            {
              chatId: options.chatId,
              messages: options.messages,
            },
            { signal: options.abortSignal },
          ),
        );
      },
      reconnectToStream() {
        throw new Error("Unsupported");
      },
    },
  });
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-100 ml-auto max-w-xs"
                : "bg-gray-100 mr-auto max-w-xs"
            }`}
          >
            <div className="font-semibold text-sm mb-1">
              {message.role === "user" ? "You" : "AI"}
            </div>
            <div>
              {message.parts.map((part, partIndex) =>
                part.type === "text" ? (
                  <span key={`${message.id}-${partIndex}`}>{part.text}</span>
                ) : null,
              )}
            </div>
          </div>
        ))}
        {status === "streaming" && (
          <div className="bg-gray-100 mr-auto max-w-xs p-3 rounded-lg">
            <div className="font-semibold text-sm mb-1">AI</div>
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={status !== "ready"}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
