import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  alpha,
} from "@mui/material";

const ActivityTab = ({ recentActivities }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        borderRadius: 4,
        backgroundColor: isDark
          ? alpha("#4b2a7f", 0.75)  // deep purple with opacity in dark mode
          : "#fff",                // white background in light mode
        boxShadow: isDark
          ? "0 10px 25px rgba(123, 39, 193, 0.7)"  // purple glow shadow dark mode
          : "0 10px 25px rgba(118, 75, 162, 0.25)", // subtle purple shadow light mode
        p: 3,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={4}
        sx={{
          color: isDark ? "#fff" : "#000",  // white title in dark, black in light mode
          letterSpacing: 1,
          textTransform: "uppercase",
          fontWeight: 800,
          userSelect: "none",
        }}
      >
        Recent Activities & Highlights
      </Typography>

      <Box
        sx={{
          position: "relative",
          ml: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            left: 8,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: alpha(
              theme.palette.primary.main,
              isDark ? 0.6 : 0.4
            ),  // stronger purple line in dark mode
            borderRadius: 2,
          },
        }}
      >
        {recentActivities.map((activity, index) => (
          <Box
            key={activity.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: index === recentActivities.length - 1 ? 0 : 5,
              position: "relative",
              pl: 5,
              cursor: "default",
              transition: "background-color 0.3s ease",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  isDark ? 0.25 : 0.1
                ),
              },
            }}
          >
            {/* Timeline Dot with Icon */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                mt: "6px",
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: isDark ? "#4b2a7f" : "#fff",  // purple dot in dark, white in light
                boxShadow: `0 0 0 5px ${
                  isDark ? "#d07fff" : theme.palette.primary.main
                }`,  // pinkish ring in dark, purple ring in light
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: isDark
                  ? "#d8a8ff"
                  : theme.palette.primary.main, // light purple icon in dark, primary in light
                fontSize: 20,
              }}
            >
              <activity.icon fontSize="small" />
            </Box>

            {/* Activity Text */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: isDark ? "#e0b3ff" : theme.palette.primary.dark,
                  mb: 0.5,
                  fontWeight: 700,
                }}
              >
                {activity.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha(
                    isDark ? "#caa9ff" : theme.palette.primary.dark,
                    0.8
                  ),
                  mb: 0.3,
                }}
              >
                {activity.course}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(
                    isDark ? "#a67acc" : theme.palette.primary.main,
                    0.7
                  ),
                }}
              >
                {activity.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ActivityTab;
