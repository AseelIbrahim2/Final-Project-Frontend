

import apiClient from '../api/apiClient';

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('attachments/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (fileId) => {
  try {
    const response = await apiClient.get(`attachments/file/${fileId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  try {
    const response = await apiClient.delete(`attachments/file/${fileId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadLessonAttachment = async (lessonId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`attachments/lessons/${lessonId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLessonAttachments = async (lessonId) => {
  try {
    const response = await apiClient.get(`attachments/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadSubmissionAttachment = async (submissionId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`attachments/submissions/${submissionId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionAttachments = async (submissionId) => {
  try {
    const response = await apiClient.get(`attachments/submissions/${submissionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};