import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const steps = [
    {
      href: '/step1',
      primary: 'Step 1: ClientSessionで完結する買い物カート',
      secondary: 'ClientSessionを実現するためのAPIサーバを立て、Cookieを用いた買い物カートを作成しよう'
    },
    {
      href: '/step2',
      primary: 'Step 2: ServerSessionで実現する買い物カート',
      secondary: 'ServerSessionを実現するためのAPIサーバを立て、ログイン機能とSessionを用いた買い物カートを作成しよう'
    },
    {
      href: '/step3',
      primary: 'Step 3: JWTで実現する買い物カート',
      secondary: 'JWT認証を実現するための認証サーバとAPIサーバを立て、ログイン機能とSessionを用いた買い物カートを作成しよう'
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
