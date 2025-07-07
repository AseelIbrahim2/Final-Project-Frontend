


// import adminApi from '../api/adminApi';

// const adminService = {
//   fetchUsers: async () => {
//     try {
//       const response = await adminApi.getAllUsers();
//       return response.data.users || [];
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to fetch users');
//     }
//   },

//   createUser: async (userData) => {
//     try {
//       const response = await adminApi.addUser({
//         name: userData.name,
//         email: userData.email,
//         role: userData.role,
//         password: userData.password
//       });
//       return response.data.user;
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to create user');
//     }
//   },

//   updateUser: async (userId, userData) => {
//     try {
//       const response = await adminApi.updateUser(userId, {
//         name: userData.name,
//         email: userData.email,
//         role: userData.role,
//         ...(userData.password && { password: userData.password })
//       });
//       return response.data.user;
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to update user');
//     }
//   },

//   deleteUser: async (userId) => {
//     try {
//       await adminApi.deleteUser(userId);
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to delete user');
//     }
//   },

//   fetchPendingCourses: async () => {
//     try {
//       const response = await adminApi.getPendingCourses();
//       return response.data.courses || [];
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to fetch pending courses');
//     }
//   },

//   approveCourse: async (courseId) => {
//     try {
//       const response = await adminApi.approveCourse(courseId);
//       return response.data.course;
//     } catch (error) {
//       throw new Error(error.response?.data?.error || 'Failed to approve course');
//     }
//   },

//   fetchUserActivityReport: async (timeRange = '24h') => {
//     try {
//       const response = await adminApi.getUserActivityReport(timeRange);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch user activity report');
//     }
//   },

//   fetchCoursePopularityReport: async () => {
//     try {
//       const response = await adminApi.getCoursePopularityReport();
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch course popularity report');
//     }
//   },

//   fetchSystemPerformanceReport: async () => {
//     try {
//       const response = await adminApi.getSystemPerformanceReport();
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch system performance report');
//     }
//   },

//   exportReport: async (reportType, format = 'csv') => {
//     try {
//       const response = await adminApi.exportReport(reportType, format);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to export report');
//     }
//   },

// rejectCourse: async (courseId, feedback) => {
//   try {
//     const response = await adminApi.rejectCourse(courseId, { feedback });
//     return response.data.course;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || 'Failed to reject course');
//   }
// },
// };

// export default adminService;



import adminApi from '../api/adminApi';

const adminService = {
  fetchUsers: async () => {
    try {
      const response = await adminApi.getAllUsers();
      return response.data.users || [];
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch users');
    }
  },

  createUser: async (userData) => {
    try {
      const response = await adminApi.addUser(userData);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create user');
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await adminApi.updateUser(userId, userData);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update user');
    }
  },

  deleteUser: async (userId) => {
    try {
      await adminApi.deleteUser(userId);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete user');
    }
  },

  fetchPendingCourses: async () => {
    try {
      const response = await adminApi.getPendingCourses();
      return response.data.courses || [];
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch pending courses');
    }
  },

  approveCourse: async (courseId) => {
    try {
      const response = await adminApi.approveCourse(courseId);
      return response.data.course;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to approve course');
    }
  },

  rejectCourse: async (courseId, feedback) => {
    try {
      const response = await adminApi.rejectCourse(courseId, { feedback });
      return response.data.course;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to reject course');
    }
  },

  fetchUserActivityReport: async (timeRange = 'monthly') => {
    try {
      const response = await adminApi.getUserActivityReport(timeRange);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user activity report');
    }
  },

  fetchCoursePopularityReport: async () => {
    try {
      const response = await adminApi.getCoursePopularityReport();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course popularity report');
    }
  },

  fetchSystemPerformanceReport: async () => {
    try {
      const response = await adminApi.getSystemPerformanceReport();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch system performance report');
    }
  },

  exportReport: async (reportType, format = 'xlsx') => {
    try {
      const response = await adminApi.exportReport(reportType, format);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export report');
    }
  },
};

export default adminService;