import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";

const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
  const theme = useTheme();
  const mainColor = theme.palette[color]?.main || theme.palette.primary.main;
  const lightColor = theme.palette[color]?.light || theme.palette.primary.light;

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 160,
        borderRadius: 4,
        boxShadow: theme.shadows[6],
        background: theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 2,
        border: `1px solid ${alpha(mainColor, 0.2)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[10],
          transform: "translateY(-2px)",
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: lightColor,
          color: mainColor,
          width: 64,
          height: 64,
          boxShadow: theme.shadows[3],
          mr: 3,
        }}
      >
        {Icon && <Icon fontSize="large" />}
      </Avatar>

      <Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: mainColor,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export default StatCard;
