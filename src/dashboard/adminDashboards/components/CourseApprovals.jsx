import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Tooltip,
  LinearProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  alpha
} from "@mui/material";
import {
  School as SchoolIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  Email as EmailIcon
} from "@mui/icons-material";
import useAdmin from "../../../hooks/useAdmin";
import { getCourseDetails } from "../../../services/courseService";
import { useCategories } from "../../../hooks/useCategories";

const CourseApprovals = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [coursesData, setCoursesData] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { 
    categories, 
    loading: categoriesLoading, 
    addCategory
  } = useCategories();

  const {
    loading,
    error,
    getPendingCourses,
    approveCourse,
    rejectCourse
  } = useAdmin();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    setIsLoading(true);
    try {
      const pendingCourses = await getPendingCourses();

      const enrichedCourses = await Promise.all(
        pendingCourses.map(async (course) => {
          try {
            const details = await getCourseDetails(course.id);
            return {
              ...course,
              instructor: {
                id: details.instructor?.id || null,
                name: details.instructor?.name || "Unknown Instructor",
                avatar: details.instructor?.avatar || null,
                email: details.instructor?.email || null
              },
              category: {
                id: details.category?.id || null,
                name: details.category?.name || "Uncategorized"
              }
            };
          } catch (err) {
            console.error(`Failed to fetch details for course ${course.id}:`, err);
            return {
              ...course,
              instructor: { 
                id: null,
                name: "Unknown Instructor", 
                avatar: null,
                email: null
              },
              category: { 
                id: null,
                name: "Uncategorized" 
              }
            };
          }
        })
      );

      setCoursesData(enrichedCourses);
    } catch (err) {
      showSnackbar(err.message || "Failed to fetch pending courses", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      showSnackbar("Category name cannot be empty", "warning");
      return;
    }

    try {
      await addCategory(newCategoryName);
      setNewCategoryName("");
      showSnackbar("Category added successfully", "success");
    } catch (err) {
      showSnackbar(err.message || "Failed to add category", "error");
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
    setFeedback("");
  };

  const handleApprove = async () => {
    try {
      await approveCourse(currentItem.id);
      setCoursesData(coursesData.filter(course => course.id !== currentItem.id));
      showSnackbar("Course approved successfully!", "success");
      handleDialogClose();
    } catch (err) {
      showSnackbar(err.message || "Failed to approve course", "error");
    }
  };

  const handleReject = async () => {
    if (!feedback) {
      showSnackbar("Please provide rejection feedback", "warning");
      return;
    }

    try {
      await rejectCourse(currentItem.id, feedback);
      setCoursesData(coursesData.filter(course => course.id !== currentItem.id));
      showSnackbar("Course rejected successfully!", "success");
      handleDialogClose();
    } catch (err) {
      showSnackbar(err.message || "Failed to reject course", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return theme.palette.warning.main;
      case "approved":
        return theme.palette.success.main;
      case "rejected":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" sx={{ backgroundColor: theme.palette.background.default }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
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

      <Grid container spacing={3}>
        {/* Course Approvals Section */}
        <Grid item xs={12} md={8}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Pending Course Approvals
            </Typography>
            <Tooltip title="Refresh list">
              <Button
                variant="outlined"
                onClick={fetchPendingCourses}
                startIcon={<RefreshIcon />}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                Refresh
              </Button>
            </Tooltip>
          </Box>

          {loading && <LinearProgress color="primary" />}

          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 3, backgroundColor: theme.palette.background.paper }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableRow>
                    {["Course", "Instructor", "Category", "Submitted", "Status", "Actions"].map((label) => (
                      <TableCell key={label} sx={{ color: "#fff", fontWeight: "bold" }}>
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coursesData.length > 0 ? (
                    coursesData.map((course) => (
                      <TableRow 
                        key={course.id} 
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>
                              <SchoolIcon />
                            </Avatar>
                            <Box>
                              <Typography fontWeight="500" color={theme.palette.text.primary}>
                                {course.title}
                              </Typography>
                              <Typography variant="body2" color={theme.palette.text.secondary}>
                                {course.description?.substring(0, 50)}...
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              src={course.instructor.avatar}
                              sx={{ 
                                width: 40, 
                                height: 40,
                                bgcolor: theme.palette.secondary.main,
                                color: "#fff"
                              }}
                            >
                              {!course.instructor.avatar && <PersonIcon />}
                            </Avatar>
                            <Box>
                              <Typography color={theme.palette.text.primary}>{course.instructor.name}</Typography>
                              {course.instructor.email && (
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <EmailIcon fontSize="small" color="action" />
                                  <Typography variant="caption" color={theme.palette.text.secondary}>
                                    {course.instructor.email}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={course.category.name}
                            variant="outlined"
                            color={course.category.id ? "primary" : "default"}
                            sx={{
                              backgroundColor: course.category.id ? 
                                alpha(theme.palette.primary.main, 0.1) : 
                                alpha(theme.palette.grey[500], 0.1),
                              fontWeight: 500,
                              color: theme.palette.text.primary
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>
                          {formatDate(course.created_at)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={course.status}
                            sx={{
                              backgroundColor: getStatusColor(course.status),
                              color: "#fff",
                              textTransform: "capitalize",
                              fontWeight: 500,
                              minWidth: 100
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="More actions">
                            <IconButton onClick={(e) => handleMenuClick(e, course)} sx={{ color: theme.palette.text.primary }}>
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Box textAlign="center" color={theme.palette.text.secondary}>
                          <InfoIcon sx={{ fontSize: 48, mb: 1 }} />
                          <Typography variant="body1">
                            {loading ? "Loading courses..." : "No pending courses found"}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Categories Management Section */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardHeader
              title="Categories Management"
              avatar={<CategoryIcon color="primary" />}
              titleTypographyProps={{ variant: "h6", fontWeight: "bold", color: theme.palette.text.primary }}
            />
            <Divider />
            <CardContent>
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom color={theme.palette.text.primary}>
                  Add New Category
                </Typography>
                <Box display="flex" gap={1}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    sx={{
                      "& .MuiInputBase-input": { color: theme.palette.text.primary },
                      "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: alpha(theme.palette.text.primary, 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCategory}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              <Typography variant="subtitle1" gutterBottom color={theme.palette.text.primary}>
                Existing Categories
              </Typography>
              {categoriesLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress size={24} color="primary" />
                </Box>
              ) : (
                <List dense sx={{ color: theme.palette.text.primary }}>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <ListItem key={category.id}>
                        <ListItemText 
                          primary={category.name} 
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                      No categories found
                    </Typography>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }
        }}
      >
        <MenuItem onClick={() => handleDialogOpen("view")}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen("approve")}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
          </ListItemIcon>
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen("reject")}>
          <ListItemIcon>
            <CancelIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          Reject
        </MenuItem>
      </Menu>

      {/* Dialog for View / Approve / Reject */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}>
          {dialogType === "view" && "Course Details"}
          {dialogType === "approve" && "Confirm Approval"}
          {dialogType === "reject" && "Reject Course"}
        </DialogTitle>
        <DialogContent dividers>
          {dialogType === "view" && currentItem && (
            <>
              <Typography variant="h6" gutterBottom color={theme.palette.text.primary}>
                {currentItem.title}
              </Typography>
              <Typography variant="body2" gutterBottom color={theme.palette.text.secondary}>
                {currentItem.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom color={theme.palette.text.primary}>
                Instructor
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={currentItem.instructor?.avatar}
                  sx={{ bgcolor: theme.palette.secondary.main, color: "#fff", width: 56, height: 56 }}
                >
                  {!currentItem.instructor?.avatar && <PersonIcon fontSize="large" />}
                </Avatar>
                <Box>
                  <Typography fontWeight={600} color={theme.palette.text.primary}>
                    {currentItem.instructor?.name}
                  </Typography>
                  {currentItem.instructor?.email && (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                      {currentItem.instructor.email}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom color={theme.palette.text.primary}>
                Category
              </Typography>
              <Chip
                label={currentItem.category?.name || "Uncategorized"}
                color="primary"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              />
            </>
          )}

          {(dialogType === "approve" || dialogType === "reject") && (
            <>
              <Typography variant="body1" color={theme.palette.text.primary} mb={2}>
                Are you sure you want to {dialogType === "approve" ? "approve" : "reject"} this course?
              </Typography>

              {dialogType === "reject" && (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Rejection Feedback"
                  type="text"
                  fullWidth
                  multiline
                  minRows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: theme.palette.text.primary },
                    "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.text.primary, 0.3),
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.error.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.error.main,
                      },
                    },
                  }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          {dialogType === "approve" && (
            <Button
              onClick={handleApprove}
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
            >
              Confirm Approval
            </Button>
          )}
          {dialogType === "reject" && (
            <Button
              onClick={handleReject}
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
            >
              Confirm Rejection
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseApprovals;
