'use client';

import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography, Box } from '@mui/material';

interface AuthPageProps {
  onLogin: (username: string) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '32px', marginTop: '40px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          ログイン / サインアップ
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="ユーザー名"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 2 }}>
            <Button type="submit" fullWidth variant="contained">ログイン</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
