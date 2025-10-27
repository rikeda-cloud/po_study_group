import { Hono } from "hono";
import type { ApiStep1ItemsPostRequest } from "../../shared/api-types/models/ApiStep1ItemsPostRequest";

type CartItem = { id: number; quantity: number };

const app = new Hono();

// カート情報をCookieから取得
function parseCartCookie(cookie: string | undefined): CartItem[] {
  if (!cookie) return [];
  try {
    const value = cookie.split("cart=")[1];
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

// カート情報をCookie文字列に変換
function cartToCookie(cart: CartItem[]): string {
  return `cart=${JSON.stringify(cart)}; HttpOnly`;
}

app.get("/", (c) => c.text("Hello Hono!"));

// // カート取得
app.get("/api/step1/items", (c) => {
  const cart = parseCartCookie(c.req.header("cookie"));
  return c.json({ cart: cart }, 200);
});

// カート追加
app.post("/api/step1/items", async (c) => {
  const cart = parseCartCookie(c.req.header("cookie"));

  const body = await c.req.json<ApiStep1ItemsPostRequest>();
  if (!body.item) return c.json({ error: "item is required" }, 400);

  const idx = cart.findIndex((e) => e.id === body.item);
  if (idx >= 0) cart[idx].quantity++;
  else cart.push({ id: body.item, quantity: 1 });

  c.header("Set-Cookie", cartToCookie(cart));
  return c.json({ cart: cart }, 201);
});

//  カート商品削除
app.delete("/api/step1/items/:itemId", (c) => {
  const cart = parseCartCookie(c.req.header("cookie"));

  const itemId = Number(c.req.param("itemId"));

  const newCart = cart.filter((e) => e.id !== itemId);

  c.header("Set-Cookie", cartToCookie(newCart));
  return c.json({ cart: newCart }, 200);
});

export default app;
