
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Button,
//   Box,
//   Card,
//   Typography,
//   LinearProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Chip,
//   useTheme,
//   IconButton,
//   CircularProgress,
//   Divider,
//   Badge,
//   Tabs,
//   Tab,
//   Paper,
//   Avatar,
//   alpha
// } from "@mui/material";
// import {
//   Close,
//   PlayCircleFilled,
//   Quiz as QuizIcon,
//   Assignment as AssignmentIcon,
//   CheckCircle,
//   CheckCircleOutline,
//   ArrowBack,
//   NoteAdd,
//   VideoLibrary,
//   MenuBook,
//   TaskAlt,
//   EmojiEvents
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const CourseDetailView = ({ 
//   selectedCourse, 
//   currentLesson,
//   currentVideo,
//   notes,
//   onBack, 
//   onVideoSelect,
//   onMarkCompleted,
//   onNotesChange
// }) => {
//   const theme = useTheme();
//   const [activeAssignment, setActiveAssignment] = useState(null);
//   const [assignmentSubmission, setAssignmentSubmission] = useState("");
//   const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("lessons");
//   const [moduleProgress, setModuleProgress] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedCourse?.modules) {
//       const progress = {};
//       selectedCourse.modules.forEach(module => {
//         progress[module.id] = calculateModuleProgress(module);
//       });
//       setModuleProgress(progress);
//     }
//   }, [selectedCourse]);

//   const calculateModuleProgress = (module) => {
//     if (!module.lessons?.length) return 0;
//     const completedLessons = module.lessons.filter(l => l.completed).length;
//     return Math.round((completedLessons / module.lessons.length) * 100);
//   };

//   const totalLessons = selectedCourse?.modules?.reduce(
//     (total, module) => total + (module.lessons?.length || 0), 0
//   ) || 0;

//   const completedLessons = selectedCourse?.modules?.reduce(
//     (total, module) => total + (module.lessons?.filter(l => l.completed).length || 0), 0
//   ) || 0;

//   const courseProgress = totalLessons > 0 
//     ? Math.round((completedLessons / totalLessons) * 100) 
//     : 0;

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleQuizSelect = (quiz) => {
//     navigate(`/quiz/${quiz.id}`, { state: { quiz, courseId: selectedCourse.id } });
//   };

//   const handleAssignmentSelect = (assignment) => {
//     setActiveAssignment(assignment);
//     setAssignmentSubmission("");
//     setAssignmentSubmitted(false);
//   };

//   const handleSubmitAssignment = async () => {
//     setIsSubmitting(true);
//     try {
//       // API call to submit assignment would go here
//       setAssignmentSubmitted(true);
//     } catch (error) {
//       console.error("Assignment submission failed:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setActiveAssignment(null);
//   };

//   const handleLessonClick = (lesson) => {
//     onVideoSelect(lesson);
//     setActiveTab("lesson-view");
//   };

//   const renderLessonIcon = (lesson) => {
//     switch (lesson.content_type) {
//       case 'video':
//         return <VideoLibrary color={lesson.completed ? "success" : "primary"} />;
//       case 'quiz':
//         return <QuizIcon color={lesson.completed ? "success" : "primary"} />;
//       case 'text':
//         return <MenuBook color={lesson.completed ? "success" : "primary"} />;
//       default:
//         return <PlayCircleFilled color={lesson.completed ? "success" : "primary"} />;
//     }
//   };
  

//   return (
//     <Container maxWidth="lg" sx={{ py: 3 }}>
//       {/* Back Button and Course Title */}
//       <Box display="flex" alignItems="center" mb={3}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={onBack}
//           sx={{ 
//             color: theme.palette.primary.main,
//             '&:hover': {
//               backgroundColor: alpha(theme.palette.primary.main, 0.1)
//             }
//           }}
//         >
//           Back to courses
//         </Button>
//         <Typography variant="h4" fontWeight="bold" sx={{ ml: 2 }}>
//           {selectedCourse?.title}
//         </Typography>
//       </Box>

//       {/* Course Progress */}
//       <Card sx={{ mb: 3, p: 2, boxShadow: theme.shadows[2] }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             Course Progress
//           </Typography>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {courseProgress}%
//           </Typography>
//         </Box>
//         <LinearProgress
//           variant="determinate"
//           value={courseProgress}
//           sx={{
//             height: 10,
//             borderRadius: 5,
//             backgroundColor: theme.palette.grey[300],
//             "& .MuiLinearProgress-bar": {
//               background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//             },
//           }}
//         />
//       </Card>

//       {/* Main Content Area */}
//       <Box display="flex" gap={3} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
//         {/* Left Sidebar - Modules and Content */}
//         <Card sx={{ width: { xs: '100%', md: '35%' }, p: 2, boxShadow: theme.shadows[2] }}>
//           <Tabs 
//             value={activeTab === 'lesson-view' ? 'lessons' : activeTab}
//             onChange={handleTabChange}
//             variant="fullWidth"
//             sx={{ mb: 2 }}
//           >
//             <Tab 
//               value="lessons" 
//               label="Content" 
//               icon={<VideoLibrary fontSize="small" />}
//               iconPosition="start"
//             />
//             <Tab 
//               value="assignments" 
//               label="Assignments" 
//               icon={<AssignmentIcon fontSize="small" />}
//               iconPosition="start"
//             />
//           </Tabs>

//           {selectedCourse?.modules?.map((module) => (
//             <Box key={module.id} mb={3}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {module.title}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {moduleProgress[module.id] || 0}% complete
//                 </Typography>
//               </Box>
//               <LinearProgress
//                 variant="determinate"
//                 value={moduleProgress[module.id] || 0}
//                 sx={{ 
//                   height: 6, 
//                   mb: 2,
//                   '& .MuiLinearProgress-bar': {
//                     backgroundColor: theme.palette.primary.main
//                   }
//                 }}
//               />

//               {activeTab === "lessons" && module.lessons?.map((lesson) => (
//                 <Box
//                   key={lesson.id}
//                   onClick={() => handleLessonClick(lesson)}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     p: 1.5,
//                     mb: 1,
//                     borderRadius: 1,
//                     bgcolor: currentLesson?.id === lesson.id 
//                       ? theme.palette.action.selected 
//                       : theme.palette.action.hover,
//                     cursor: "pointer",
//                     transition: 'all 0.2s ease',
//                     "&:hover": {
//                       bgcolor: theme.palette.action.selected,
//                     },
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={2}>
//                     {renderLessonIcon(lesson)}
//                     <Typography fontWeight={600}>{lesson.title}</Typography>
//                   </Box>
//                   <Typography variant="caption">{lesson.duration}m</Typography>
//                 </Box>
//               ))}

//               {activeTab === "assignments" && module.assignments?.map((assignment) => (
//                 <Box
//                   key={assignment.id}
//                   onClick={() => handleAssignmentSelect(assignment)}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     p: 1.5,
//                     mb: 1,
//                     borderRadius: 1,
//                     bgcolor: theme.palette.action.hover,
//                     cursor: "pointer",
//                     transition: 'all 0.2s ease',
//                     "&:hover": {
//                       bgcolor: theme.palette.action.selected,
//                     },
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={2}>
//                     <AssignmentIcon color={assignment.submitted ? "success" : "primary"} />
//                     <Typography fontWeight={600}>{assignment.title}</Typography>
//                   </Box>
//                   <Chip 
//                     label={assignment.submitted ? "Submitted" : "Pending"} 
//                     size="small"
//                     color={assignment.submitted ? "success" : "default"}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           ))}
//         </Card>

//         {/* Right Content Area */}
//         <Box flex={1}>
//           {activeTab === "lesson-view" && currentLesson && (
//             <Card sx={{ p: 3, boxShadow: theme.shadows[2] }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h5" fontWeight="bold">
//                   {currentLesson.title}
//                 </Typography>
//                 <Chip 
//                   label={currentLesson.completed ? "Completed" : "In Progress"} 
//                   color={currentLesson.completed ? "success" : "primary"}
//                   size="small"
//                 />
//               </Box>

//               {currentLesson.content_type === "video" && currentVideo && (
//                 <Box mb={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                   <Box
//                     component="iframe"
//                     src={currentVideo}
//                     width="100%"
//                     height="450px"
//                     sx={{ border: "none" }}
//                     allowFullScreen
//                   />
//                 </Box>
//               )}

//               {currentLesson.content_type === "quiz" && (
//                 <Box mb={3} textAlign="center" py={4}>
//                   <QuizIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//                   <Typography variant="h6" mb={2}>
//                     Quiz: {currentLesson.title}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     onClick={() => handleQuizSelect(currentLesson.quiz)}
//                     disabled={currentLesson.completed}
//                   >
//                     {currentLesson.completed ? "Quiz Completed" : "Take Quiz"}
//                   </Button>
//                 </Box>
//               )}

//               {currentLesson.content_type === "text" && (
//                 <Box mb={3} sx={{ p: 3, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
//                   <Typography variant="body1" whiteSpace="pre-wrap">
//                     {currentLesson.content_text || "No content available for this lesson."}
//                   </Typography>
//                 </Box>
//               )}

//               <Box mb={3}>
//                 <Typography variant="subtitle1" fontWeight="bold" mb={1}>
//                   Notes
//                 </Typography>
//                 <TextField
//                   multiline
//                   fullWidth
//                   rows={4}
//                   value={notes}
//                   onChange={onNotesChange}
//                   placeholder="Add your notes here..."
//                   variant="outlined"
//                 />
//               </Box>

//               {!currentLesson.completed && (
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={onMarkCompleted}
//                   startIcon={<CheckCircleOutline />}
//                   sx={{
//                     bgcolor: theme.palette.success.main,
//                     "&:hover": { 
//                       bgcolor: theme.palette.success.dark,
//                       boxShadow: `0 0 12px ${alpha(theme.palette.success.main, 0.5)}`
//                     }
//                   }}
//                 >
//                   Mark as Completed
//                 </Button>
//               )}
//             </Card>
//           )}

//           {activeTab === "lessons" && !currentLesson && (
//             <Card sx={{ 
//               p: 3, 
//               textAlign: "center",
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               boxShadow: theme.shadows[2]
//             }}>
//               <MenuBook color="primary" sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
//               <Typography variant="h6" color="text.secondary">
//                 Select a lesson to begin learning
//               </Typography>
//             </Card>
//           )}

//           {activeTab === "assignments" && (
//             <Card sx={{ 
//               p: 3,
//               boxShadow: theme.shadows[2],
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column'
//             }}>
//               <Box display="flex" alignItems="center" gap={2} mb={3}>
//                 <TaskAlt color="primary" />
//                 <Typography variant="h5" fontWeight="bold">
//                   Assignments
//                 </Typography>
//               </Box>
              
//               {selectedCourse?.modules?.some(m => m.assignments?.length > 0) ? (
//                 <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                   <Box 
//                     component="img" 
//                     src="https://source.unsplash.com/random/600x400/?assignment" 
//                     alt="Assignments" 
//                     sx={{ 
//                       maxWidth: '100%', 
//                       height: 'auto', 
//                       borderRadius: 2,
//                       mb: 3,
//                       alignSelf: 'center'
//                     }} 
//                   />
//                   <Typography color="text.secondary" textAlign="center">
//                     Select an assignment from the sidebar to view details and submit your work
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                   <Box 
//                     component="img" 
//                     src="https://source.unsplash.com/random/600x400/?notebook" 
//                     alt="No assignments" 
//                     sx={{ 
//                       maxWidth: '100%', 
//                       height: 'auto', 
//                       borderRadius: 2,
//                       mb: 3,
//                       alignSelf: 'center'
//                     }} 
//                   />
//                   <Typography color="text.secondary" textAlign="center">
//                     No assignments available for this course yet
//                   </Typography>
//                 </Box>
//               )}
//             </Card>
//           )}
//         </Box>
//       </Box>

//       {/* Assignment Dialog */}
//       <Dialog
//         open={Boolean(activeAssignment)}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             bgcolor: theme.palette.background.paper,
//           },
//         }}
//       >
//         <DialogTitle sx={{ 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center",
//           backgroundColor: theme.palette.primary.main,
//           color: '#fff'
//         }}>
//           <Typography variant="h6" fontWeight="bold">
//             {activeAssignment?.title}
//           </Typography>
//           <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
//             <Close />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           {assignmentSubmitted ? (
//             <Box textAlign="center" py={5}>
//               <CheckCircleOutline
//                 sx={{ fontSize: 70, color: theme.palette.success.main, mb: 2 }}
//               />
//               <Typography variant="h5" fontWeight={600} mb={1}>
//                 Assignment Submitted!
//               </Typography>
//               <Typography color="text.secondary">
//                 Your work has been successfully submitted.
//               </Typography>
//             </Box>
//           ) : (
//             <Box>
//               <Typography mb={3}>{activeAssignment?.description}</Typography>
              
//               {activeAssignment?.due_date && (
//                 <Chip
//                   label={`Due: ${new Date(activeAssignment.due_date).toLocaleDateString()}`}
//                   color="primary"
//                   sx={{ mb: 3 }}
//                 />
//               )}

//               <Typography variant="subtitle1" fontWeight="bold" mb={2}>
//                 Submission
//               </Typography>
//               <TextField
//                 multiline
//                 rows={6}
//                 fullWidth
//                 placeholder="Write your solution here or upload files..."
//                 value={assignmentSubmission}
//                 onChange={(e) => setAssignmentSubmission(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <Button
//                 variant="outlined"
//                 startIcon={<NoteAdd />}
//                 sx={{ mb: 3 }}
//               >
//                 Upload Files
//               </Button>

//               {activeAssignment?.attachments?.length > 0 && (
//                 <>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="subtitle1" fontWeight="bold" mb={1}>
//                     Resources
//                   </Typography>
//                   <Box display="flex" gap={1} flexWrap="wrap">
//                     {activeAssignment.attachments.map((file) => (
//                       <Chip
//                         key={file.id}
//                         label={file.original_name}
//                         onClick={() => window.open(file.secure_url, "_blank")}
//                         sx={{ cursor: "pointer" }}
//                       />
//                     ))}
//                   </Box>
//                 </>
//               )}
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ p: 2 }}>
//           {!assignmentSubmitted ? (
//             <>
//               <Button onClick={handleCloseDialog}>Cancel</Button>
//               <Button
//                 variant="contained"
//                 onClick={handleSubmitAssignment}
//                 disabled={!assignmentSubmission.trim() || isSubmitting}
//                 startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Assignment"}
//               </Button>
//             </>
//           ) : (
//             <Button 
//               variant="contained" 
//               onClick={handleCloseDialog}
//               fullWidth
//             >
//               Close
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default CourseDetailView;




import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  useTheme,
  IconButton,
  CircularProgress,
  Divider,
  Badge,
  Tabs,
  Tab,
  Paper,
  Avatar,
  alpha
} from "@mui/material";
import {
  Close,
  PlayCircleFilled,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon,
  CheckCircle,
  CheckCircleOutline,
  ArrowBack,
  NoteAdd,
  VideoLibrary,
  MenuBook,
  TaskAlt,
  EmojiEvents,
  PictureAsPdf,
  Article
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CourseDetailView = ({ 
  selectedCourse, 
  currentLesson,
  currentVideo,
  notes,
  onBack, 
  onVideoSelect,
  onMarkCompleted,
  onNotesChange
}) => {
  const theme = useTheme();
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("lessons");
  const [moduleProgress, setModuleProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCourse?.modules) {
      const progress = {};
      selectedCourse.modules.forEach(module => {
        progress[module.id] = calculateModuleProgress(module);
      });
      setModuleProgress(progress);
    }
  }, [selectedCourse]);

  const calculateModuleProgress = (module) => {
    if (!module.lessons?.length) return 0;
    const completedLessons = module.lessons.filter(l => l.completed).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  const totalLessons = selectedCourse?.modules?.reduce(
    (total, module) => total + (module.lessons?.length || 0), 0
  ) || 0;

  const completedLessons = selectedCourse?.modules?.reduce(
    (total, module) => total + (module.lessons?.filter(l => l.completed).length || 0), 0
  ) || 0;

  const courseProgress = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQuizSelect = (quiz) => {
    navigate(`/quiz/${quiz.id}`, { 
      state: { 
        quiz, 
        courseId: selectedCourse.id,
        lessonId: currentLesson.id 
      } 
    });
  };

  const handleAssignmentSelect = (assignment) => {
    setActiveAssignment(assignment);
    setAssignmentSubmission("");
    setAssignmentSubmitted(false);
  };

  const handleSubmitAssignment = async () => {
    setIsSubmitting(true);
    try {
      // API call to submit assignment would go here
      setAssignmentSubmitted(true);
    } catch (error) {
      console.error("Assignment submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setActiveAssignment(null);
  };

  const handleLessonClick = (lesson) => {
    onVideoSelect(lesson);
    setActiveTab("lesson-view");
  };

  const renderLessonIcon = (lesson) => {
    switch (lesson.content_type) {
      case 'video':
        return <VideoLibrary color={lesson.completed ? "success" : "primary"} />;
      case 'quiz':
        return <QuizIcon color={lesson.completed ? "success" : "primary"} />;
      case 'text':
        return <MenuBook color={lesson.completed ? "success" : "primary"} />;
      case 'pdf':
        return <PictureAsPdf color={lesson.completed ? "success" : "primary"} />;
      default:
        return <Article color={lesson.completed ? "success" : "primary"} />;
    }
  };

  const renderLessonContent = (lesson) => {
    switch (lesson.content_type) {
      case "video":
        return (
          <Box mb={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box
              component="iframe"
              src={lesson.content_url}
              width="100%"
              height="450px"
              sx={{ border: "none" }}
              allowFullScreen
            />
          </Box>
        );
      case "quiz":
        return (
          <Box mb={3} textAlign="center" py={4}>
            <QuizIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" mb={2}>
              Quiz: {lesson.title}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleQuizSelect(lesson.quiz)}
              disabled={lesson.completed}
            >
              {lesson.completed ? "Quiz Completed" : "Take Quiz"}
            </Button>
          </Box>
        );
      case "text":
        return (
          <Box mb={3} sx={{ p: 3, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
            <Typography variant="body1" whiteSpace="pre-wrap">
              {lesson.content_text || "No content available for this lesson."}
            </Typography>
          </Box>
        );
      case "pdf":
        return (
          <Box mb={3} textAlign="center" py={4}>
            <PictureAsPdf sx={{ fontSize: 60, color: theme.palette.error.main, mb: 2 }} />
            <Typography variant="h6" mb={2}>
              PDF Document: {lesson.title}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => window.open(lesson.content_url, "_blank")}
            >
              View PDF
            </Button>
          </Box>
        );
      default:
        return (
          <Box mb={3} textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary">
              Unsupported content type
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Back Button and Course Title */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ 
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          Back to courses
        </Button>
        <Typography variant="h4" fontWeight="bold" sx={{ ml: 2 }}>
          {selectedCourse?.title}
        </Typography>
      </Box>

      {/* Course Progress */}
      <Card sx={{ mb: 3, p: 2, boxShadow: theme.shadows[2] }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Course Progress
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {courseProgress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={courseProgress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.palette.grey[300],
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        />
      </Card>

      {/* Main Content Area */}
      <Box display="flex" gap={3} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Sidebar - Modules and Content */}
        <Card sx={{ width: { xs: '100%', md: '35%' }, p: 2, boxShadow: theme.shadows[2] }}>
          <Tabs 
            value={activeTab === 'lesson-view' ? 'lessons' : activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab 
              value="lessons" 
              label="Content" 
              icon={<VideoLibrary fontSize="small" />}
              iconPosition="start"
            />
            <Tab 
              value="assignments" 
              label="Assignments" 
              icon={<AssignmentIcon fontSize="small" />}
              iconPosition="start"
            />
          </Tabs>

          {selectedCourse?.modules?.map((module) => (
            <Box key={module.id} mb={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {module.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {moduleProgress[module.id] || 0}% complete
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={moduleProgress[module.id] || 0}
                sx={{ 
                  height: 6, 
                  mb: 2,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main
                  }
                }}
              />

              {activeTab === "lessons" && module.lessons?.map((lesson) => (
                <Box
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: currentLesson?.id === lesson.id 
                      ? theme.palette.action.selected 
                      : theme.palette.action.hover,
                    cursor: "pointer",
                    transition: 'all 0.2s ease',
                    "&:hover": {
                      bgcolor: theme.palette.action.selected,
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {renderLessonIcon(lesson)}
                    <Box>
                      <Typography fontWeight={600}>{lesson.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {lesson.content_type} • {lesson.duration}m
                      </Typography>
                    </Box>
                  </Box>
                  {lesson.completed ? (
                    <CheckCircle color="success" />
                  ) : (
                    <PlayCircleFilled color="primary" />
                  )}
                </Box>
              ))}

              {activeTab === "assignments" && module.assignments?.map((assignment) => (
                <Box
                  key={assignment.id}
                  onClick={() => handleAssignmentSelect(assignment)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: theme.palette.action.hover,
                    cursor: "pointer",
                    transition: 'all 0.2s ease',
                    "&:hover": {
                      bgcolor: theme.palette.action.selected,
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <AssignmentIcon color={assignment.submitted ? "success" : "primary"} />
                    <Typography fontWeight={600}>{assignment.title}</Typography>
                  </Box>
                  <Chip 
                    label={assignment.submitted ? "Submitted" : "Pending"} 
                    size="small"
                    color={assignment.submitted ? "success" : "default"}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Card>

        {/* Right Content Area */}
        <Box flex={1}>
          {activeTab === "lesson-view" && currentLesson && (
            <Card sx={{ p: 3, boxShadow: theme.shadows[2] }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  {currentLesson.title}
                </Typography>
                <Chip 
                  label={currentLesson.completed ? "Completed" : "In Progress"} 
                  color={currentLesson.completed ? "success" : "primary"}
                  size="small"
                />
              </Box>

              {renderLessonContent(currentLesson)}

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Notes
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  value={notes}
                  onChange={onNotesChange}
                  placeholder="Add your notes here..."
                  variant="outlined"
                />
              </Box>

              {!currentLesson.completed && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={onMarkCompleted}
                  startIcon={<CheckCircleOutline />}
                  sx={{
                    bgcolor: theme.palette.success.main,
                    "&:hover": { 
                      bgcolor: theme.palette.success.dark,
                      boxShadow: `0 0 12px ${alpha(theme.palette.success.main, 0.5)}`
                    }
                  }}
                >
                  Mark as Completed
                </Button>
              )}
            </Card>
          )}

          {activeTab === "lessons" && !currentLesson && (
            <Card sx={{ 
              p: 3, 
              textAlign: "center",
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: theme.shadows[2]
            }}>
              <MenuBook color="primary" sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" color="text.secondary">
                Select a lesson to begin learning
              </Typography>
            </Card>
          )}

          {activeTab === "assignments" && (
            <Card sx={{ 
              p: 3,
              boxShadow: theme.shadows[2],
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <TaskAlt color="primary" />
                <Typography variant="h5" fontWeight="bold">
                  Assignments
                </Typography>
              </Box>
              
              {selectedCourse?.modules?.some(m => m.assignments?.length > 0) ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box 
                    component="img" 
                    src="https://source.unsplash.com/random/600x400/?assignment" 
                    alt="Assignments" 
                    sx={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      borderRadius: 2,
                      mb: 3,
                      alignSelf: 'center'
                    }} 
                  />
                  <Typography color="text.secondary" textAlign="center">
                    Select an assignment from the sidebar to view details and submit your work
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box 
                    component="img" 
                    src="https://source.unsplash.com/random/600x400/?notebook" 
                    alt="No assignments" 
                    sx={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      borderRadius: 2,
                      mb: 3,
                      alignSelf: 'center'
                    }} 
                  />
                  <Typography color="text.secondary" textAlign="center">
                    No assignments available for this course yet
                  </Typography>
                </Box>
              )}
            </Card>
          )}
        </Box>
      </Box>

      {/* Assignment Dialog */}
      <Dialog
        open={Boolean(activeAssignment)}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
          color: '#fff'
        }}>
          <Typography variant="h6" fontWeight="bold">
            {activeAssignment?.title}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {assignmentSubmitted ? (
            <Box textAlign="center" py={5}>
              <CheckCircleOutline
                sx={{ fontSize: 70, color: theme.palette.success.main, mb: 2 }}
              />
              <Typography variant="h5" fontWeight={600} mb={1}>
                Assignment Submitted!
              </Typography>
              <Typography color="text.secondary">
                Your work has been successfully submitted.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography mb={3}>{activeAssignment?.description}</Typography>
              
              {activeAssignment?.due_date && (
                <Chip
                  label={`Due: ${new Date(activeAssignment.due_date).toLocaleDateString()}`}
                  color="primary"
                  sx={{ mb: 3 }}
                />
              )}

              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Submission
              </Typography>
              <TextField
                multiline
                rows={6}
                fullWidth
                placeholder="Write your solution here or upload files..."
                value={assignmentSubmission}
                onChange={(e) => setAssignmentSubmission(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                startIcon={<NoteAdd />}
                sx={{ mb: 3 }}
              >
                Upload Files
              </Button>

              {activeAssignment?.attachments?.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Resources
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {activeAssignment.attachments.map((file) => (
                      <Chip
                        key={file.id}
                        label={file.original_name}
                        onClick={() => window.open(file.secure_url, "_blank")}
                        sx={{ cursor: "pointer" }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          {!assignmentSubmitted ? (
            <>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSubmitAssignment}
                disabled={!assignmentSubmission.trim() || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleCloseDialog}
              fullWidth
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseDetailView;