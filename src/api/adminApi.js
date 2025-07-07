

import apiClient from './apiClient';

const adminApi = {
  getAllUsers: () => apiClient.get('/admin/users'),
  getUserById: (userId) => apiClient.get(`/admin/users/${userId}`),
  addUser: (userData) => apiClient.post('/admin/users', userData),
  updateUser: (userId, userData) => apiClient.put(`/admin/users/${userId}`, userData),
  deleteUser: (userId) => apiClient.delete(`/admin/users/${userId}`),
  
  getPendingCourses: () => apiClient.get('/admin/courses/pending'),
  approveCourse: (courseId) => apiClient.patch(`/admin/courses/${courseId}/approve`),
  rejectCourse: (courseId, feedback) => apiClient.patch(`/admin/courses/${courseId}/reject`, { feedback }),

  getUserActivityReport: (timeRange) => apiClient.get(`/admin/reports/user-activity?timeRange=${timeRange}`),
  getCoursePopularityReport: () => apiClient.get('/admin/reports/course-popularity'),
  getSystemPerformanceReport: () => apiClient.get('/admin/reports/system-performance'),
  exportReport: (reportType, format) => apiClient.get(
    `/admin/reports/export?reportType=${reportType}&format=${format}`,
    { responseType: 'blob' }
  ),
};

export default adminApi;