import { os } from "@orpc/server";
import { health } from "./health";
import { chat } from "./chat";

export const router = os.router({
  health,
  chat,
});
