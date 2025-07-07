import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  Container,
  Grid,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import Timer from "./Timer";

const QuizPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

 const quizData = [
  {
    id: 1,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: 2,
    question: "Which HTML tag is used to link an external CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    correctAnswer: "<link>",
  },
  {
    id: 3,
    question: "How do you select an element with the class name 'container' in CSS?",
    options: [".container", "#container", "container", "*container"],
    correctAnswer: ".container",
  },
  {
    id: 4,
    question: "Which property is used to change the background color of an element?",
    options: ["color", "bgcolor", "background-color", "backgroundColor"],
    correctAnswer: "background-color",
  },
  {
    id: 5,
    question: "What is the correct CSS syntax to select all <p> elements?",
    options: ["p { }", ".p { }", "#p { }", "*p { }"],
    correctAnswer: "p { }",
  },
  {
    id: 6,
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correctAnswer: "font-size",
  },
  {
    id: 7,
    question: "How do you make text bold using CSS?",
    options: [
      "font-weight: bold;",
      "font-style: bold;",
      "text-weight: bold;",
      "text-style: bold;",
    ],
    correctAnswer: "font-weight: bold;",
  },
  {
    id: 8,
    question: "Which CSS property is used to control the spacing between lines of text?",
    options: ["line-height", "text-spacing", "letter-spacing", "word-spacing"],
    correctAnswer: "line-height",
  },
  {
    id: 9,
    question: "How do you select an element with the id 'header'?",
    options: ["#header", ".header", "*header", "header"],
    correctAnswer: "#header",
  },
  {
    id: 10,
    question: "What does the 'float' property do in CSS?",
    options: [
      "Positions an element to the left or right",
      "Changes the opacity",
      "Adds space around elements",
      "Centers the element horizontally",
    ],
    correctAnswer: "Positions an element to the left or right",
  },
];


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState([]);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  const handleAnswerSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleFlagQuestion = () => {
    setFlagged((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  const handleSubmit = () => {
    setOpenSubmitDialog(true);
  };

  const confirmSubmit = () => {
    alert("Quiz submitted! Answers: " + JSON.stringify(answers, null, 2));
    setOpenSubmitDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            CSS Fundemental Quiz
          </Typography>
          <Timer initialTime={600} onTimeUp={handleSubmit} />
        </Box>

        {/* Progress */}
        <LinearProgress
          variant="determinate"
          value={((currentQuestion + 1) / quizData.length) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 3,
            backgroundColor: isDark
              ? alpha(theme.palette.navy[900], 0.7)
              : alpha(theme.palette.navy[200], 0.7),
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        />

        {/* Question Section */}
        <Box
          sx={{
            backgroundColor: isDark
              ? theme.palette.navy[800]
              : alpha(theme.palette.primary.light, 0.15),
            borderRadius: 4,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            color={isDark ? theme.palette.navy[100] : theme.palette.primary.dark}
          >
            Question {currentQuestion + 1} of {quizData.length}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="medium"
            sx={{ mb: 2 }}
            color={theme.palette.text.primary}
          >
            {quizData[currentQuestion].question}
          </Typography>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onChange={(e) => handleAnswerSelect(e.target.value)}
          >
            {quizData[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {option}
                  </Typography>
                }
                sx={{
                  mb: 1,
                  px: 2,
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: isDark
                      ? alpha(theme.palette.navy[700], 0.3)
                      : alpha(theme.palette.primary.light, 0.3),
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Box>

        {/* Navigation */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            sx={{
              borderRadius: "20px",
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              "&:disabled": {
                color: alpha(theme.palette.primary.main, 0.4),
                borderColor: alpha(theme.palette.primary.main, 0.4),
              },
              "&:hover:not(:disabled)": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            ⬅ Previous
          </Button>

          <Box>
            <Tooltip title="Flag this question">
              <IconButton
                onClick={handleFlagQuestion}
                sx={{
                  color: flagged.includes(currentQuestion)
                    ? theme.palette.warning.main
                    : theme.palette.text.secondary,
                  transition: "0.3s",
                  "&:hover": { color: theme.palette.warning.main },
                }}
              >
                <FlagIcon />
              </IconButton>
            </Tooltip>

            {currentQuestion < quizData.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Next ➡
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: theme.palette.success.main,
                  "&:hover": {
                    backgroundColor: theme.palette.success.dark,
                  },
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>

        {/* Jump Buttons */}
        <Box mt={5}>
          <Typography
            variant="subtitle1"
            gutterBottom
            color={theme.palette.text.secondary}
          >
            Jump to Question:
          </Typography>
          <Grid container spacing={1}>
            {quizData.map((_, index) => (
              <Grid item key={index}>
                <Button
                  variant={currentQuestion === index ? "contained" : "outlined"}
                  color={
                    currentQuestion === index
                      ? "primary"
                      : flagged.includes(index)
                      ? "warning"
                      : answers[index]
                      ? "success"
                      : "inherit"
                  }
                  size="small"
                  sx={{
                    borderRadius: "50px",
                    minWidth: 40,
                    backgroundColor:
                      currentQuestion === index
                        ? theme.palette.primary.main
                        : undefined,
                    color:
                      currentQuestion === index
                        ? "#fff"
                        : flagged.includes(index)
                        ? theme.palette.warning.main
                        : answers[index]
                        ? theme.palette.success.main
                        : theme.palette.text.primary,
                    borderColor:
                      flagged.includes(index)
                        ? theme.palette.warning.main
                        : answers[index]
                        ? theme.palette.success.main
                        : undefined,
                    "&:hover": {
                      backgroundColor:
                        currentQuestion === index
                          ? theme.palette.primary.dark
                          : flagged.includes(index)
                          ? alpha(theme.palette.warning.main, 0.1)
                          : answers[index]
                          ? alpha(theme.palette.success.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* Submit Dialog */}
      <Dialog
        open={openSubmitDialog}
        onClose={() => setOpenSubmitDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <DialogTitle
          sx={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}
        >
          Confirm Submission
        </DialogTitle>
        <DialogContent>
          <Typography color={theme.palette.text.primary}>
            Are you sure you want to submit? You won't be able to change your
            answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSubmitDialog(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmSubmit}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Submit Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizPage;
