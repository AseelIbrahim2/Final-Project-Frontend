import React, { useState } from 'react';  
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Divider,
  IconButton,
  TextField,
  Button,
  Stack,
  Alert,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import { 
  Email, 
  Edit, 
  CameraAlt, 
  Save, 
  Cancel, 
  Visibility, 
  VisibilityOff, 
  Lock, 
  Person 
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

import userService from '../services/userService';  // Import your userService

const MyProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // User data state
  const [user, setUser] = useState({
    name: 'Roz Smith',
    email: 'Roz_S2@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    bio: 'UI/UX experienced in Designing user friendly websites.'
  });

  // Editable temp states
  const [tempName, setTempName] = useState(user.name);
  const [tempEmail, setTempEmail] = useState(user.email);
  const [tempBio, setTempBio] = useState(user.bio);
  const [tempAvatar, setTempAvatar] = useState(user.avatarUrl);

  // Password change fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [editMode, setEditMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation errors & success
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle avatar upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation function for profile
  const validateProfile = () => {
    const newErrors = {};
    if (!tempName.trim()) newErrors.name = 'Please enter your full name';
    if (!tempEmail.trim()) newErrors.email = 'Please enter your email';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempEmail)) newErrors.email = 'Invalid email format';
    }
    return newErrors;
  };

  // Validation function for password
  const validatePassword = () => {
    const newErrors = {};
    if (!currentPassword) newErrors.currentPassword = 'Please enter current password';
    if (!newPassword) newErrors.newPassword = 'New password cannot be empty';
    else if (newPassword.length < 8) newErrors.newPassword = 'New password must have at least 8 characters';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    return newErrors;
  };

  // Save profile changes (local for now)
  const handleSaveProfile = () => {
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setUser({
      name: tempName,
      email: tempEmail,
      bio: tempBio,
      avatarUrl: tempAvatar
    });
    setErrors({});
    setSuccessMessage('Profile updated successfully!');
    setEditMode(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Save password change — use userService API call here
  const handleSavePassword = async () => {
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await userService.changePassword(currentPassword, newPassword, confirmPassword);
      if (response.success) {
        setErrors({});
        setSuccessMessage(response.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setEditPasswordMode(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        // Show API error message if any
        setErrors({ currentPassword: response.message || 'Failed to change password' });
      }
    } catch (error) {
      setErrors({ currentPassword: error.message || 'Failed to change password' });
    }
  };

  // Cancel editing profile
  const handleCancelProfile = () => {
    setTempName(user.name);
    setTempEmail(user.email);
    setTempBio(user.bio);
    setTempAvatar(user.avatarUrl);
    setErrors({});
    setEditMode(false);
  };

  // Cancel editing password
  const handleCancelPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setEditPasswordMode(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
          : 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 700,
          width: '100%',
          textAlign: 'center',
          borderRadius: '16px',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.7)
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark'
            ? `0 8px 32px 0 ${alpha(theme.palette.primary.dark, 0.7)}`
            : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: theme.palette.mode === 'dark'
            ? `1px solid ${alpha(theme.palette.primary.dark, 0.3)}`
            : '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          User Profile
        </Typography>

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              fontWeight: 600,
              borderRadius: '12px',
              backgroundColor: theme.palette.mode === 'dark' ? '#27472f' : '#e6ffed',
              color: theme.palette.mode === 'dark' ? '#a4f9a4' : '#2a662a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {successMessage}
          </Alert>
        )}

        {/* Avatar with upload */}
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
          <Avatar
            alt={tempName}
            src={editMode ? tempAvatar : user.avatarUrl}
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto',
              border: `4px solid ${theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffffff'}`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(255, 255, 255, 0.15)'
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: editMode ? 'scale(1.05)' : 'scale(1)'
              }
            }}
          />
          {editMode && (
            <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light
                    }
                  }}
                >
                  <CameraAlt />
                </IconButton>
              </label>
            </>
          )}
        </Box>

        {/* Editable Name */}
        <Box sx={{ mb: 3, textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.main
            }}
          >
            Display Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: theme.palette.primary.main }} />
                </InputAdornment>
              )
            }}
            sx={{ borderRadius: '12px' }}
            disabled={!editMode}
          />
        </Box>

        {/* Editable Email */}
        <Box sx={{ mb: 3, textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.main
            }}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={tempEmail}
            onChange={e => setTempEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: theme.palette.primary.main }} />
                </InputAdornment>
              )
            }}
            sx={{ borderRadius: '12px' }}
            disabled={!editMode}
          />
        </Box>

        {/* Editable Bio */}
        <Box sx={{ mb: 4, textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.main
            }}
          >
            Bio
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={tempBio}
            onChange={e => setTempBio(e.target.value)}
            sx={{
              borderRadius: '12px',
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.secondary.main }
            }}
            disabled={!editMode}
          />
        </Box>

        {/* Profile action buttons */}
        {!editMode ? (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setEditMode(true)}
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: theme.palette.primary.contrastText,
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: `0 4px 15px ${alpha(theme.palette.primary.light, 0.4)}`,
              '&:hover': {
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.light, 0.6)}`,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveProfile}
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: theme.palette.primary.contrastText,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: `0 4px 15px ${alpha(theme.palette.secondary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
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
              onClick={handleCancelProfile}
              sx={{
                background: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.dark, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.dark, 0.6)}`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}

        <Divider sx={{ 
          my: 4, 
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.light}, transparent)`,
          height: '2px'
        }} />

        {/* Password Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.main,
            letterSpacing: 1.2
          }}
        >
          Security Credentials
        </Typography>

        {editPasswordMode ? (
          <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
            {/* Password fields */}
            <TextField
              label="Current Password"
              name="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              sx={{ mb: 3, borderRadius: '12px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPassword(p => !p)}
                      edge="end"
                      aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="New Password"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              sx={{ mb: 3, borderRadius: '12px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(p => !p)}
                      edge="end"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 3, borderRadius: '12px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(p => !p)}
                      edge="end"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSavePassword}
                sx={{
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: theme.palette.primary.contrastText,
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Save Password
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancelPassword}
                sx={{
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.contrastText,
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
            startIcon={<Lock />}
            onClick={() => setEditPasswordMode(true)}
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: theme.palette.primary.contrastText,
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Change Password
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default MyProfile;
