import { os } from "@orpc/server";
import { health } from "./health";

export const router = os.router({
  health,
});
