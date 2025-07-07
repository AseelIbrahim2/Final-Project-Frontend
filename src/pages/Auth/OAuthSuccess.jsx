import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Box, CircularProgress, Typography } from '@mui/material';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      loginWithToken(token)
        .then(() => navigate('/dashboard'))
        .catch(() => navigate('/login?error=oauth_failed'));
    } else {
      navigate('/login');
    }
  }, [navigate, loginWithToken]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 3 }}>
        جارٍ تسجيل الدخول...
      </Typography>
    </Box>
  );
};

export default OAuthSuccess;