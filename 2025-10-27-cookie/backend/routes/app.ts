import { Hono } from "hono";
import { cors } from "hono/cors";
import { handleGetCart, handlePostCart, handleDeleteCart } from "./handler";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000", // フロントのURL
    credentials: true, // これでAccess-Control-Allow-Credentials: trueが付与される
  })
);

app.get("/", (c) => c.text("Hello Hono!"));

// カート取得
app.get("/api/step1/items", handleGetCart);

// カート追加
app.post("/api/step1/items", handlePostCart);

// カート商品削除
app.delete("/api/step1/items/:itemId", handleDeleteCart);

export default app;
