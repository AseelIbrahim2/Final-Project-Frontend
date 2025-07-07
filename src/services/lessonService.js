
// import apiClient from '../api/apiClient';
// export const getLessonsByModule = async (moduleId) => {
//   try {
//     const response = await apiClient.get(`/lessons/module/${moduleId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch lessons');
//   }
// };

// export const createLesson = async (lessonData) => {
//   try {
//     const response = await apiClient.post('/lessons', lessonData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateLesson = async (lessonId, updates) => {
//   try {
//     const response = await apiClient.put(`/lessons/${lessonId}`, updates, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteLesson = async (lessonId) => {
//   try {
//     const response = await apiClient.delete(`/lessons/${lessonId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const uploadLessonContent = async (lessonId, file, contentType) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('contentType', contentType);
    
//     const response = await apiClient.post(`lessons/${lessonId}/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to upload content');
//   }
// };


import apiClient from '../api/apiClient';

export const getLessonsByModule = async (moduleId) => {
  try {
    const response = await apiClient.get(`/lessons/module/${moduleId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch lessons');
  }
};

export const createLesson = async (lessonData) => {
  try {
    // التأكد من وجود module_id في البيانات المرسلة
    if (!lessonData.module_id) {
      throw new Error('Module ID is required');
    }

    const response = await apiClient.post('/lessons', lessonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    // تحسين رسائل الخطأ
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        error.message ||
                        'Failed to create lesson';
    throw new Error(errorMessage);
  }
};
export const updateLesson = async (lessonId, updates) => {
  try {
    const response = await apiClient.put(`/lessons/${lessonId}`, updates, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        'Failed to update lesson';
    throw new Error(errorMessage);
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    const response = await apiClient.delete(`/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        'Failed to delete lesson';
    throw new Error(errorMessage);
  }
};

export const uploadLessonContent = async (lessonId, file, contentType) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentType', contentType);
    
    const response = await apiClient.post(`lessons/${lessonId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload content');
  }
};