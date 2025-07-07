import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Button,
  Box,
  IconButton,
  Divider,
  Paper,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Close,
  AttachFile,
  UploadFile,
  TaskAlt,
  Event,
  School,
  Description,
} from "@mui/icons-material";

const AssignmentDialog = ({
  open,
  assignment,
  file,
  onClose,
  onFileChange,
  onSubmit,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 4,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        📚 {assignment?.title || "Assignment Details"}
        <IconButton onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 2, py: 3 }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: theme.palette.action.hover,
            borderRadius: 3,
            p: 3,
            mb: 3,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <School color="primary" />
            <Typography variant="body1">
              <strong>Course:</strong> {assignment?.course}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Event color="primary" />
            <Typography variant="body1">
              <strong>Due Date:</strong> {assignment?.dueDate}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TaskAlt color="primary" />
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              <Chip
                label={assignment?.status || "Pending"}
                color={
                  assignment?.status === "Submitted" ? "success" : "warning"
                }
                size="small"
              />
            </Typography>
          </Box>

          {assignment?.grade && assignment?.status === "Submitted" && (
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="body1">
                <strong>Grade:</strong>{" "}
                <Chip
                  label={assignment?.grade}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
            </Box>
          )}
        </Paper>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" fontWeight={600} mb={1}>
          Description
        </Typography>
        <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
          {assignment?.description}
        </Typography>

        <Typography variant="h6" fontWeight={600} mt={3} mb={1}>
          Instructions
        </Typography>
        <Typography variant="body2" paragraph sx={{ opacity: 0.85 }}>
          {assignment?.instructions}
        </Typography>

        {assignment?.status !== "Submitted" && (
          <Box mt={4}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Upload Your File
            </Typography>

            <input
              type="file"
              id="assignment-upload"
              onChange={onFileChange}
              hidden
            />
            <label htmlFor="assignment-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<UploadFile />}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Choose File
              </Button>
            </label>

            {file && (
              <Box mt={2}>
                <Chip
                  label={file.name}
                  icon={<AttachFile />}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          Close
        </Button>

        {assignment?.status === "Pending" && (
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={!file}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDialog;
