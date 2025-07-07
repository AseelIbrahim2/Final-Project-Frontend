import React, { useState, useEffect } from "react"; 
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
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import AdminDialog from "./AdminDialog";
import useAdmin from "../../../hooks/useAdmin";

const UserManagement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const theme = useTheme();

  const { getUsers, addUser, updateUser, deleteUser } = useAdmin();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (err) {
      showSnackbar(err.message || "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await addUser(userData);
      setUsers([...users, newUser]);
      showSnackbar("User created successfully!");
      handleDialogClose();
    } catch (err) {
      showSnackbar(err.message || "Failed to create user", "error");
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers(users.map(user => 
        user.id === userId ? updatedUser : user
      ));
      showSnackbar("User updated successfully!");
      handleDialogClose();
    } catch (err) {
      showSnackbar(err.message || "Failed to update user", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: false } : user
      ));
      showSnackbar("User deactivated successfully!");
      handleDialogClose();
    } catch (err) {
      showSnackbar(err.message || "Failed to deactivate user", "error");
    }
  };

  const handleSubmit = (data) => {
    if (dialogType === "createUser") {
      handleCreateUser(data);
    } else if (dialogType === "editUser") {
      handleUpdateUser(currentItem.id, data);
    } else if (dialogType === "deleteUser") {
      handleDeleteUser(currentItem.id);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          color={theme.palette.mode === "dark" ? "grey.100" : "text.primary"}
        >
          User Management
        </Typography>
        <Button
          onClick={() => handleDialogOpen("createUser")}
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            color: "#fff",
            px: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: theme.palette.mode === "dark" 
              ? "0 4px 15px rgba(102, 126, 234, 0.7)"
              : "0 4px 15px rgba(118, 75, 162, 0.5)",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: theme.palette.mode === "dark" 
                ? "0 6px 20px rgba(102, 126, 234, 0.9)"
                : "0 6px 20px rgba(118, 75, 162, 0.7)",
            },
          }}
        >
          Add New User
        </Button>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: "hidden",
          backgroundColor: theme.palette.mode === "dark" ? "#292C3A" : "#fff",
          color: theme.palette.mode === "dark" ? "grey.100" : "text.primary",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead 
              sx={{ 
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.dark : theme.palette.primary.main 
              }}
            >
              <TableRow>
                {["User", "Email", "Role", "Status", "Actions"].map((label) => (
                  <TableCell 
                    key={label} 
                    sx={{ 
                      color: "#fff", 
                      fontWeight: "bold",
                      borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.15)" : "none",
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark" 
                        ? theme.palette.action.hover 
                        : theme.palette.action.selected,
                    }
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: theme.palette.primary.main,
                          color: "#fff",
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <Box>
                        <Typography 
                          fontWeight="500"
                          color={theme.palette.mode === "dark" ? "grey.100" : "text.primary"}
                        >
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color={theme.palette.mode === "dark" ? "grey.400" : "text.secondary"}>
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.mode === "dark" ? "grey.200" : "text.primary" }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      sx={{
                        backgroundColor: 
                          user.role === "admin" ? theme.palette.error.main :
                          user.role === "instructor" ? theme.palette.warning.main :
                          theme.palette.success.main,
                        color: "#fff",
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? "Active" : "Inactive"}
                      sx={{
                        backgroundColor: user.is_active ? theme.palette.success.main : theme.palette.error.main,
                        color: "#fff",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={(e) => handleMenuClick(e, user)}
                      disabled={!user.is_active}
                      sx={{
                        color: theme.palette.mode === "dark" ? "grey.300" : "inherit"
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            bgcolor: theme.palette.mode === "dark" ? "#2a2f4a" : "#fff",
            color: theme.palette.mode === "dark" ? "grey.100" : "text.primary",
          }
        }}
      >
        <MenuItem onClick={() => handleDialogOpen("editUser")}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: theme.palette.mode === "dark" ? "grey.100" : "inherit" }} />
          </ListItemIcon>
          Edit User
        </MenuItem>
        <MenuItem 
          onClick={() => handleDialogOpen("deleteUser")}
          sx={{ color: theme.palette.error.main }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Deactivate User
        </MenuItem>
      </Menu>

      <AdminDialog
        open={openDialog}
        onClose={handleDialogClose}
        dialogType={dialogType}
        currentItem={currentItem}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default UserManagement;
