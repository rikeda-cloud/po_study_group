'use client';

import { CartItem } from './types';
import { List, Paper, ListItem, ListItemText, Button } from '@mui/material';

interface ShoppingCartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
}

export default function ShoppingCart({ cart, removeFromCart }: ShoppingCartProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '32px' }}>
      <List>
        {cart.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} x ${item.quantity}`}
              secondary={`${item.price * item.quantity}円`}
            />
            <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)}>
              削除
            </Button>
          </ListItem>
        ))}
        <ListItem><ListItemText primary={`合計: ${total}円`} /></ListItem>
      </List>
    </Paper>
  );
};
