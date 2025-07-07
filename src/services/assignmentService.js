// // src/services/assignmentService.js
// import apiClient from '../api/apiClient';

// export const createAssignment = async (assignmentData) => {
//   try {
//     const response = await apiClient.post('/assignments', assignmentData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getAssignment = async (assignmentId) => {
//   try {
//     const response = await apiClient.get(`/assignments/${assignmentId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getAssignmentsByLesson = async (lessonId) => {
//   try {
//     const response = await apiClient.get(`/assignments/lesson/${lessonId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateAssignment = async (assignmentId, updates) => {
//   try {
//     const response = await apiClient.put(`/assignments/${assignmentId}`, updates);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteAssignment = async (assignmentId) => {
//   try {
//     const response = await apiClient.delete(`/assignments/${assignmentId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


// src/services/assignmentService.js
import apiClient from '../api/apiClient';

export const createAssignment = async (assignmentData) => {
  try {
    const response = await apiClient.post('/assignments', assignmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignment = async (assignmentId) => {
  try {
    const response = await apiClient.get(`/assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignmentsByLesson = async (lessonId) => {
  try {
    const response = await apiClient.get(`/assignments/lesson/${lessonId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAssignment = async (assignmentId, updates) => {
  try {
    const response = await apiClient.put(`/assignments/${assignmentId}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAssignment = async (assignmentId) => {
  try {
    const response = await apiClient.delete(`/assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};