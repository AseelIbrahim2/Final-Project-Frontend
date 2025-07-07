import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import {
  MailOutline as ContactIcon,
  PhoneIphone as PhoneIcon,
  Place as LocationIcon,
  Twitter,
  LinkedIn,
  Instagram,
  Facebook,
  Article as CoursesIcon,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#F9FAFC" : theme.palette.navy[900],
        color: theme.palette.text.primary,
        py: 8,
        borderTop: `2px solid ${
          theme.palette.mode === "light" ? theme.palette.navy[200] : theme.palette.navy[700]
        }`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between" alignItems="flex-start">
          {/* Logo and Tagline */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <CoursesIcon
                sx={{
                  fontSize: 36,
                  color: theme.palette.primary.main,
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  userSelect: "none",
                }}
              >
                Lurnex
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, maxWidth: 320, lineHeight: 1.6 }}
            >
              Empowering learners worldwide with interactive and comprehensive courses
              designed for the future.
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <ContactIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                <Typography variant="body2" color="text.secondary">
                  contact@lurnex.com
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                <Typography variant="body2" color="text.secondary">
                  +962 7 8629 0
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                <Typography variant="body2" color="text.secondary">
                  Amman Innovation Hub, Jordan
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              {[Twitter, LinkedIn, Instagram, Facebook].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  aria-label="social media link"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? theme.palette.primary.light + "22"
                          : theme.palette.primary.dark + "44",
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            mt: 6,
            mb: 3,
            borderColor: theme.palette.mode === "light" ? theme.palette.navy[200] : theme.palette.navy[700],
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography>
            © {new Date().getFullYear()} Lurnex Learning Platform. All rights reserved.
          </Typography>
          <Typography sx={{ mt: { xs: 1, md: 0 } }}>Crafted with passion in Jordan</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
