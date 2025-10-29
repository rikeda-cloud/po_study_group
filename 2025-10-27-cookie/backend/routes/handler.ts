import type { Context } from "hono";
import type { ApiStep1ItemsPostRequest } from "../../shared/api-types/models/ApiStep1ItemsPostRequest";

type CartItem = { id: number; quantity: number };

// カート情報をCookieから取得
function parseCartCookie(cookie: string | undefined): CartItem[] {
  if (!cookie) return [];
  try {
    const match = cookie.match(/cart=([^;]+)/);
    const cartValue = match ? match[1] : null;
    if (cartValue) return JSON.parse(cartValue);
  } catch {
    console.log("parse error");
    return [];
  }
  return [];
}

// カート情報をCookie文字列に変換
function cartToCookie(cart: CartItem[]): string {
  return `cart=${JSON.stringify(cart)}; HttpOnly`;
}

export async function handleGetCart(c: Context) {
  const cart = parseCartCookie(c.req.header("cookie"));

  return c.json({ cart: cart }, 200);
}

export async function handlePostCart(c: Context) {
  const cart = parseCartCookie(c.req.header("cookie"));

  const body = await c.req.json<ApiStep1ItemsPostRequest>();
  if (!body.item) return c.json({ error: "item is required" }, 400);

  const idx = cart.findIndex((e) => e.id === body.item);
  if (idx >= 0) cart[idx].quantity++;
  else cart.push({ id: body.item, quantity: 1 });

  c.header("Set-Cookie", cartToCookie(cart));
  return c.json({ cart: cart }, 201);
}

export function handleDeleteCart(c: Context) {
  const cart = parseCartCookie(c.req.header("cookie"));

  const itemId = Number(c.req.param("itemId"));

  const newCart = cart.filter((e) => e.id !== itemId);

  c.header("Set-Cookie", cartToCookie(newCart));
  return c.json({ cart: newCart }, 200);
}
