import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GROQ_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
});
