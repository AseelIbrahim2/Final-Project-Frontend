

// import { useState, useEffect } from 'react';
// import { 
//   enrollInCourse, 
//   getUserEnrollments,
//   getEnrollmentDetails,
//   getCourseProgress,
//   markLessonCompleted,
//   getProgressSummary,
//   getLessonCompletionStatus
// } from '../services/enrollmentService';

// export const useEnrollment = () => {
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUserEnrollments = async () => {
//     setLoading(true);
//     try {
//       const data = await getUserEnrollments();
//       setEnrollments(data.enrollments || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const enroll = async (courseId) => {
//     try {
//       const newEnrollment = await enrollInCourse(courseId);
//       setEnrollments([...enrollments, newEnrollment.enrollment]);
//       return newEnrollment;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const getDetails = async (enrollmentId) => {
//     try {
//       const data = await getEnrollmentDetails(enrollmentId);
//       return data.enrollment;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const getProgress = async (enrollmentId) => {
//     try {
//       const data = await getCourseProgress(enrollmentId);
//       return data.progressDetails;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const completeLesson = async (lessonId, notes = "") => {
//     try {
//       const data = await markLessonCompleted(lessonId, notes);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const getSummary = async (courseId) => {
//     try {
//       const data = await getProgressSummary(courseId);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const getLessonCompletion = async (lessonId) => {
//     try {
//       const data = await getLessonCompletionStatus(lessonId);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchUserEnrollments();
//   }, []);

//   return { 
//     enrollments, 
//     loading, 
//     error, 
//     enroll, 
//     getDetails, 
//     getProgress, 
//     completeLesson, 
//     getSummary,
//     getLessonCompletion,
//     fetchUserEnrollments
//   };
// };

import { useState, useEffect } from 'react';
import { 
  enrollInCourse, 
  getUserEnrollments,
  getEnrollmentDetails,
  getCourseProgress,
  markLessonCompleted,
  getProgressSummary,
  getLessonCompletionStatus
} from '../services/enrollmentService';

export const useEnrollment = () => {
  const [state, setState] = useState({
    enrollments: [],
    loading: false,
    error: null
  });

  const fetchUserEnrollments = async () => {
    setState(prev => ({...prev, loading: true, error: null}));
    try {
      const data = await getUserEnrollments();
      setState(prev => ({
        ...prev,
        enrollments: data.enrollments || [],
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.message,
        loading: false
      }));
    }
  };

  const enroll = async (courseId) => {
    try {
      const newEnrollment = await enrollInCourse(courseId);
      setState(prev => ({
        ...prev,
        enrollments: [...prev.enrollments, newEnrollment.enrollment]
      }));
      return newEnrollment;
    } catch (err) {
      throw err;
    }
  };

  const getDetails = async (enrollmentId) => {
    try {
      const data = await getEnrollmentDetails(enrollmentId);
      return data.enrollment;
    } catch (err) {
      throw err;
    }
  };

  const getProgress = async (enrollmentId) => {
    try {
      const data = await getCourseProgress(enrollmentId);
      return data.progressDetails;
    } catch (err) {
      throw err;
    }
  };

  const completeLesson = async (lessonId, notes = "") => {
    try {
      return await markLessonCompleted(lessonId, notes);
    } catch (err) {
      throw err;
    }
  };

  const getSummary = async (courseId) => {
    try {
      return await getProgressSummary(courseId);
    } catch (err) {
      throw err;
    }
  };

  const getLessonCompletion = async (lessonId) => {
    try {
      return await getLessonCompletionStatus(lessonId);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchUserEnrollments();
  }, []);

  return { 
    ...state,
    enroll, 
    getDetails, 
    getProgress, 
    completeLesson, 
    getSummary,
    getLessonCompletion,
    fetchUserEnrollments
  };
};