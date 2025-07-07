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

const AssignmentsTab = ({ assignments, onViewAssignment, onSubmitAssignment }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.text.primary}
        >
          Assignment Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            color: "#fff",
            px: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
          }}
          onClick={() => alert("Redirect to assignment submission form")}
        >
          New Assignment
        </Button>
      </Box>

      {/* Table Section */}
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
                    "Assignment",
                    "Course",
                    "Due Date",
                    "Submission Status",
                    "Grade",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow
                    key={assignment.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.course}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={assignment.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          color: "#fff",
                          backgroundColor:
                            assignment.status === "Submitted"
                              ? theme.palette.secondary.main
                              : alpha(theme.palette.primary.dark, 0.8),
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {assignment.grade === "-" ? "Not graded" : assignment.grade}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          assignment.status === "Submitted"
                            ? onViewAssignment(assignment)
                            : onSubmitAssignment(assignment)
                        }
                        sx={{
                          textTransform: "none",
                          borderRadius: "20px",
                          background:
                            assignment.status === "Submitted"
                              ? theme.palette.secondary.main
                              : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                          color: "#fff",
                          fontWeight: 600,
                          px: 2,
                          "&:hover": {
                            background:
                              assignment.status === "Submitted"
                                ? theme.palette.secondary.dark
                                : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          },
                        }}
                      >
                        {assignment.status === "Submitted" ? "View" : "Submit"}
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

export default AssignmentsTab;
