import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Cancel as CancelIcon,
} from "@mui/icons-material";

const AdminDialog = ({ open, onClose, dialogType, currentItem, onSubmit }) => {
  const theme = useTheme();
  const safeItem = currentItem || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
  });

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name || '',
        email: currentItem.email || '',
        role: currentItem.role || 'student',
        password: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'student',
        password: '',
      });
    }
  }, [currentItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (dialogType === 'deleteUser') {
      onSubmit({ is_active: false });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  const titleMap = {
    createUser: "Add New User",
    editUser: `Edit User - ${safeItem?.name || ""}`,
    deleteUser: "Confirm Deactivation",
  };

  const actionLabel = {
    createUser: "Create",
    editUser: "Save",
    deleteUser: "Deactivate",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "#fff",
          userSelect: "none",
          fontWeight: "bold",
          fontSize: 18,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          boxShadow: `0 2px 8px ${theme.palette.primary.dark}88`,
        }}
      >
        {titleMap[dialogType]}
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
        {dialogType === "deleteUser" ? (
          <Stack alignItems="center" spacing={2} textAlign="center">
            <Avatar
              sx={{
                bgcolor: theme.palette.error.main,
                width: 60,
                height: 60,
                mb: 1,
                boxShadow: `0 0 10px ${theme.palette.error.main}99`,
              }}
            >
              <CancelIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              Deactivate User?
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
              This will deactivate <strong>{safeItem?.name}</strong>.
              They will no longer be able to access the platform.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.mode === "light" ? "#f9f9f9" : "#1a263b",
                },
              }}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.mode === "light" ? "#f9f9f9" : "#1a263b",
                },
              }}
            />
            <TextField
              name="role"
              label="Role"
              select
              fullWidth
              value={formData.role}
              onChange={handleInputChange}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.mode === "light" ? "#f9f9f9" : "#1a263b",
                },
              }}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            {dialogType === "createUser" && (
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: theme.palette.mode === "light" ? "#f9f9f9" : "#1a263b",
                  },
                }}
              />
            )}
          </Stack>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === "light" ? "#f7f9fc" : "#14243e",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            mr: 2,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            "&:hover": {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.light + "22",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={dialogType === "deleteUser" ? "error" : "primary"}
          sx={{
            px: 3,
            fontWeight: "bold",
          }}
        >
          {actionLabel[dialogType]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;
