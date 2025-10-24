import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const steps = [
    // INFO ここに情報を追加し、Stepを増やせる
    {
      href: '/step1',
      primary: 'Step 1: クライアントサイドで完結する買い物カート',
      secondary: 'フロントエンドの改修のみで作成可能なCookieを用いた買い物カートを作成しよう'
    }
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '32px' }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>PO勉強会 Cookieについて学ぼう</Typography>
        <Typography variant="body1" align="center" paragraph>
          この勉強会はCookieについて学ぶためのものです。Stepを選んでください。
        </Typography>
        <List>
          {steps.map((step) => (
            <Link href={step.href} key={step.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={step.primary} secondary={step.secondary} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
