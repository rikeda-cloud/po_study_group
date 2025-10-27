import { CartItem, Product } from '@/components/types';

export const products: Product[] = [
  { id: 1, name: 'りんご', price: 500 },
  { id: 2, name: 'バナナ', price: 300 },
  { id: 3, name: 'オレンジ', price: 100 },
  { id: 4, name: 'グレープ', price: 1000 },
  { id: 5, name: 'パイナップル', price: 1500 },
  { id: 6, name: 'メロン', price: 3000 },
];

export interface ResponseData {
  id: number;
  quantity: number;
}

export function prepro(data: ResponseData[]): CartItem[] {
  const cart: CartItem[] = [];

  for (const d of data) {
    const product = products.find(p => p.id === d.id);
    if (product) {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price, // Unit price
        quantity: d.quantity,
      });
    } else {
      console.warn(`Product with ID ${d.id} not found.`);
    }
  }
  return cart;
}
