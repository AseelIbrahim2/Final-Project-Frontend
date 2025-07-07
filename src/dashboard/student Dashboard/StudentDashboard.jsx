

// import React, { useState, useEffect } from "react";
// import { 
//   Box, 
//   Grid, 
//   Container, 
//   Typography, 
//   CircularProgress, 
//   Card,
//   Tabs,
//   Tab,
//   Divider
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useEnrollment } from "../../hooks/useEnrollment";
// import { useCourses } from "../../hooks/useCourses";
// import CourseCard from "./CourseCard";
// import CourseDetailView from "./CourseDetailView";
// import { School, CheckCircle, EmojiEvents, PlayCircleFilled } from '@mui/icons-material';
// import { useTheme } from "@emotion/react";
// import apiClient from "../../api/apiClient";

// const StudentDashboard = () => {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [courseDetails, setCourseDetails] = useState(null);
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [notes, setNotes] = useState("");
//   const [availableCourses, setAvailableCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(false);
//   const [activeTab, setActiveTab] = useState('enrolled');
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();
  
//   const { 
//     enrollments, 
//     loading, 
//     error, 
//     enroll, 
//     getProgress, 
//     completeLesson,
//     fetchUserEnrollments
//   } = useEnrollment();

//   const { courses: allCourses, fetchCourses } = useCourses();

//   useEffect(() => {
//     const fetchAllCourses = async () => {
//       setLoadingCourses(true);
//       try {
//         await fetchCourses();
//       } catch (err) {
//         console.error("Failed to fetch courses:", err);
//       } finally {
//         setLoadingCourses(false);
//       }
//     };

//     fetchAllCourses();
//   }, []);

//   useEffect(() => {
//     if (allCourses && enrollments) {
//       const enrolledCourseIds = enrollments.map(e => e.course_id);
//       const available = allCourses
//         .filter(course => !enrolledCourseIds.includes(course.id))
//         .map(course => ({
//           ...course,
//           is_new: new Date(course.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         }));
//       setAvailableCourses(available);
//     }
//   }, [allCourses, enrollments]);

//  // StudentDashboard.jsx (التعديلات فقط)
// const fetchCourseDetails = async (courseId) => {
//   setLoadingDetails(true);
//   try {
//     const response = await apiClient.get(`/courses/${courseId}`);
//     console.log("📦 Full response from backend:", response.data);

//     const details = response.data.data;

//     if (!details || !details.id || !details.title) {
//       throw new Error("Invalid course data structure");
//     }

//     // جلب الدروس لكل موديول
//     const modulesWithLessons = await Promise.all(
//       (details.modules || []).map(async (module) => {
//         const lessonsResponse = await apiClient.get(`/lessons/module/${module.id}`);
//         return {
//           ...module,
//           lessons: lessonsResponse.data.data || [],
//         };
//       })
//     );

//     const updatedDetails = {
//       ...details,
//       modules: modulesWithLessons,
//     };

//     return updatedDetails;
//   } catch (err) {
//     console.error("Failed to fetch course details:", err);
//     throw err;
//   } finally {
//     setLoadingDetails(false);
//   }
// };


//   const handleCourseClick = async (course) => {
//     try {
//       setSelectedCourse(course);
//       const details = await fetchCourseDetails(course.course_id);
//       setCourseDetails(details);
      
//       // Find first incomplete lesson or default to first lesson
//       const allLessons = details.modules.flatMap(m => m.lessons || []);
//       const firstIncompleteLesson = allLessons.find(l => !l?.completed) || allLessons[0];
        
//       if (firstIncompleteLesson) {
//         setCurrentLesson(firstIncompleteLesson);
//         setCurrentVideo(firstIncompleteLesson.content_type === 'video' 
//           ? firstIncompleteLesson.content_url 
//           : null);
//         setNotes(firstIncompleteLesson.notes || "");
//       }
//     } catch (err) {
//       console.error("Error loading course data:", err);
//     }
//   };

//   const handleBackToCourses = () => {
//     setSelectedCourse(null);
//     setCourseDetails(null);
//     setCurrentVideo(null);
//     setCurrentLesson(null);
//     setNotes("");
//   };

//   const handleVideoSelect = (lesson) => {
//     setCurrentLesson(lesson);
//     setCurrentVideo(lesson?.content_type === 'video' ? lesson.content_url : null);
//     setNotes(lesson?.notes || "");
//   };

//   const handleMarkLessonCompleted = async () => {
//     if (!currentLesson || !selectedCourse || !courseDetails) return;

//     try {
//       await completeLesson(currentLesson.id, notes);
      
//       // Update local state to reflect completion
//       const updatedDetails = { ...courseDetails };
//       updatedDetails.modules = updatedDetails.modules.map(module => ({
//         ...module,
//         lessons: module.lessons?.map(lesson => 
//           lesson?.id === currentLesson.id 
//             ? { ...lesson, completed: true, notes }
//             : lesson
//         ) || []
//       }));
      
//       setCourseDetails(updatedDetails);
      
//       // Find next incomplete lesson
//       const allLessons = updatedDetails.modules.flatMap(m => m.lessons || []);
//       const nextIncompleteLesson = allLessons.find(
//         (l, index) => index > allLessons.findIndex(l => l?.id === currentLesson.id) && !l?.completed
//       );
      
//       if (nextIncompleteLesson) {
//         setCurrentLesson(nextIncompleteLesson);
//         setCurrentVideo(nextIncompleteLesson.content_type === 'video' 
//           ? nextIncompleteLesson.content_url 
//           : null);
//         setNotes(nextIncompleteLesson.notes || "");
//       }
      
//       // Update overall progress
//       const progress = await getProgress(selectedCourse.id);
//       setSelectedCourse(prev => ({ ...prev, progress: progress?.percentage || 0 }));
      
//       // Refresh enrollments to update progress in the dashboard
//       await fetchUserEnrollments();
      
//     } catch (err) {
//       console.error("Failed to mark lesson as completed:", err);
//     }
//   };

//   const handleNotesChange = (e) => {
//     setNotes(e.target.value);
//   };

//   const handleEnrollInCourse = async (courseId) => {
//     try {
//       await enroll(courseId);
//       await fetchUserEnrollments();
//     } catch (err) {
//       console.error("Enrollment failed:", err);
//     }
//   };

//   if (selectedCourse && courseDetails) {
//     return (
//       <CourseDetailView
//         selectedCourse={{ ...selectedCourse, ...courseDetails }}
//         currentLesson={currentLesson}
//         currentVideo={currentVideo}
//         notes={notes}
//         onBack={handleBackToCourses}
//         onVideoSelect={handleVideoSelect}
//         onMarkCompleted={handleMarkLessonCompleted}
//         onNotesChange={handleNotesChange}
//       />
//     );
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
//         My Learning Dashboard
//       </Typography>

//       {loading && (
//         <Box display="flex" justifyContent="center" my={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Typography color="error" sx={{ mb: 3 }}>
//           {error}
//         </Typography>
//       )}

//       {/* Stats Cards */}
//       <Grid container spacing={3} mb={4}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, height: '100%' }}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <School color="primary" sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Enrolled Courses</Typography>
//                 <Typography variant="h4" fontWeight="bold">
//                   {enrollments?.length || 0}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, height: '100%' }}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <CheckCircle color="success" sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Completed</Typography>
//                 <Typography variant="h4" fontWeight="bold">
//                   {enrollments?.filter(e => e.progress === 100).length || 0}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, height: '100%' }}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <EmojiEvents color="warning" sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">Certificates</Typography>
//                 <Typography variant="h4" fontWeight="bold">
//                   {enrollments?.filter(e => e.progress === 100).length || 0}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 2, height: '100%' }}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <PlayCircleFilled color="info" sx={{ fontSize: 40 }} />
//               <Box>
//                 <Typography variant="h6">In Progress</Typography>
//                 <Typography variant="h4" fontWeight="bold">
//                   {enrollments?.filter(e => e.progress > 0 && e.progress < 100).length || 0}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Tabs */}
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//         <Tabs 
//           value={activeTab} 
//           onChange={(e, newValue) => setActiveTab(newValue)}
//           variant="scrollable"
//           scrollButtons="auto"
//         >
//           <Tab label="My Courses" value="enrolled" icon={<School />} />
//           <Tab label="Available Courses" value="available" icon={<CheckCircle />} />
//         </Tabs>
//       </Box>

//       {/* Enrolled Courses Section */}
//       {activeTab === 'enrolled' && (
//         <>
//           <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
//             My Courses
//           </Typography>
          
//           <Grid container spacing={3} sx={{ mb: 6 }}>
//             {enrollments?.length > 0 ? (
//               enrollments.map((enrollment) => (
//                 <Grid item xs={12} md={6} lg={4} key={enrollment.id}>
//                   <CourseCard
//                     course={enrollment}
//                     onContinue={() => handleCourseClick(enrollment)}
//                     progress={enrollment.progress}
//                   />
//                 </Grid>
//               ))
//             ) : (
//               <Grid item xs={12}>
//                 <Typography variant="h6" align="center" sx={{ py: 4 }}>
//                   You haven't enrolled in any courses yet.
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </>
//       )}

//       {/* Available Courses Section */}
//       {activeTab === 'available' && (
//         <>
//           <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
//             Available Courses
//           </Typography>
          
//           {loadingCourses ? (
//             <Box display="flex" justifyContent="center" my={4}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={3}>
//               {availableCourses?.map((course) => (
//                 <Grid item xs={12} md={6} lg={4} key={course.id}>
//                   <CourseCard
//                     course={course}
//                     isNew={course.is_new}
//                     onEnroll={() => handleEnrollInCourse(course.id)}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default StudentDashboard;



import React, { useState, useEffect } from "react";
import { 
  Box, 
  Grid, 
  Container, 
  Typography, 
  CircularProgress, 
  Card,
  Tabs,
  Tab,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEnrollment } from "../../hooks/useEnrollment";
import { useCourses } from "../../hooks/useCourses";
import CourseCard from "./CourseCard";
import CourseDetailView from "./CourseDetailView";
import { School, CheckCircle, EmojiEvents, PlayCircleFilled } from '@mui/icons-material';
import { useTheme } from "@emotion/react";
import apiClient from "../../api/apiClient";

const StudentDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [notes, setNotes] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { 
    enrollments, 
    loading, 
    error, 
    enroll, 
    getProgress, 
    completeLesson,
    fetchUserEnrollments
  } = useEnrollment();

  const { courses: allCourses, fetchCourses } = useCourses();

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoadingCourses(true);
      try {
        await fetchCourses();
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (allCourses && enrollments) {
      const enrolledCourseIds = enrollments.map(e => e.course_id);
      const available = allCourses
        .filter(course => !enrolledCourseIds.includes(course.id))
        .map(course => ({
          ...course,
          is_new: new Date(course.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }));
      setAvailableCourses(available);
    }
  }, [allCourses, enrollments]);

  const fetchCourseDetails = async (courseId) => {
    setLoadingDetails(true);
    try {
      const response = await apiClient.get(`/courses/${courseId}`);
      console.log("📦 Full response from backend:", response.data);

      const details = response.data.data;

      if (!details || !details.id || !details.title) {
        throw new Error("Invalid course data structure");
      }

      // جلب الدروس لكل موديول
      const modulesWithLessons = await Promise.all(
        (details.modules || []).map(async (module) => {
          const lessonsResponse = await apiClient.get(`/lessons/module/${module.id}`);
          
          const lessonsWithContent = await Promise.all(
            (lessonsResponse.data.data || []).map(async (lesson) => {
              if (lesson.content_type === 'quiz') {
                const quizResponse = await apiClient.get(`/quizzes/lesson/${lesson.id}`);
                return {
                  ...lesson,
                  quiz: quizResponse.data.data
                };
              }
              return lesson;
            })
          );

          return {
            ...module,
            lessons: lessonsWithContent,
          };
        })
      );

      const updatedDetails = {
        ...details,
        modules: modulesWithLessons,
      };

      return updatedDetails;
    } catch (err) {
      console.error("Failed to fetch course details:", err);
      throw err;
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCourseClick = async (course) => {
    try {
      setSelectedCourse(course);
      const details = await fetchCourseDetails(course.course_id);
      setCourseDetails(details);
      
      // Find first incomplete lesson or default to first lesson
      const allLessons = details.modules.flatMap(m => m.lessons || []);
      const firstIncompleteLesson = allLessons.find(l => !l?.completed) || allLessons[0];
        
      if (firstIncompleteLesson) {
        setCurrentLesson(firstIncompleteLesson);
        setCurrentVideo(firstIncompleteLesson.content_type === 'video' 
          ? firstIncompleteLesson.content_url 
          : null);
        setNotes(firstIncompleteLesson.notes || "");
      }
    } catch (err) {
      console.error("Error loading course data:", err);
    }
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCourseDetails(null);
    setCurrentVideo(null);
    setCurrentLesson(null);
    setNotes("");
  };

  const handleVideoSelect = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentVideo(lesson?.content_type === 'video' ? lesson.content_url : null);
    setNotes(lesson?.notes || "");
  };

  const handleMarkLessonCompleted = async () => {
    if (!currentLesson || !selectedCourse || !courseDetails) return;

    try {
      await completeLesson(currentLesson.id, notes);
      
      // Update local state to reflect completion
      const updatedDetails = { ...courseDetails };
      updatedDetails.modules = updatedDetails.modules.map(module => ({
        ...module,
        lessons: module.lessons?.map(lesson => 
          lesson?.id === currentLesson.id 
            ? { ...lesson, completed: true, notes }
            : lesson
        ) || []
      }));
      
      setCourseDetails(updatedDetails);
      
      // Find next incomplete lesson
      const allLessons = updatedDetails.modules.flatMap(m => m.lessons || []);
      const nextIncompleteLesson = allLessons.find(
        (l, index) => index > allLessons.findIndex(l => l?.id === currentLesson.id) && !l?.completed
      );
      
      if (nextIncompleteLesson) {
        setCurrentLesson(nextIncompleteLesson);
        setCurrentVideo(nextIncompleteLesson.content_type === 'video' 
          ? nextIncompleteLesson.content_url 
          : null);
        setNotes(nextIncompleteLesson.notes || "");
      }
      
      // Update overall progress
      const progress = await getProgress(selectedCourse.id);
      setSelectedCourse(prev => ({ ...prev, progress: progress?.percentage || 0 }));
      
      // Refresh enrollments to update progress in the dashboard
      await fetchUserEnrollments();
      
    } catch (err) {
      console.error("Failed to mark lesson as completed:", err);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleEnrollInCourse = async (courseId) => {
    try {
      await enroll(courseId);
      await fetchUserEnrollments();
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  if (selectedCourse && courseDetails) {
    return (
      <CourseDetailView
        selectedCourse={{ ...selectedCourse, ...courseDetails }}
        currentLesson={currentLesson}
        currentVideo={currentVideo}
        notes={notes}
        onBack={handleBackToCourses}
        onVideoSelect={handleVideoSelect}
        onMarkCompleted={handleMarkLessonCompleted}
        onNotesChange={handleNotesChange}
      />
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        My Learning Dashboard
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <School color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Enrolled Courses</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {enrollments?.length || 0}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircle color="success" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Completed</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {enrollments?.filter(e => e.progress === 100).length || 0}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <EmojiEvents color="warning" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Certificates</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {enrollments?.filter(e => e.progress === 100).length || 0}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <PlayCircleFilled color="info" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">In Progress</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {enrollments?.filter(e => e.progress > 0 && e.progress < 100).length || 0}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="My Courses" value="enrolled" icon={<School />} />
          <Tab label="Available Courses" value="available" icon={<CheckCircle />} />
        </Tabs>
      </Box>

      {/* Enrolled Courses Section */}
      {activeTab === 'enrolled' && (
        <>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            My Courses
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {enrollments?.length > 0 ? (
              enrollments.map((enrollment) => (
                <Grid item xs={12} md={6} lg={4} key={enrollment.id}>
                  <CourseCard
                    course={enrollment}
                    onContinue={() => handleCourseClick(enrollment)}
                    progress={enrollment.progress}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" sx={{ py: 4 }}>
                  You haven't enrolled in any courses yet.
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {/* Available Courses Section */}
      {activeTab === 'available' && (
        <>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Available Courses
          </Typography>
          
          {loadingCourses ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {availableCourses?.map((course) => (
                <Grid item xs={12} md={6} lg={4} key={course.id}>
                  <CourseCard
                    course={course}
                    isNew={course.is_new}
                    onEnroll={() => handleEnrollInCourse(course.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentDashboard;