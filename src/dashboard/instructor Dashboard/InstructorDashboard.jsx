

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Container,
//   Grid,
//   useTheme,
//   Paper,
//   Button,
//   Tab,
//   Tabs,
//   Snackbar,
//   CircularProgress
// } from "@mui/material";
// import {
//   Book as BookIcon,
//   People as PeopleIcon,
//   Star,
//   Assignment,
//   BarChart,
//   List as ListIcon,
//   Add as AddIcon,
//   Dashboard as DashboardIcon,
// } from "@mui/icons-material";
// import Alert from '@mui/material/Alert';
// import StatCard from "./StatsCard";
// import CoursesTab from "./CoursesTab";
// import SubmissionsTab from "./SubmissionsTab";
// import AnalyticsTab from "./AnalyticsTab";
// import CourseMenu from "./CourseMenu";
// import CourseDialog from "./CourseDialog";
// import ModuleDialog from "./ModuleDialog";
// import LessonDialog from "./LessonDialog";
// import ModuleItem from "./ModuleItem";
// import { useCourses } from "../../hooks/useCourses";
// import { useAuth } from "../../hooks/useAuth";
// import { useLessons } from "../../hooks/useLessons";
// import { useAttachment } from "../../hooks/useAttachment";
// import apiClient from '../../api/apiClient';
// import axios from 'axios';

// const InstructorDashboard = () => {
//   const theme = useTheme();
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openModuleDialog, setOpenModuleDialog] = useState(false);
//   const [openLessonDialog, setOpenLessonDialog] = useState(false);
//   const [dialogType, setDialogType] = useState("");
//   const [currentCourse, setCurrentCourse] = useState(null);
//   const [currentModule, setCurrentModule] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [lessons, setLessons] = useState([]);
//   const [currentModuleForLesson, setCurrentModuleForLesson] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [operationLoading, setOperationLoading] = useState(false);
//   const [lessonOperationLoading, setLessonOperationLoading] = useState(false);

//   const { user } = useAuth();
//   const { upload } = useAttachment();
//   const {
//     courses,
//     loading,
//     error,
//     fetchCourses,
//     fetchCourseDetails,
//     fetchCourseModules,
//     addCourse,
//     editCourse,
//     removeCourse,
//     addModule,
//     editModule,
//     removeModule,
//   } = useCourses();

//   const {
//     lessons: allLessons,
//     loading: lessonsLoading,
//     error: lessonsError,
//     fetchLessons,
//     addLesson,
//     editLesson,
//     removeLesson,
//   } = useLessons();

//   // Calculate statistics
//   const totalStudents = courses.reduce((sum, course) => {
//     return sum + (course?.enrollments_count ?? 0);
//   }, 0);

//   const averageRating =
//     courses.length > 0
//       ? (
//           courses.reduce((sum, course) => sum + (course?.rating ?? 0), 0) /
//           courses.length
//         ).toFixed(1)
//       : 0;

//   const instructor = {
//     name: user?.name || "Instructor Name",
//     email: user?.email || "instructor@example.com",
//     avatar: user?.avatar || "",
//     totalCourses: courses.length,
//     totalStudents,
//     activeCourses: courses.filter((c) => c?.status === "approved").length,
//     averageRating,
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleMenuClick = (event, course) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentCourse(course);
//   };

//   const handleMenuClose = () => setAnchorEl(null);

//   const handleDialogOpen = (type) => {
//     setDialogType(type);
//     setOpenDialog(true);
//     handleMenuClose();
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setCurrentCourse(null);
//   };

//   const handleSaveCourse = async (data) => {
//     try {
//       setOperationLoading(true);
//       if (dialogType === "create") {
//         await addCourse(data);
//         showSnackbar("Course created successfully!");
//       } else if (dialogType === "edit" && currentCourse?.id) {
//         await editCourse(currentCourse.id, data);
//         showSnackbar("Course updated successfully!");
//       }
//       await fetchCourses();
//       handleDialogClose();
//     } catch (error) {
//       console.error("Error saving course:", error);
//       showSnackbar(error.message || "Failed to save course", "error");
//     } finally {
//       setOperationLoading(false);
//     }
//   };

//   const handleDeleteCourse = async () => {
//     try {
//       setOperationLoading(true);
//       await removeCourse(currentCourse.id);
//       await fetchCourses();
//       showSnackbar("Course deleted successfully!");
//       handleDialogClose();
//       setSelectedCourse(null);
//       setModules([]);
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       showSnackbar(error.message || "Failed to delete course", "error");
//     } finally {
//       setOperationLoading(false);
//     }
//   };

//   const handleCourseSelect = async (course) => {
//     try {
//       const courseDetails = await fetchCourseDetails(course.id);
//       setSelectedCourse(courseDetails);
//       const modulesData = await fetchCourseModules(course.id);
//       setModules(modulesData || []);
//       setSelectedTab(1);
//     } catch (error) {
//       console.error("Error selecting course:", error);
//       showSnackbar("Failed to load course details", "error");
//     }
//   };

//   // Module Handlers
//   const handleAddModule = () => {
//     setCurrentModule(null);
//     setOpenModuleDialog(true);
//   };

//   const handleEditModule = (module) => {
//     setCurrentModule(module);
//     setOpenModuleDialog(true);
//   };

//   const handleSubmitModule = async (moduleData) => {
//     try {
//       setOperationLoading(true);
//       let updatedModules;
//       if (currentModule) {
//         const { course_id, ...updates } = moduleData;
//         await editModule(currentModule.id, updates);
//         showSnackbar("Module updated successfully!");
//       } else {
//         await addModule(selectedCourse.id, moduleData);
//         showSnackbar("Module created successfully!");
//       }
      
//       updatedModules = await fetchCourseModules(selectedCourse.id);
//       setModules(updatedModules || []);
//       setOpenModuleDialog(false);
//     } catch (error) {
//       console.error("Error saving module:", error);
//       showSnackbar(error.message || "Failed to save module", "error");
//     } finally {
//       setOperationLoading(false);
//     }
//   };

//   const handleDeleteModule = async (moduleId) => {
//     try {
//       setOperationLoading(true);
//       await removeModule(moduleId);
//       const updatedModules = await fetchCourseModules(selectedCourse.id);
//       setModules(updatedModules || []);
//       showSnackbar("Module deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting module:", error);
//       showSnackbar(error.message || "Failed to delete module", "error");
//     } finally {
//       setOperationLoading(false);
//     }
//   };

//   // Lesson Handlers
//   const handleAddLesson = (module) => {
//     setCurrentModuleForLesson(module);
//     setCurrentLesson(null);
//     setOpenLessonDialog(true);
//   };

//   const handleEditLesson = (lesson, module) => {
//     setCurrentModuleForLesson(module);
//     setCurrentLesson(lesson);
//     setOpenLessonDialog(true);
//   };

//   const uploadLessonContent = async (lessonId, file, contentType) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('contentType', contentType);
      
//       const response = await upload(formData);
//       return response;
//     } catch (error) {
//       console.error("Error uploading lesson content:", error);
//       throw error;
//     }
//   };

 
// const handleSubmitLesson = async (formData) => {
//   try {
//     setLessonOperationLoading(true);
    
//     let response;
//     if (currentLesson) {
//       response = await editLesson(currentLesson.id, formData);
//       showSnackbar("Lesson updated successfully!");
//     } else {
//       response = await addLesson(formData);
//       showSnackbar("Lesson created successfully!");
//     }

//     // Refresh lessons list
//     const updatedLessons = await fetchLessons(currentModuleForLesson.id);
//     setLessons(updatedLessons || []);
//     setOpenLessonDialog(false);
//   } catch (err) {
//     console.error("Error saving lesson:", err);
//     showSnackbar(err.message || 'Failed to save lesson', 'error');
//   } finally {
//     setLessonOperationLoading(false);
//   }
// };

//   const handleDeleteLesson = async (lessonId) => {
//     try {
//       setLessonOperationLoading(true);
//       await removeLesson(lessonId);
//       if (currentModuleForLesson) {
//         const updatedLessons = await fetchLessons(currentModuleForLesson.id);
//         setLessons(updatedLessons || []);
//       }
//       showSnackbar("Lesson deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting lesson:", error);
//       showSnackbar(error.message || "Failed to delete lesson", "error");
//     } finally {
//       setLessonOperationLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       fetchCourseModules(selectedCourse.id).then((modulesData) => {
//         setModules(modulesData || []);
//       });
//     }
//   }, [selectedCourse]);

//   useEffect(() => {
//     if (selectedCourse && modules.length > 0) {
//       // Load lessons for the first module automatically
//       fetchLessons(modules[0].id);
//     }
//   }, [modules]);

//   const tabs = [
//     { label: "Course Overview", icon: <BookIcon /> },
//     { label: "Course Content", icon: <ListIcon /> },
//     { label: "Assignment Reviews", icon: <Assignment /> },
//     { label: "Performance Stats", icon: <BarChart /> },
//   ];

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Header with Instructor Info */}
//       <Box mb={4}>
//         <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
//           <Box display="flex" alignItems="center" gap={3}>
//             <Avatar
//               src={instructor.avatar}
//               sx={{
//                 width: 80,
//                 height: 80,
//                 fontSize: "2rem",
//                 bgcolor: theme.palette.primary.main,
//                 color: theme.palette.primary.contrastText,
//               }}
//             >
//               {instructor.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")}
//             </Avatar>
//             <Box>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Welcome back, {instructor.name}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {instructor.email}
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>

//         {/* Stat Cards */}
//         <Grid container spacing={3} mb={4}>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Courses Created"
//               value={instructor.totalCourses}
//               icon={BookIcon}
//               color="primary"
//               description="Total courses you've created"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Students Enrolled"
//               value={instructor.totalStudents}
//               icon={PeopleIcon}
//               color="success"
//               description="Total students across all courses"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Active Courses"
//               value={instructor.activeCourses}
//               icon={BookIcon}
//               color="warning"
//               description="Currently published courses"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Avg. Rating"
//               value={instructor.averageRating}
//               icon={Star}
//               color="info"
//               description="Average course rating"
//               isRating
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Tabs */}
//       <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//         <Tabs
//           value={selectedTab}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           aria-label="instructor dashboard tabs"
//         >
//           {tabs.map((tab, index) => (
//             <Tab
//               key={index}
//               label={tab.label}
//               icon={tab.icon}
//               iconPosition="start"
//               sx={{ minHeight: 64 }}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Tab Content */}
//       <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
//         {selectedTab === 0 && (
//           <CoursesTab
//             courses={courses}
//             loading={loading}
//             error={error}
//             handleDialogOpen={handleDialogOpen}
//             handleMenuClick={handleMenuClick}
//             onCourseSelect={handleCourseSelect}
//           />
//         )}

//         {selectedTab === 1 && (
//           <Box>
//             {selectedCourse ? (
//               <>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={3}
//                 >
//                   <Typography variant="h5" fontWeight="bold">
//                     {selectedCourse.title} - Course Content
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     startIcon={<AddIcon />}
//                     onClick={handleAddModule}
//                     disabled={operationLoading}
//                   >
//                     Add Module
//                   </Button>
//                 </Box>

//                 {modules.length === 0 ? (
//                   <Box textAlign="center" py={4}>
//                     <Typography variant="body1" color="text.secondary">
//                       No modules yet. Add your first module to get started.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Box>
//                     {modules.map((module) => (
//                       <ModuleItem
//                         key={module.id}
//                         module={module}
//                         onEdit={handleEditModule}
//                         onDelete={handleDeleteModule}
//                         onAddLesson={handleAddLesson}
//                         onEditLesson={handleEditLesson}
//                         onDeleteLesson={handleDeleteLesson}
//                         lessons={allLessons.filter(
//                           (l) => l.module_id === module.id
//                         )}
//                         lessonsLoading={lessonsLoading}
//                         lessonsError={lessonsError}
//                       />
//                     ))}
//                   </Box>
//                 )}
//               </>
//             ) : (
//               <Box textAlign="center" py={4}>
//                 <DashboardIcon
//                   sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
//                 />
//                 <Typography variant="h6" color="text.secondary">
//                   Please select a course to view its content
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         )}

//         {selectedTab === 2 && (
//           <SubmissionsTab
//             submissions={[]}
//             emptyMessage="No pending submissions at this time"
//           />
//         )}

//         {selectedTab === 3 && (
//           <AnalyticsTab
//             analytics={[]}
//             emptyMessage="Analytics data will appear here"
//           />
//         )}
//       </Paper>

//       {/* Dialogs and Menus */}
//       <CourseMenu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         handleMenuClose={handleMenuClose}
//         handleDialogOpen={handleDialogOpen}
//         currentCourse={currentCourse}
//       />

//       <CourseDialog
//         openDialog={openDialog}
//         handleDialogClose={handleDialogClose}
//         dialogType={dialogType}
//         currentCourse={currentCourse}
//         onSave={handleSaveCourse}
//         onDelete={handleDeleteCourse}
//         loading={operationLoading}
//       />

//       <ModuleDialog
//         open={openModuleDialog}
//         handleClose={() => setOpenModuleDialog(false)}
//         module={currentModule}
//         courseId={selectedCourse?.id}
//         onSubmit={handleSubmitModule}
//         loading={operationLoading}
//       />

//       <LessonDialog
//         open={openLessonDialog}
//         handleClose={() => setOpenLessonDialog(false)}
//         lesson={currentLesson}
//         moduleId={currentModuleForLesson?.id}
//         onSubmit={handleSubmitLesson}
//         loading={lessonOperationLoading}
//       />

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default InstructorDashboard;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  useTheme,
  Paper,
  Button,
  Tab,
  Tabs,
  Snackbar,
  CircularProgress
} from "@mui/material";
import {
  Book as BookIcon,
  People as PeopleIcon,
  Star,
  Assignment,
  BarChart,
  List as ListIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import StatCard from "./StatsCard";
import CoursesTab from "./CoursesTab";
import SubmissionsTab from "./SubmissionsTab";
import AnalyticsTab from "./AnalyticsTab";
import CourseMenu from "./CourseMenu";
import CourseDialog from "./CourseDialog";
import ModuleDialog from "./ModuleDialog";
import LessonDialog from "./LessonDialog";
import ModuleItem from "./ModuleItem";
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";
import { useLessons } from "../../hooks/useLessons";
import { useAttachment } from "../../hooks/useAttachment";
import apiClient from '../../api/apiClient';
import axios from 'axios';

const InstructorDashboard = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [currentModuleForLesson, setCurrentModuleForLesson] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [operationLoading, setOperationLoading] = useState(false);
  const [lessonOperationLoading, setLessonOperationLoading] = useState(false);

  const { user } = useAuth();
  const { upload } = useAttachment();
  const {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourseDetails,
    fetchCourseModules,
    addCourse,
    editCourse,
    removeCourse,
    addModule,
    editModule,
    removeModule,
  } = useCourses();

  const {
    lessons: allLessons,
    loading: lessonsLoading,
    error: lessonsError,
    fetchLessons,
    addLesson,
    editLesson,
    removeLesson,
  } = useLessons();

  // Calculate statistics
  const totalStudents = courses.reduce((sum, course) => {
    return sum + (course?.enrollments_count ?? 0);
  }, 0);

  const averageRating =
    courses.length > 0
      ? (
          courses.reduce((sum, course) => sum + (course?.rating ?? 0), 0) /
          courses.length
        ).toFixed(1)
      : 0;

  const instructor = {
    name: user?.name || "Instructor Name",
    email: user?.email || "instructor@example.com",
    avatar: user?.avatar || "",
    totalCourses: courses.length,
    totalStudents,
    activeCourses: courses.filter((c) => c?.status === "approved").length,
    averageRating,
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMenuClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setCurrentCourse(course);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentCourse(null);
  };

  const handleSaveCourse = async (data) => {
    try {
      setOperationLoading(true);
      if (dialogType === "create") {
        await addCourse(data);
        showSnackbar("Course created successfully!");
      } else if (dialogType === "edit" && currentCourse?.id) {
        await editCourse(currentCourse.id, data);
        showSnackbar("Course updated successfully!");
      }
      await fetchCourses();
      handleDialogClose();
    } catch (error) {
      console.error("Error saving course:", error);
      showSnackbar(error.message || "Failed to save course", "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      setOperationLoading(true);
      await removeCourse(currentCourse.id);
      await fetchCourses();
      showSnackbar("Course deleted successfully!");
      handleDialogClose();
      setSelectedCourse(null);
      setModules([]);
    } catch (error) {
      console.error("Error deleting course:", error);
      showSnackbar(error.message || "Failed to delete course", "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCourseSelect = async (course) => {
    try {
      const courseDetails = await fetchCourseDetails(course.id);
      setSelectedCourse(courseDetails);
      const modulesData = await fetchCourseModules(course.id);
      setModules(modulesData || []);
      setSelectedTab(1);
    } catch (error) {
      console.error("Error selecting course:", error);
      showSnackbar("Failed to load course details", "error");
    }
  };

  // Module Handlers
  const handleAddModule = () => {
    setCurrentModule(null);
    setOpenModuleDialog(true);
  };

  const handleEditModule = (module) => {
    setCurrentModule(module);
    setOpenModuleDialog(true);
  };

  const handleSubmitModule = async (moduleData) => {
    try {
      setOperationLoading(true);
      let updatedModules;
      if (currentModule) {
        const { course_id, ...updates } = moduleData;
        await editModule(currentModule.id, updates);
        showSnackbar("Module updated successfully!");
      } else {
        await addModule(selectedCourse.id, moduleData);
        showSnackbar("Module created successfully!");
      }
      
      updatedModules = await fetchCourseModules(selectedCourse.id);
      setModules(updatedModules || []);
      setOpenModuleDialog(false);
    } catch (error) {
      console.error("Error saving module:", error);
      showSnackbar(error.message || "Failed to save module", "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    try {
      setOperationLoading(true);
      await removeModule(moduleId);
      const updatedModules = await fetchCourseModules(selectedCourse.id);
      setModules(updatedModules || []);
      showSnackbar("Module deleted successfully!");
    } catch (error) {
      console.error("Error deleting module:", error);
      showSnackbar(error.message || "Failed to delete module", "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleAddLesson = (module) => {
    setCurrentModuleForLesson(module);
    setCurrentLesson(null);
    setOpenLessonDialog(true);
  };

  const handleEditLesson = (lesson, module) => {
    setCurrentModuleForLesson(module);
    setCurrentLesson(lesson);
    setOpenLessonDialog(true);
  };

  const uploadLessonContent = async (lessonId, file, contentType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', contentType);
      
      const response = await upload(formData);
      return response;
    } catch (error) {
      console.error("Error uploading lesson content:", error);
      throw error;
    }
  };

  const handleSubmitLesson = async (lessonData, file) => {
    try {
      setLessonOperationLoading(true);
      
      if (!currentModuleForLesson?.id) {
        throw new Error('No module selected');
      }

      const lessonWithModule = {
        ...lessonData,
        module_id: currentModuleForLesson.id
      };

      if (currentLesson) {
        await editLesson(currentLesson.id, lessonWithModule);
        showSnackbar("Lesson updated successfully!");
      } else {
        await addLesson(lessonWithModule, file);
        showSnackbar("Lesson created successfully!");
      }

      setOpenLessonDialog(false);
      
      // Update lessons list
      const updatedLessons = await fetchLessons(currentModuleForLesson.id);
      setLessons(updatedLessons || []);
    } catch (err) {
      console.error("Error saving lesson:", err);
      showSnackbar(err.message || 'Failed to save lesson', 'error');
    } finally {
      setLessonOperationLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      setLessonOperationLoading(true);
      await removeLesson(lessonId);
      if (currentModuleForLesson) {
        const updatedLessons = await fetchLessons(currentModuleForLesson.id);
        setLessons(updatedLessons || []);
      }
      showSnackbar("Lesson deleted successfully!");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      showSnackbar(error.message || "Failed to delete lesson", "error");
    } finally {
      setLessonOperationLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseModules(selectedCourse.id).then((modulesData) => {
        setModules(modulesData || []);
      });
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse && modules.length > 0) {
      // Load lessons for the first module automatically
      fetchLessons(modules[0].id);
    }
  }, [modules]);

  const tabs = [
    { label: "Course Overview", icon: <BookIcon /> },
    { label: "Course Content", icon: <ListIcon /> },
    { label: "Assignment Reviews", icon: <Assignment /> },
    { label: "Performance Stats", icon: <BarChart /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Instructor Info */}
      <Box mb={4}>
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={instructor.avatar}
              sx={{
                width: 80,
                height: 80,
                fontSize: "2rem",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome back, {instructor.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {instructor.email}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stat Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Courses Created"
              value={instructor.totalCourses}
              icon={BookIcon}
              color="primary"
              description="Total courses you've created"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Students Enrolled"
              value={instructor.totalStudents}
              icon={PeopleIcon}
              color="success"
              description="Total students across all courses"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Courses"
              value={instructor.activeCourses}
              icon={BookIcon}
              color="warning"
              description="Currently published courses"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg. Rating"
              value={instructor.averageRating}
              icon={Star}
              color="info"
              description="Average course rating"
              isRating
            />
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="instructor dashboard tabs"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        {selectedTab === 0 && (
          <CoursesTab
            courses={courses}
            loading={loading}
            error={error}
            handleDialogOpen={handleDialogOpen}
            handleMenuClick={handleMenuClick}
            onCourseSelect={handleCourseSelect}
          />
        )}

        {selectedTab === 1 && (
          <Box>
            {selectedCourse ? (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {selectedCourse.title} - Course Content
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddModule}
                    disabled={operationLoading}
                  >
                    Add Module
                  </Button>
                </Box>

                {modules.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="text.secondary">
                      No modules yet. Add your first module to get started.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    {modules.map((module) => (
                      <ModuleItem
                        key={module.id}
                        module={module}
                        onEdit={handleEditModule}
                        onDelete={handleDeleteModule}
                        onAddLesson={handleAddLesson}
                        onEditLesson={handleEditLesson}
                        onDeleteLesson={handleDeleteLesson}
                        lessons={allLessons.filter(
                          (l) => l.module_id === module.id
                        )}
                        lessonsLoading={lessonsLoading}
                        lessonsError={lessonsError}
                      />
                    ))}
                  </Box>
                )}
              </>
            ) : (
              <Box textAlign="center" py={4}>
                <DashboardIcon
                  sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  Please select a course to view its content
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {selectedTab === 2 && (
          <SubmissionsTab
            submissions={[]}
            emptyMessage="No pending submissions at this time"
          />
        )}

        {selectedTab === 3 && (
          <AnalyticsTab
            analytics={[]}
            emptyMessage="Analytics data will appear here"
          />
        )}
      </Paper>

      {/* Dialogs and Menus */}
      <CourseMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        handleDialogOpen={handleDialogOpen}
        currentCourse={currentCourse}
      />

      <CourseDialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        dialogType={dialogType}
        currentCourse={currentCourse}
        onSave={handleSaveCourse}
        onDelete={handleDeleteCourse}
        loading={operationLoading}
      />

      <ModuleDialog
        open={openModuleDialog}
        handleClose={() => setOpenModuleDialog(false)}
        module={currentModule}
        courseId={selectedCourse?.id}
        onSubmit={handleSubmitModule}
        loading={operationLoading}
      />

      <LessonDialog
        open={openLessonDialog}
        handleClose={() => setOpenLessonDialog(false)}
        lesson={currentLesson}
        moduleId={currentModuleForLesson?.id}
        onSubmit={handleSubmitLesson}
        loading={lessonOperationLoading}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InstructorDashboard;