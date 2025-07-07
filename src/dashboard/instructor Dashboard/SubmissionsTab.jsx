import React, { useState } from "react";
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
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
  alpha,
} from "@mui/material";

import GradingIcon from "@mui/icons-material/Grading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const mockSubmissions = [
  {
    id: 1,
    studentName: "Amina Youssef",
    assignmentTitle: "Module 1: Business Basics",
    submittedAt: "2025-06-20",
    status: "Pending",
    grade: null,
  },
  {
    id: 2,
    studentName: "Omar Khalid",
    assignmentTitle: "Module 2: UI Wireframes",
    submittedAt: "2025-06-18",
    status: "Reviewed",
    grade: "B+",
  },
  {
    id: 3,
    studentName: "Lina Saeed",
    assignmentTitle: "Final Project: Landing Page",
    submittedAt: "2025-06-22",
    status: "Pending",
    grade: null,
  },
];

const SubmissionsTab = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const open = Boolean(anchorEl);

  const handleMenuClick = (event, submission) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubmission(submission);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    handleMenuClose();
  };

  // Define gradient colors dynamically based on theme primary color
  const buttonGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const buttonGradientHover = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;

  // Chip colors based on status, using alpha for some transparency
  const pendingChipBg = alpha(theme.palette.primary.main, 0.85);
  const reviewedChipBg = alpha(theme.palette.primary.light, 0.6);

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.text.primary}>
          Student Assignment Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<GradingIcon />}
          sx={{
            background: buttonGradient,
            color: "#fff",
            px: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              background: buttonGradientHover,
            },
          }}
          onClick={() => alert("Add grading functionality")}
        >
          Add New Submission
        </Button>
      </Box>

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
                    "Student Name",
                    "Assignment Title",
                    "Submission Date",
                    "Review Status",
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
                {mockSubmissions.map((submission) => (
                  <TableRow
                    key={submission.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {submission.studentName}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {submission.assignmentTitle}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {submission.submittedAt}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={submission.status === "Pending" ? "Awaiting Review" : "Reviewed"}
                        sx={{
                          backgroundColor:
                            submission.status === "Pending" ? pendingChipBg : reviewedChipBg,
                          color: "#fff",
                          fontWeight: 600,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {submission.grade || "Not graded"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, submission)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: 2,
            mt: 1,
            background: theme.palette.background.paper,
          },
        }}
      >
        <MenuItem onClick={() => handleDialogOpen("editSubmission")}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          Edit Submission
        </MenuItem>

        <MenuItem onClick={() => handleDialogOpen("deleteSubmission")}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography sx={{ color: theme.palette.error.main }}>Delete Submission</Typography>
        </MenuItem>
      </Menu>

      {/* You can later add a dialog for editing/deleting */}
      {/* <SubmissionDialog
        open={openDialog}
        onClose={handleDialogClose}
        dialogType={dialogType}
        submission={selectedSubmission}
      /> */}
    </Box>
  );
};

export default SubmissionsTab;
