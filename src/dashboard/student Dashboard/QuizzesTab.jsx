import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";

const QuizzesTab = ({ quizzes, onTakeQuiz }) => {
  const theme = useTheme();

  // Define gradient colors based on theme primary colors for buttons
  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const primaryGradientHover = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.text.primary}
        >
          Quiz Performance Overview
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: primaryGradient,
            color: "#fff",
            px: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              background: primaryGradientHover,
            },
          }}
          onClick={() => alert("Redirect to available quizzes")}
        >
          Browse Quizzes
        </Button>
      </Box>

      {/* Table */}
      <Card
        sx={{
          borderRadius: 4,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableRow>
                  {[
                    "Quiz Title",
                    "Associated Course",
                    "Date Attempted",
                    "Score",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow
                    key={quiz.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary }}>{quiz.title}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{quiz.course}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{quiz.dateTaken || "Not attempted"}</TableCell>
                    <TableCell>
                      {quiz.score === "Pending" ? (
                        <Chip
                          label="Pending"
                          size="small"
                          sx={{
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor: alpha(theme.palette.primary.dark, 0.85),
                          }}
                        />
                      ) : (
                        <Chip
                          label={`${quiz.score}`}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            backgroundColor: theme.palette.success.main,
                            color: "#fff",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant={quiz.score === "Pending" ? "contained" : "outlined"}
                        onClick={() => quiz.score === "Pending" && onTakeQuiz(quiz.id)}
                        sx={{
                          textTransform: "none",
                          borderRadius: "20px",
                          fontWeight: 600,
                          px: 2,
                          color:
                            quiz.score === "Pending"
                              ? "#fff"
                              : theme.palette.primary.main,
                          background:
                            quiz.score === "Pending" ? primaryGradient : "transparent",
                          borderColor:
                            quiz.score === "Pending"
                              ? "transparent"
                              : theme.palette.primary.main,
                          "&:hover": {
                            background:
                              quiz.score === "Pending"
                                ? primaryGradientHover
                                : alpha(theme.palette.primary.main, 0.15),
                          },
                        }}
                      >
                        {quiz.score === "Pending" ? "Take Quiz" : "Review"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizzesTab;
