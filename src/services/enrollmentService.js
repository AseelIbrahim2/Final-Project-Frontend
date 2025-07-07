// src/services/enrollmentService.js
import apiClient from '../api/apiClient';

export const enrollInCourse = async (courseId) => {
  try {
    const response = await apiClient.post('/enrollments', { courseId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserEnrollments = async () => {
  try {
    const response = await apiClient.get('/enrollments/user/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEnrollmentDetails = async (enrollmentId) => {
  try {
    const response = await apiClient.get(`/enrollments/${enrollmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseProgress = async (enrollmentId) => {
  try {
    const response = await apiClient.get(`/enrollments/${enrollmentId}/progress`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markLessonCompleted = async (lessonId, notes = "") => {
  try {
    const response = await apiClient.post('/enrollments/complete-lesson', { lessonId, notes });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProgressSummary = async (courseId) => {
  try {
    const response = await apiClient.get(`/enrollments/course/${courseId}/summary`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLessonCompletionStatus = async (lessonId) => {
  try {
    const response = await apiClient.get(`/enrollments/lessons/${lessonId}/status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};