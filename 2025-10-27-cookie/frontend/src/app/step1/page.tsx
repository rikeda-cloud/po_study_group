'use client';

import { useState } from 'react';
import ProductList from '@/components/ProductList';
import ShoppingCart from '@/components/ShoppingCart';
import { Container } from '@mui/material';
import { Product, CartItem } from '@/components/types';

export default function Step1() {
  // INFO 現在はuseStateによってカート内の情報を管理している。そのため、リロードするとカート内の情報が消える
  // INFO useStateでからの配列を用いて初期化しているが、Cookieの情報を初期化時に使用することで...
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      // すでにカート内に同じ商品があるなら個数を+1し、無いなら、商品を個数1で追加
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    // 引数に指定されたproductIdを削除
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <Container>
      <ProductList addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </Container>
  );
};
