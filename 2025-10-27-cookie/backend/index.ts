import { serve } from "@hono/node-server";
import app from "./routes/app.js";

declare const Bun: any; // Bun型エラー回避

const port = 3000;
if (typeof Bun !== "undefined") {
  console.log("Server started on http://localhost:3000 BUN!!!");
  Bun.serve({ fetch: app.fetch, port });
} else {
  console.log("Server started on http://localhost:3000");
  serve({ fetch: app.fetch, port });
}
