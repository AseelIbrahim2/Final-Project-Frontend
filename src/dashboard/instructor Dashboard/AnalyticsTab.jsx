import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { Assessment as AnalyticsIcon } from "@mui/icons-material";

// Mock analytics data
const mockAnalytics = [
  {
    id: 1,
    course: "UI/UX Design Fundamentals",
    completionRate: 74,
    activeStudents: 32,
  },
  {
    id: 2,
    course: "Intro to Web Development",
    completionRate: 58,
    activeStudents: 45,
  },
  {
    id: 3,
    course: "Digital Marketing Essentials",
    completionRate: 91,
    activeStudents: 19,
  },
  {
    id: 4,
    course: "Business Strategy 101",
    completionRate: 68,
    activeStudents: 25,
  },
  {
    id: 5,
    course: "Mastering English Communication",
    completionRate: 82,
    activeStudents: 41,
  },
];

const AnalyticsTab = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      {mockAnalytics.map((course) => (
        <Grid item xs={12} md={4} key={course.id}>
          <Card
            elevation={6}
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.light, 0.1),
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2.5,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.04)",
                boxShadow: `0 8px 20px ${alpha(
                  theme.palette.primary.dark,
                  0.3
                )}`,
              },
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                color={theme.palette.primary.dark}
                gutterBottom
                sx={{ letterSpacing: 0.5 }}
              >
                {course.course}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: theme.palette.success.main }}
                >
                  Course Completion: {course.completionRate}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.completionRate}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: alpha(theme.palette.success.light, 0.3),
                    "& .MuiLinearProgress-bar": {
                      bgcolor: theme.palette.success.main,
                    },
                    mb: 3,
                  }}
                />

                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: theme.palette.warning.main }}
                >
                  Currently Active: {course.activeStudents} Students
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<AnalyticsIcon />}
              sx={{
                backgroundColor: theme.palette.primary.main,
                textTransform: "capitalize",
                fontWeight: 700,
                borderRadius: 2,
                py: 1.25,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: `0 6px 15px ${alpha(
                    theme.palette.primary.dark,
                    0.5
                  )}`,
                },
              }}
              fullWidth
              onClick={() => alert("Analytics details coming soon!")}
            >
              Explore Full Analytics
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AnalyticsTab;
