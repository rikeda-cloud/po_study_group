"use client";

import { Grid } from "@mui/material";
import { Product } from "@/components/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const products: Product[] = [
  { id: 1, name: "りんご", price: 500 },
  { id: 2, name: "バナナ", price: 300 },
  { id: 3, name: "オレンジ", price: 100 },
  { id: 4, name: "グレープ", price: 1000 },
  { id: 5, name: "パイナップル", price: 1500 },
  { id: 6, name: "メロン", price: 3000 },
];

interface ProductListProps {
  addToCart: (product: Product) => void;
}

export default function ProductList({ addToCart }: ProductListProps) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        商品リスト
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
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
}
