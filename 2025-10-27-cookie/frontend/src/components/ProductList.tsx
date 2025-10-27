'use client';

import { Grid } from '@mui/material';
import { Product } from '@/components/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { products } from '@/utils/cart';

interface ProductListProps {
  addToCart: (product: Product) => void;
}

export default function ProductList({ addToCart }: ProductListProps) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>商品リスト</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography color="text.secondary">
                  価格: {product.price}円
                </Typography>
                <Button variant="contained" onClick={() => addToCart(product)}>
                  カートに追加
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
