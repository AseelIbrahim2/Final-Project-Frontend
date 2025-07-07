import React, { useState } from 'react'; 
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  Email,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Lock,
  Person
} from '@mui/icons-material';

const SettingsPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [editNameMode, setEditNameMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (editNameMode && !user.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (editPasswordMode) {
      if (!user.currentPassword) {
        newErrors.currentPassword = 'Please provide your current password';
      }
      if (!user.newPassword) {
        newErrors.newPassword = 'New password cannot be empty';
      } else if (user.newPassword.length < 8) {
        newErrors.newPassword = 'New password must have at least 8 characters';
      }
      if (user.newPassword !== user.confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveName = () => {
    if (!validate()) return;
    setSuccessMessage('Your name has been updated!');
    setEditNameMode(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSavePassword = () => {
    if (!validate()) return;
    setSuccessMessage('Password changed successfully!');
    setUser(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setEditPasswordMode(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditNameMode(false);
    setEditPasswordMode(false);
    setErrors({});
    setUser(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        background: isDark
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
          : 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          borderRadius: '16px',
          background: isDark
            ? alpha(theme.palette.background.paper, 0.7)
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: isDark
            ? `0 8px 32px 0 ${alpha(theme.palette.primary.dark, 0.7)}`
            : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: isDark
            ? `1px solid ${alpha(theme.palette.primary.dark, 0.3)}`
            : '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Profile Management
        </Typography>

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 4,
              fontWeight: 600,
              borderRadius: '12px',
              backgroundColor: isDark ? '#27472f' : '#e6ffed',
              color: isDark ? '#a4f9a4' : '#2a662a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {successMessage}
          </Alert>
        )}

        {/* Email Display */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: isDark ? '#b39ddb' : '#7e57c2'
          }}
        >
          Registered Email
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 5,
          p: 1.5,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: '8px'
        }}>
          <IconButton aria-label="email" sx={{ color: '#667eea' }}>
            <Email />
          </IconButton>
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.primary, 
              fontWeight: 500 
            }}
          >
            {user.email}
          </Typography>
        </Box>

        {/* Name Section */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: isDark ? '#b39ddb' : '#7e57c2'
          }}
        >
          Display Name
        </Typography>

        {editNameMode ? (
          <Box sx={{ mb: 6, textAlign: 'left' }}>
            <TextField
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.primary.main
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.secondary.main
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#667eea' }} />
                  </InputAdornment>
                )
              }}
            />
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveName}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(90deg, #8561c5 0%, #8561c5 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(189, 105, 217, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(189, 105, 217, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                startIcon={<Cancel />}
                onClick={handleCancel}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(90deg, #482880 0%, #482880 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(133, 27, 195, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(133, 27, 195, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={3}
            alignItems="center"
            sx={{ mb: 6 }}
          >
            <Box sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: '8px'
            }}>
              <IconButton aria-label="name" sx={{ color: '#667eea' }}>
                <Person />
              </IconButton>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.primary, 
                  fontWeight: 500 
                }}
              >
                {user.name}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditNameMode(true)}
              fullWidth={isMobile}
              sx={{
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Modify
            </Button>
          </Stack>
        )}

        <Divider sx={{ 
          my: 4, 
          background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
          height: '2px'
        }} />

        {/* Password Section */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: isDark ? '#b39ddb' : '#7e57c2'
          }}
        >
          Security Credentials
        </Typography>

        {editPasswordMode ? (
          <Box sx={{ textAlign: 'left' }}>
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field, i) => {
              const labels = {
                currentPassword: 'Old Password',
                newPassword: 'New Password',
                confirmPassword: 'Verify New Password'
              };
              const showStates = {
                currentPassword: showCurrentPassword,
                newPassword: showNewPassword,
                confirmPassword: showConfirmPassword
              };
              const setShowStates = {
                currentPassword: setShowCurrentPassword,
                newPassword: setShowNewPassword,
                confirmPassword: setShowConfirmPassword
              };
              return (
                <TextField
                  key={field}
                  name={field}
                  label={labels[field]}
                  type={showStates[field] ? 'text' : 'password'}
                  value={user[field]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors[field]}
                  helperText={errors[field]}
                  sx={{
                    mb: i === 2 ? 4 : 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.main
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowStates[field](prev => !prev)}
                          edge="end"
                          aria-label={showStates[field] ? 'Hide password' : 'Show password'}
                        >
                          {showStates[field] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              );
            })}

            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSavePassword}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(90deg, #8561c5 0%, #8561c5 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(189, 105, 217, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(189, 105, 217, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Update Password
              </Button>
              <Button
                variant="contained"
                startIcon={<Cancel />}
                onClick={handleCancel}
                fullWidth={isMobile}
                sx={{
                  background: 'linear-gradient(90deg, #482880 0%, #482880 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(133, 27, 195, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(133, 27, 195, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setEditPasswordMode(true)}
            fullWidth={isMobile}
            sx={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Update Password
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SettingsPage;