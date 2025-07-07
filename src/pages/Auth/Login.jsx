import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ email, password });
      if (response.success) {
        switch (response.user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'instructor':
            navigate('/instructor-dashboard');
            break;
          case 'student':
            navigate('/student-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 6, mb: 6, p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Welcome Back
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please sign in to your account
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Sign in with Google
            </Button>

            {/* Centered sign-up link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link href="/register" variant="body2">
                Don&apos;t have an account? Sign up
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
