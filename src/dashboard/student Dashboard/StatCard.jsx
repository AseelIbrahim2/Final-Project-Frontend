import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";

const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
  const theme = useTheme();
  const palette = theme.palette[color] || theme.palette.primary;

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: 160,
        borderRadius: 4,
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.mode === 'dark' ? '#1f1f1f' : '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        px: 3,
        py: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Avatar
  sx={{
    bgcolor: palette.main,
    background: `linear-gradient(135deg, ${palette.light} 0%, ${palette.main} 100%)`,
    color: '#fff',
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    fontSize: 28,
  }}
>
  {Icon && <Icon fontSize="medium" />}  {/* ✅ FIX: Ensure component renders */}
</Avatar>


      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textTransform: 'uppercase',
            color: theme.palette.text.secondary,
            letterSpacing: 0.5,
            fontSize: 12,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mt: 0.5,
            fontSize: '1.8rem',
            color: palette.main,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, mt: 0.5 }}
        >
          Updated just now
        </Typography>
      </Box>
    </Card>
  );
};

export default StatCard;
