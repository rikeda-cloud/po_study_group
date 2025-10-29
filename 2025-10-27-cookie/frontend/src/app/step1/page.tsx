"use client";

import { useEffect, useState } from "react";
import ProductList, { products } from "@/components/ProductList";
import ShoppingCart from "@/components/ShoppingCart";
import { Container } from "@mui/material";
import { Product, CartItem } from "@/components/types";

export default function Step1() {
  // INFO 現在はuseStateによってカート内の情報を管理している。そのため、リロードするとカート内の情報が消える
  // INFO useStateでからの配列を用いて初期化しているが、Cookieの情報を初期化時に使用することで...
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("http://localhost:8989/api/step1/items", {
        credentials: "include",
      });

      if (!res.ok) return;
      const data = await res.json();

      const mergedCart = data.cart.map((cartItem: CartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        return {
          ...cartItem,
          name: product?.name ?? "不明",
          price: product?.price ?? 0,
        };
      });
      setCart(mergedCart);
    };

    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    const res = await fetch("http://localhost:8989/api/step1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 同一オリジンまたはCORS設定済みのAPIにクッキーが送信される
      body: JSON.stringify({
        item: product.id,
      }),
    });

    if (!res.ok) return;
    setCart((prevCart) => {
      // すでにカート内に同じ商品があるなら個数を+1し、無いなら、商品を個数1で追加
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (productId: number) => {
    // サーバー側のカートから商品を削除
    const res = await fetch(
      `http://localhost:8989/api/step1/items/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Container>
      <ProductList addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </Container>
  );
}
