
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Tune as TuneIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Article as CoursesIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: '600px',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.95rem',
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
    },
  },
}));

const Header = ({ mode, toggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleCoursesClick = () => {
    navigate('/course-management');
    handleMobileMenuClose();
  };

  const handleProfileClick = () => {
    navigate('/MyProfile');
    handleMenuClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 6,
        sx: {
          minWidth: '200px',
          borderRadius: theme.shape.borderRadius,
          mt: 1.5,
          bgcolor: mode === 'dark' ? '#1f153a' : theme.palette.background.paper,
        },
      }}
    >
      <MenuItem onClick={handleProfileClick}>
        <PersonIcon sx={{ mr: 1.5 }} /> Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <SchoolIcon sx={{ mr: 1.5 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          minWidth: '220px',
          borderRadius: theme.shape.borderRadius,
          bgcolor: mode === 'dark' ? '#1f153a' : theme.palette.background.paper,
          mt: 1,
        },
      }}
    >
      <MenuItem onClick={toggleDarkMode}>
        <IconButton size="small" color="inherit" sx={{ mr: 1.5 }}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {mode === 'light' ? 'Dark' : 'Light'} Mode
      </MenuItem>
      <MenuItem onClick={handleCoursesClick}>
        <IconButton size="small" color="inherit" sx={{ mr: 1.5 }}>
          <CoursesIcon />
        </IconButton>
        Courses
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: theme.palette.primary.dark,
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ minHeight: '75px !important', px: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 }
            }}
            onClick={() => navigate('/')}
          >
            <CoursesIcon sx={{ mr: 1.5, fontSize: 28, color: theme.palette.common.white }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: theme.palette.common.white,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Lurnex
            </Typography>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              color: theme.palette.common.white
            }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: theme.palette.common.white, opacity: 0.8 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search courses, materials..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton
                size="medium"
                onClick={toggleDarkMode}
                sx={{
                  color: theme.palette.common.white,
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.2)
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Chip
              icon={<CoursesIcon sx={{ color: `${theme.palette.common.white} !important` }} />}
              label="Courses"
              onClick={handleCoursesClick}
              sx={{
                height: '36px',
                bgcolor: alpha(theme.palette.common.white, 0.1),
                color: theme.palette.common.white,
                '&:hover': {
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                },
                cursor: 'pointer',
              }}
            />

            <Tooltip title="Account">
              <IconButton
                size="medium"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{
                  color: theme.palette.common.white,
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.2)
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: alpha(theme.palette.common.white, 0.2),
                    color: theme.palette.common.white
                  }}
                >
                  <PersonIcon fontSize="small" />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar sx={{ minHeight: '75px !important' }} />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
