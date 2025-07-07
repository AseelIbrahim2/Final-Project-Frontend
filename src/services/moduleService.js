


import apiClient from '../api/apiClient';

export const getModulesByCourse = async (courseId) => {
  try {
    const response = await apiClient.get(`courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch modules');
  }
};

export const createModule = async (courseId, moduleData) => {
  try {
    const response = await apiClient.post(`courses/${courseId}/modules`, moduleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create module');
  }
};

export const updateModule = async (moduleId, updates) => {
  try {
    const response = await apiClient.put(`modules/${moduleId}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update module');
  }
};

export const deleteModule = async (courseId, moduleId) => {
  try {
    const response = await apiClient.delete(`/courses/${courseId}/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete module');
  }
};