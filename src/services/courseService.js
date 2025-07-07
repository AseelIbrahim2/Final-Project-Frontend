


import apiClient from '../api/apiClient';

export const getCourses = async () => {
  try {
    const response = await apiClient.get('courses');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
  }
};

export const getCourseDetails = async (id) => {
  try {
    const response = await apiClient.get(`courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course details');
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post('courses', courseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create course');
  }
};

export const updateCourse = async (id, updates) => {
  try {
    const response = await apiClient.put(`courses/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update course');
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};

export const getCourseModules = async (courseId) => {
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
    const response = await apiClient.put(`/courses/modules/${moduleId}`, updates); 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update module');
  }
};

export const deleteModule = async (moduleId) => {
  try {
    const response = await apiClient.delete(`/courses/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete module");
  }
};