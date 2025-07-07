



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   Divider,
//   useTheme,
//   alpha,
//   CircularProgress,
//   Alert,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from "@mui/material";
// import {
//   VideoLibrary as VideoIcon,
//   InsertDriveFile as FileIcon,
//   Quiz as QuizIcon,
// } from "@mui/icons-material";
// import { useCategories } from "../../hooks/useCategories";

// const CourseDialog = ({
//   openDialog,
//   handleDialogClose,
//   dialogType,
//   currentCourse,
//   onSave,
//   onDelete,
//   onPublish,
//   loading
// }) => {
//   const theme = useTheme();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category_id: ""
//   });
//   const [error, setError] = useState(null);
//   const { categories } = useCategories();

//   useEffect(() => {
//     if (openDialog) {
//       setError(null);
//       if (currentCourse && (dialogType === "edit" || dialogType === "publish")) {
//         setFormData({
//           title: currentCourse.title || "",
//           description: currentCourse.description || "",
//           category_id: currentCourse.category_id || ""
//         });
//       } else {
//         setFormData({
//           title: "",
//           description: "",
//           category_id: ""
//         });
//       }
//     }
//   }, [openDialog, currentCourse, dialogType]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       setError(new Error("Course title is required"));
//       return false;
//     }
//     if (!formData.category_id) {
//       setError(new Error("Please select a category"));
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     try {
//       if ((dialogType === "create" || dialogType === "edit") && !validateForm()) {
//         return;
//       }
//       setError(null);
//       await onSave(formData);
//       handleDialogClose();
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("An error occurred"));
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       setError(null);
//       await onDelete();
//       handleDialogClose();
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to delete course"));
//     }
//   };

//   const handlePublishConfirm = async () => {
//     try {
//       setError(null);
//       await onPublish();
//       handleDialogClose();
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to update publication status"));
//     }
//   };

//   const getDialogHeader = () => {
//     switch (dialogType) {
//       case "create":
//         return "Create New Course";
//       case "edit":
//         return `Edit Course: ${currentCourse?.title}`;
//       case "publish":
//         return `${currentCourse?.status === "approved" ? "Unpublish" : "Publish"} Course`;
//       case "delete":
//         return "Confirm Course Deletion";
//       default:
//         return "";
//     }
//   };

//   const getDialogBody = () => {
//     if (dialogType === "delete") {
//       return (
//         <>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error.message}
//             </Alert>
//           )}
//           <Typography
//             variant="body1"
//             color={theme.palette.error.main}
//             sx={{ fontWeight: 600 }}
//           >
//             Warning: Deleting "{currentCourse?.title}" is permanent. This cannot be undone.
//           </Typography>
//         </>
//       );
//     }

//     if (dialogType === "publish") {
//       return (
//         <>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error.message}
//             </Alert>
//           )}
//           <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//             {currentCourse?.status === "approved"
//               ? "This course will no longer be accessible to students after unpublishing."
//               : "Publishing will make your course visible and available for enrollment."}
//           </Typography>
//         </>
//       );
//     }

//     return (
//       <Box component="form" sx={{ mt: 2 }}>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error.message}
//           </Alert>
//         )}
        
//         <TextField
//           name="title"
//           label="Course Title"
//           variant="outlined"
//           fullWidth
//           required
//           value={formData.title}
//           onChange={handleChange}
//           autoFocus
//           sx={{ mb: 3 }}
//           inputProps={{ maxLength: 60 }}
//           helperText="Keep it concise and clear."
//         />
        
//         <TextField
//           name="description"
//           label="Course Overview"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={5}
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Describe what students will learn..."
//           sx={{ mb: 3 }}
//         />

//         <FormControl fullWidth sx={{ mb: 3 }}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             name="category_id"
//             value={formData.category_id}
//             onChange={handleChange}
//             label="Category"
//             required
//           >
//             {categories.map(category => (
//               <MenuItem key={category.id} value={category.id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
//         <Divider sx={{ mb: 2 }} />
        
//         <Typography
//           variant="subtitle2"
//           sx={{ mb: 1, fontWeight: 700, color: theme.palette.primary.main }}
//         >
//           Add Resources
//         </Typography>
        
//         <Box display="flex" gap={2}>
//           <Button
//             variant="outlined"
//             component="label"
//             startIcon={<VideoIcon />}
//             sx={{
//               flex: 1,
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//               fontWeight: 600,
//               textTransform: "none",
//               "&:hover": {
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 borderColor: theme.palette.primary.dark,
//               },
//             }}
//           >
//             Upload Video
//             <input type="file" hidden accept="video/*" />
//           </Button>
          
//           <Button
//             variant="outlined"
//             component="label"
//             startIcon={<FileIcon />}
//             sx={{
//               flex: 1,
//               borderColor: theme.palette.secondary.main,
//               color: theme.palette.secondary.main,
//               fontWeight: 600,
//               textTransform: "none",
//               "&:hover": {
//                 bgcolor: alpha(theme.palette.secondary.main, 0.1),
//                 borderColor: theme.palette.secondary.dark,
//               },
//             }}
//           >
//             Upload PDF
//             <input type="file" hidden accept=".pdf" />
//           </Button>
          
//           <Button
//             variant="outlined"
//             component="label"
//             startIcon={<QuizIcon />}
//             sx={{
//               flex: 1,
//               borderColor: theme.palette.success.main,
//               color: theme.palette.success.main,
//               fontWeight: 600,
//               textTransform: "none",
//               "&:hover": {
//                 bgcolor: alpha(theme.palette.success.main, 0.1),
//                 borderColor: theme.palette.success.dark,
//               },
//             }}
//           >
//             Add Quiz
//             <input type="file" hidden accept=".json,.xml" />
//           </Button>
//         </Box>
//       </Box>
//     );
//   };

//   const getActionButtonText = () => {
//     switch (dialogType) {
//       case "create":
//         return "Create Course";
//       case "edit":
//         return "Save Changes";
//       case "publish":
//         return currentCourse?.status === "approved" ? "Unpublish" : "Publish";
//       case "delete":
//         return "Delete";
//       default:
//         return "Confirm";
//     }
//   };

//   const handleAction = () => {
//     if (dialogType === "delete") return handleDeleteConfirm();
//     if (dialogType === "publish") return handlePublishConfirm();
//     return handleSubmit();
//   };

//   const isDelete = dialogType === "delete";

//   return (
//     <Dialog
//       open={openDialog}
//       onClose={!loading ? handleDialogClose : null}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           padding: 2,
//           boxShadow: "0 12px 30px rgba(72, 40, 128, 0.25), 0 4px 10px rgba(0,0,0,0.1)",
//           bgcolor: theme.palette.background.default,
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           fontWeight: 700,
//           color: theme.palette.primary.dark,
//           fontSize: "1.6rem",
//           textAlign: "center",
//         }}
//       >
//         {getDialogHeader()}
//       </DialogTitle>
      
//       <DialogContent>
//         {getDialogBody()}
//       </DialogContent>
      
//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button
//           onClick={handleDialogClose}
//           variant="text"
//           disabled={loading}
//           sx={{
//             fontWeight: 600,
//             color: theme.palette.text.secondary,
//             textTransform: "none",
//           }}
//         >
//           Cancel
//         </Button>
        
//         <Button
//           onClick={handleAction}
//           variant="contained"
//           color={isDelete ? "error" : "primary"}
//           disabled={loading}
//           sx={{
//             fontWeight: 700,
//             textTransform: "none",
//             px: 3,
//             py: 1.2,
//             boxShadow: isDelete
//               ? `0 6px 12px ${alpha(theme.palette.error.main, 0.5)}`
//               : `0 6px 12px ${alpha(theme.palette.primary.main, 0.5)}`,
//           }}
//         >
//           {loading ? <CircularProgress size={24} /> : getActionButtonText()}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CourseDialog;


// src/dashboard/instructorDashboard/CourseDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
  useTheme,
  alpha,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import {
  VideoLibrary as VideoIcon,
  InsertDriveFile as FileIcon,
  Quiz as QuizIcon,
} from "@mui/icons-material";
import { useCategories } from "../../hooks/useCategories";

const CourseDialog = ({
  openDialog,
  handleDialogClose,
  dialogType,
  currentCourse,
  onSave,
  onDelete,
  loading
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: ""
  });
  const [error, setError] = useState(null);
  const { categories } = useCategories();

  useEffect(() => {
    if (openDialog) {
      setError(null);
      if (currentCourse && (dialogType === "edit" || dialogType === "delete")) {
        setFormData({
          title: currentCourse.title || "",
          description: currentCourse.description || "",
          category_id: currentCourse.category_id || ""
        });
      } else {
        setFormData({
          title: "",
          description: "",
          category_id: ""
        });
      }
    }
  }, [openDialog, currentCourse, dialogType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError(new Error("Course title is required"));
      return false;
    }
    if (!formData.category_id) {
      setError(new Error("Please select a category"));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if ((dialogType === "create" || dialogType === "edit") && !validateForm()) {
        return;
      }
      setError(null);
      await onSave(formData);
      handleDialogClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setError(null);
      await onDelete();
      handleDialogClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete course"));
    }
  };

  const getDialogHeader = () => {
    switch (dialogType) {
      case "create":
        return "Create New Course";
      case "edit":
        return `Edit Course: ${currentCourse?.title}`;
      case "delete":
        return "Confirm Course Deletion";
      default:
        return "";
    }
  };

  const getDialogBody = () => {
    if (dialogType === "delete") {
      return (
        <>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}
          <Typography
            variant="body1"
            color={theme.palette.error.main}
            sx={{ fontWeight: 600 }}
          >
            Warning: Deleting "{currentCourse?.title}" is permanent. This cannot be undone.
          </Typography>
        </>
      );
    }

    return (
      <Box component="form" sx={{ mt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}
        
        <TextField
          name="title"
          label="Course Title"
          variant="outlined"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
          autoFocus
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 60 }}
          helperText="Keep it concise and clear."
        />
        
        <TextField
          name="description"
          label="Course Overview"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what students will learn..."
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            label="Category"
            required
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const getActionButtonText = () => {
    switch (dialogType) {
      case "create":
        return "Create Course";
      case "edit":
        return "Save Changes";
      case "delete":
        return "Delete";
      default:
        return "Confirm";
    }
  };

  const handleAction = () => {
    if (dialogType === "delete") return handleDeleteConfirm();
    return handleSubmit();
  };

  const isDelete = dialogType === "delete";

  return (
    <Dialog
      open={openDialog}
      onClose={!loading ? handleDialogClose : null}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          boxShadow: "0 12px 30px rgba(72, 40, 128, 0.25), 0 4px 10px rgba(0,0,0,0.1)",
          bgcolor: theme.palette.background.default,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: theme.palette.primary.dark,
          fontSize: "1.6rem",
          textAlign: "center",
        }}
      >
        {getDialogHeader()}
      </DialogTitle>
      
      <DialogContent>
        {getDialogBody()}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleDialogClose}
          variant="text"
          disabled={loading}
          sx={{
            fontWeight: 600,
            color: theme.palette.text.secondary,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleAction}
          variant="contained"
          color={isDelete ? "error" : "primary"}
          disabled={loading}
          sx={{
            fontWeight: 700,
            textTransform: "none",
            px: 3,
            py: 1.2,
            boxShadow: isDelete
              ? `0 6px 12px ${alpha(theme.palette.error.main, 0.5)}`
              : `0 6px 12px ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        >
          {loading ? <CircularProgress size={24} /> : getActionButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialog;