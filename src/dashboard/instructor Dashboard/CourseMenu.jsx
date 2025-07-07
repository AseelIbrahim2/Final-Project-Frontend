
// src/dashboard/instructorDashboard/CourseMenu.jsx
import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Publish as PublishIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const CourseMenu = ({
  anchorEl,
  open,
  handleMenuClose,
  handleDialogOpen,
  currentCourse,
}) => {
  const theme = useTheme();

  return (
    <Menu
      id="course-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      elevation={8}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 3,
          minWidth: 220,
          paddingY: 1,
          boxShadow:
            "0 12px 24px rgba(72, 40, 128, 0.3), 0 4px 8px rgba(0,0,0,0.1)",
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      <MenuItem
        onClick={() => {
          handleDialogOpen("edit");
          handleMenuClose();
        }}
        sx={{
          px: 3,
          py: 1.5,
          gap: 2,
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.15),
          },
        }}
      >
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          <EditIcon fontSize="medium" />
        </ListItemIcon>
        <Typography fontWeight={600} color="primary.dark" variant="body1">
          Update Course Details
        </Typography>
      </MenuItem>

      <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.divider, 0.3) }} />

      <MenuItem
        onClick={() => {
          handleDialogOpen("delete");
          handleMenuClose();
        }}
        sx={{
          px: 3,
          py: 1.5,
          gap: 2,
          "&:hover": {
            bgcolor: alpha(theme.palette.error.main, 0.15),
          },
        }}
      >
        <ListItemIcon sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="medium" />
        </ListItemIcon>
        <Typography fontWeight={700} color="error.main" variant="body1">
          Remove Course Permanently
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default CourseMenu;