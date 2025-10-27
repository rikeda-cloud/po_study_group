import { serve } from "@hono/node-server";
import app from "./routes/app.js";

declare const Bun: any; // Bun型エラー回避

const port = 8989;
if (typeof Bun !== "undefined") {
  console.log(`Server started on http://localhost:${port} BUN!!!`);
  Bun.serve({ fetch: app.fetch, port });
} else {
  console.log(`Server started on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}
