// // src/pages/Auth/Register.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { Box, Button, TextField, Typography, Link, Container, Grid } from '@mui/material';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await register({ name, email, password, confirm_password: confirmPassword });
//       if (response.success) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to register. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
        
//         {error && (
//           <Typography color="error" sx={{ mt: 2 }}>
//             {error}
//           </Typography>
//         )}
        
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Full Name"
//             name="name"
//             autoComplete="name"
//             autoFocus
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             autoComplete="new-password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="/login" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Register;



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
  Paper
} from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await register({
        name,
        email,
        password,
        confirm_password: confirmPassword
      });
      if (response.success) {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 6, mb: 6, p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Create Account
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Fill in the details to register
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
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
            >
              Sign Up
            </Button>

            {/* Centered sign-in link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
