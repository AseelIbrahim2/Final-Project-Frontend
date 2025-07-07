// // src/services/submissionService.js
// import apiClient from '../api/apiClient';

// export const submitAssignment = async (assignmentId, submissionUrl) => {
//   try {
//     const response = await apiClient.post('/submissions', { 
//       assignment_id: assignmentId, 
//       submission_url: submissionUrl 
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getSubmission = async (submissionId) => {
//   try {
//     const response = await apiClient.get(`/submissions/${submissionId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getSubmissionsByAssignment = async (assignmentId) => {
//   try {
//     const response = await apiClient.get(`/submissions/assignment/${assignmentId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const gradeSubmission = async (submissionId, grade, feedback) => {
//   try {
//     const response = await apiClient.put(`/submissions/${submissionId}/grade`, { 
//       grade, 
//       feedback 
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteSubmission = async (submissionId) => {
//   try {
//     const response = await apiClient.delete(`/submissions/${submissionId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// src/services/submissionService.js
import apiClient from '../api/apiClient';

export const submitAssignment = async (assignmentId, submissionData) => {
  try {
    const response = await apiClient.post('/submissions', {
      assignment_id: assignmentId,
      ...submissionData
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubmission = async (submissionId) => {
  try {
    const response = await apiClient.get(`/submissions/${submissionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    const response = await apiClient.get(`/submissions/assignment/${assignmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gradeSubmission = async (submissionId, grade, feedback) => {
  try {
    const response = await apiClient.put(`/submissions/${submissionId}/grade`, {
      grade,
      feedback
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubmission = async (submissionId) => {
  try {
    const response = await apiClient.delete(`/submissions/${submissionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};