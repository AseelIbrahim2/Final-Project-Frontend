// ✅ Updated CourseManagement.jsx for Lurnex - Navy Theme & Fresh Data

import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  TextField,
  Box,
  useTheme,
  alpha,
} from "@mui/material";

// ✅ New mock data (customized)
const initialCourses = [
  {
    id: 1,
    title: "Full Stack Web Dev",
    description: "Build responsive websites using HTML, CSS, JS, and backend tools.",
    category: "Programming",
    thumbnail: "https://images.unsplash.com/photo-1581093588401-004c4a76f97a?auto=format&fit=crop&w=1200&q=80",
    enrolled: false,
  },
  {
    id: 2,
    title: "Effective Communication",
    description: "Enhance your communication skills for teams and interviews.",
    category: "Soft Skills",
    thumbnail: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80",
    enrolled: false,
  },
  {
    id: 3,
    title: "Creative Branding",
    description: "Design branding strategies that leave a lasting impression.",
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    enrolled: false,
  },
  {
    id: 4,
    title: "Data Analysis with Excel",
    description: "Learn how to clean, visualize, and analyze data using Excel.",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1581090700227-1f7a7fe20b5d?auto=format&fit=crop&w=1200&q=80",
    enrolled: false,
  },
];

const CourseManagement = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState(initialCourses);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Programming", "Marketing", "Business", "Soft Skills"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, enrolled: !course.enrolled } : course
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 3,
        background: theme.palette.background.default,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            Courses
          </Typography>

          <TextField
            label="Search Courses"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 300,
              background: alpha(theme.palette.common.white, 0.07),
              borderRadius: 2,
              input: { color: theme.palette.text.primary },
            }}
          />
        </Box>

        {/* Categories */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              sx={{
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "25px",
                backgroundColor: category === cat ? theme.palette.primary.main : "transparent",
                color: category === cat ? "#fff" : theme.palette.text.primary,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  backgroundColor:
                    category === cat ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Cards */}
        <Grid container spacing={3} alignItems="stretch">
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id} display="flex">
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha("#ffffff", 0.03)
                      : alpha(theme.palette.primary.light, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? `0 4px 20px rgba(255,255,255,0.03)`
                      : `0 4px 20px rgba(0,0,0,0.04)`,
                }}
              >
                <CardMedia component="img" height="160" image={course.thumbnail} alt={course.title} />
                <CardContent>
                  <Chip
                    label={course.category}
                    size="small"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      backgroundColor: theme.palette.secondary.main,
                      color: "#fff",
                    }}
                  />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.8) }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleEnroll(course.id)}
                    sx={{
                      borderRadius: "25px",
                      backgroundColor: course.enrolled
                        ? theme.palette.success.main
                        : theme.palette.primary.main,
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: "bold",
                      '&:hover': {
                        boxShadow: `0 0 12px ${alpha(theme.palette.primary.light, 0.4)}`,
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {course.enrolled ? "Enrolled" : "Enroll Now"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseManagement;
