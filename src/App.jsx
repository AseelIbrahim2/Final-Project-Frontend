import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
} from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseManagement from "./components/CourseManagement";
import QuizPage from "./components/QuizPage";
import MyProfile from "./components/MyProfile";
import StudentDashboard from "./dashboard/student Dashboard/StudentDashboard";
import AdminDashboard from "./dashboard/adminDashboards/AdminDashboard";
import InstructorDashboard from "./dashboard/instructor Dashboard/InstructorDashboard";
import NotFound from './pages/NotFound';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {

  const [mode, setMode] = useState("light");

const theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#03045E",     // Deep royal navy
      light: "#4361EE",    // Vivid blue-violet (great for hover/links)
      dark: "#001845",     // Slightly brighter than #01032F for better contrast
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#0077B6",      // Bright but rich cyan-blue
      light: "#48CAE4",     // Lighter blue for accent
      dark: "#023E8A",
      contrastText: "#FFFFFF"
    },
    error: {
      main: "#EF476F",
      light: "#FF6B81",
      dark: "#B9375E",
    },
    success: {
      main: "#06D6A0",
      light: "#5FE2BD",
      dark: "#049370",
    },
    warning: {
      main: "#FFD166",
      light: "#FFE29A",
      dark: "#CC9C30",
    },
    background: {
      default: mode === "light" ? "#F4F6FA" : "#0A1128",  // Deep blue-black instead of black
      paper: mode === "light" ? "#FFFFFF" : "#1B2A41"     // Subtle navy paper for cards/modals
    },
    text: {
      primary: mode === "light" ? "#212121" : "#F0F4FF",  // Very light blue-white
      secondary: mode === "light" ? "#616161" : "#AAB4D0"
    },
    navy: {
      50: "#E0E8FF",
      100: "#B2C1FF",
      200: "#809AFF",
      300: "#4D74FF",
      400: "#1B4DFF",
      500: "#0033CC",     // Custom usable blue (optional)
      600: "#0026A3",
      700: "#021F6D",
      800: "#011440",     // Great for dark surfaces
      900: "#01032F"      // True deep navy
    }
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  }
});


  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header mode={mode} toggleDarkMode={toggleDarkMode} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes with Role-Based Access */}
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/quiz/:quizId" element={<QuizPage />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/course-management" element={<CourseManagement />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Common Protected Routes (accessible to all authenticated users) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/MyProfile" element={<MyProfile />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;