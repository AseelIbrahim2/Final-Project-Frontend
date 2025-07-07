

// import { useState } from 'react';
// import adminService from '../services/adminService';

// const useAdmin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const users = await adminService.fetchUsers();
//       return users;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addUser = async (userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const newUser = await adminService.createUser(userData);
//       return newUser;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (userId, userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedUser = await adminService.updateUser(userId, userData);
//       return updatedUser;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (userId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await adminService.deleteUser(userId);
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPendingCourses = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const courses = await adminService.fetchPendingCourses();
//       return courses;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approveCourse = async (courseId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const course = await adminService.approveCourse(courseId);
//       return course;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserActivityReport = async (timeRange) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const report = await adminService.fetchUserActivityReport(timeRange);
//       return report;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCoursePopularityReport = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const report = await adminService.fetchCoursePopularityReport();
//       return report;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSystemPerformanceReport = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const report = await adminService.fetchSystemPerformanceReport();
//       return report;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportReport = async (reportType, format = 'csv') => {
//     setLoading(true);
//     setError(null);
//     try {
//       const report = await adminService.exportReport(reportType, format);
//       return report;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
//   const rejectCourse = async (courseId, feedback) => {
//   setLoading(true);
//   setError(null);
//   try {
//     const course = await adminService.rejectCourse(courseId, feedback);
//     return course;
//   } catch (err) {
//     setError(err.message);
//     throw err;
//   } finally {
//     setLoading(false);
//   }
// };


//   return {
//     loading,
//     error,
//     getUsers,
//     addUser,
//     updateUser,
//     deleteUser,
//     getPendingCourses,
//     approveCourse,
//     getUserActivityReport,
//     getCoursePopularityReport,
//     getSystemPerformanceReport,
//     exportReport,
//       rejectCourse,
//   };
// };

// export default useAdmin;


import { useState } from 'react';
import adminService from '../services/adminService';

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.fetchUsers();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.createUser(userData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.updateUser(userId, userData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      await adminService.deleteUser(userId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPendingCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.fetchPendingCourses();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.approveCourse(courseId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectCourse = async (courseId, feedback) => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.rejectCourse(courseId, feedback);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserActivityReport = async (timeRange = 'monthly') => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.fetchUserActivityReport(timeRange);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCoursePopularityReport = async () => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.fetchCoursePopularityReport();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSystemPerformanceReport = async () => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.fetchSystemPerformanceReport();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (reportType, format = 'xlsx') => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.exportReport(reportType, format);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getPendingCourses,
    approveCourse,
    rejectCourse,
    getUserActivityReport,
    getCoursePopularityReport,
    getSystemPerformanceReport,
    exportReport,
  };
};

export default useAdmin;