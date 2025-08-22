import { os } from "@orpc/server";

export const health = os.handler(() => {
  return {
    status: "chal raha hai server",
  };
});
