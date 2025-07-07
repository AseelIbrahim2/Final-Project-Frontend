import React from "react";
import { Card, CardContent, Box, Typography, Avatar, useTheme } from "@mui/material";

const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: 160,
        borderRadius: 3,
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette[color]?.light || theme.palette.primary.light,
          color: theme.palette[color]?.main || theme.palette.primary.main,
          width: 64,
          height: 64,
          boxShadow: theme.shadows[5],
          mr: 3,
        }}
      >
        <Icon fontSize="large" />
      </Avatar>

      <Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 0.5 }}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export default StatCard;
