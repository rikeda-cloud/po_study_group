'use client';

import { useState } from 'react';
import ProductList from '@/components/ProductList';
import ShoppingCart from '@/components/ShoppingCart';
import { Container } from '@mui/material';
import { Product, CartItem } from '@/components/types';
import { prepro } from '@/utils/cart';

export default function Step1() {
  // INFO 現在はuseStateによってカート内の情報を管理している。そのため、リロードするとカート内の情報が消える
  // INFO useStateでからの配列を用いて初期化しているが、Cookieの情報を初期化時に使用することで...
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    fetch("http://localhost:8000/api/step1/items", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id: product.id })
    })
      .then(response => response.json())
      .then(data => {
        setCart(prepro(data));
        console.log(data); // サーバーからの応答を表示
      })
      .catch(error => {
        console.error('エラー:', error); // エラーハンドリング
      });
  };

  const removeFromCart = (productId: number) => {
    fetch(`http://localhost:8000/api/step1/items/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setCart(prepro(data));
        console.log(data); // サーバーからの応答を表示
      })
      .catch(error => {
        console.error('エラー:', error); // エラーハンドリング
      });
  };

  return (
    <Container>
      <ProductList addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </Container>
  );
};
