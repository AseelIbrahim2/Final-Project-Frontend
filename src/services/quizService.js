// // src/services/quizService.js
// import apiClient from '../api/apiClient';

// export const createQuiz = async (quizData) => {
//   try {
//     const response = await apiClient.post('/quizzes', quizData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getQuiz = async (quizId) => {
//   try {
//     const response = await apiClient.get(`/quizzes/${quizId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateQuiz = async (quizId, updates) => {
//   try {
//     const response = await apiClient.put(`/quizzes/${quizId}`, updates);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteQuiz = async (quizId) => {
//   try {
//     const response = await apiClient.delete(`/quizzes/${quizId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getQuizzesByLesson = async (lessonId) => {
//   try {
//     const response = await apiClient.get(`/quizzes/lesson/${lessonId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const submitQuiz = async (quizId, answers) => {
//   try {
//     const response = await apiClient.post(`/quizzes/${quizId}/submit`, { answers });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getQuizSubmissions = async (quizId) => {
//   try {
//     const response = await apiClient.get(`/quizzes/${quizId}/submissions`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getQuizSubmission = async (quizId, submissionId) => {
//   try {
//     const response = await apiClient.get(`/quizzes/${quizId}/submissions/${submissionId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getMyQuizSubmission = async (quizId) => {
//   try {
//     const response = await apiClient.get(`/quizzes/${quizId}/my-submission`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// src/services/quizService.js
import apiClient from '../api/apiClient';

export const createQuiz = async (quizData) => {
  try {
    const response = await apiClient.post('/quizzes', quizData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuiz = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuiz = async (quizId, updates) => {
  try {
    const response = await apiClient.put(`/quizzes/${quizId}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await apiClient.delete(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuizzesByLesson = async (lessonId) => {
  try {
    const response = await apiClient.get(`/quizzes/lesson/${lessonId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuizSubmissions = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}/submissions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuizSubmission = async (submissionId) => {
  try {
    const response = await apiClient.get(`/quizzes/submissions/${submissionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyQuizSubmission = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}/my-submission`);
    return response.data;
  } catch (error) {
    throw error;
  }
};