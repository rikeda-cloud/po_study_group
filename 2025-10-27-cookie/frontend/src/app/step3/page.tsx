'use client';

import { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import ProductList from '@/components/ProductList';
import ShoppingCart from '@/components/ShoppingCart';
import { Container, Box, Button } from '@mui/material';
import { Product, CartItem } from '@/components/types';

export default function Step2Page() {
  // INFO 現在はuseStateで認証済みかどうかを管理しているだけ
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Mock login logout
  const handleLogin = (username: string) => { setIsAuthenticated(true); };
  const handleLogout = () => { setIsAuthenticated(false); };

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
    <div>
      {isAuthenticated ? (
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
            <Button variant="outlined" onClick={handleLogout}>
              ログアウト
            </Button>
          </Box>
          <ProductList addToCart={addToCart} />
          <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
        </Container>
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
};
