import { os, streamToEventIterator, type } from "@orpc/server";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { groq } from "@ai-sdk/groq";

export const chat = os
  .input(type<{ chatId: string; messages: UIMessage[] }>())
  .handler(({ input }) => {
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      system: "You are a helpful assistant.",
      messages: convertToModelMessages(input.messages),
    });

    return streamToEventIterator(result.toUIMessageStream());
  });
