// // src/services/categoryService.js
// import apiClient from '../api/apiClient';

// export const getCategories = async () => {
//   try {
//     const response = await apiClient.get('/categories');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createCategory = async (name) => {
//   try {
//     const response = await apiClient.post('/categories', { name });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateCategory = async (id, name) => {
//   try {
//     const response = await apiClient.put(`/categories/${id}`, { name });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteCategory = async (id) => {
//   try {
//     const response = await apiClient.delete(`/categories/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };



import apiClient from '../api/apiClient';

export const getCategories = async () => {
  try {
    const response = await apiClient.get('categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name) => {
  try {
    const response = await apiClient.post('categories', { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await apiClient.put(`categories/${id}`, { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};