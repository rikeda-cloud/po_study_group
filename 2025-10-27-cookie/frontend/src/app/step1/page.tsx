'use client';

import { useState, useEffect } from 'react';
import ProductList from '@/components/ProductList';
import ShoppingCart from '@/components/ShoppingCart';
import { Container, CircularProgress, Alert } from '@mui/material';
import { Product, CartItem } from '@/components/types';

// APIのベースURL
const API_BASE_URL = 'http://localhost:8000';

export default function Step1() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ページ読み込み時にCookieからカート情報を取得
  useEffect(() => {
    const loadCartFromCookie = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/step1/items`, {
          credentials: 'include', // Cookieを含める
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCart(data.cart || []);
      } catch (error) {
        console.error('カート情報の読み込みに失敗:', error);
        setError('カート情報の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadCartFromCookie();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/step1/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Cookieを含める
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error('商品の追加に失敗:', error);
      setError('商品の追加に失敗しました');
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/step1/items/${productId}`, {
        method: 'DELETE',
        credentials: 'include', // Cookieを含める
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error('商品の削除に失敗:', error);
      setError('商品の削除に失敗しました');
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <p>カート情報を読み込み中...</p>
      </Container>
    );
  }

  return (
    <Container>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <ProductList addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </Container>
  );
}
