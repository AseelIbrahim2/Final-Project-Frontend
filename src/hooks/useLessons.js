
// import { useState, useEffect } from 'react';
// import {
//   getLessonsByModule,
//   createLesson,
//   updateLesson,
//   deleteLesson,
//   uploadLessonContent
// } from '../services/lessonService';
// import { useAttachment } from './useAttachment';

// export const useLessons = (moduleId) => {
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { uploadForLesson } = useAttachment();

//   const fetchLessons = async (moduleId) => {
//     if (!moduleId) return;

//     setLoading(true);
//     try {
//       const response = await getLessonsByModule(moduleId);
//       setLessons(response.data || []);
//       setError(null);
//       return response.data || [];
//     } catch (err) {
//       setError(err.message || 'Failed to fetch lessons');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addLesson = async (lessonData, file) => {
//     setLoading(true);
//     try {
//       // تأكد من أن module_id مضمن في البيانات المرسلة
//       const lessonToCreate = {
//         ...lessonData,
//         module_id: moduleId // استخدم moduleId من البرامتر
//       };

//       const response = await createLesson(lessonToCreate);
      
//       if (file && lessonData.content_type !== 'quiz') {
//         const attachment = await uploadForLesson(response.id, file);
//         await updateLesson(response.id, { content_url: attachment.secure_url });
//         const updatedLesson = { ...response, content_url: attachment.secure_url };
//         setLessons(prev => [...prev, updatedLesson]);
//         return updatedLesson;
//       }

//       setLessons(prev => [...prev, response]);
//       return response;
//     } catch (err) {
//       setError(err.message || 'Failed to create lesson');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };


//   const editLesson = async (lessonId, updates) => {
//     setLoading(true);
//     try {
//       const response = await updateLesson(lessonId, updates);
//       setLessons(prev => prev.map(l => l.id === lessonId ? response : l));
//       return response;
//     } catch (err) {
//       setError(err.message || 'Failed to update lesson');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeLesson = async (lessonId) => {
//     setLoading(true);
//     try {
//       await deleteLesson(lessonId);
//       setLessons(prev => prev.filter(l => l.id !== lessonId));
//       return true;
//     } catch (err) {
//       setError(err.message || 'Failed to delete lesson');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (moduleId) {
//       fetchLessons(moduleId);
//     }
//   }, [moduleId]);

//   return {
//     lessons,
//     loading,
//     error,
//     fetchLessons,
//     addLesson,
//     editLesson,
//     removeLesson
//   };
// };


import { useState, useEffect } from 'react';
import {
  getLessonsByModule,
  createLesson,
  updateLesson,
  deleteLesson
} from '../services/lessonService';
import { useAttachment } from './useAttachment';

export const useLessons = (moduleId) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { uploadForLesson } = useAttachment();

  const fetchLessons = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await getLessonsByModule(id);
      setLessons(response.data || []);
      setError(null);
      return response.data || [];
    } catch (err) {
      setError(err.message || 'Failed to fetch lessons');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addLesson = async (lessonData, file) => {
    setLoading(true);
    try {
      if (!lessonData.module_id) {
        throw new Error('Module ID is required');
      }

      const response = await createLesson(lessonData);
      
      if (file && lessonData.content_type !== 'quiz') {
        const attachment = await uploadForLesson(response.id, file);
        await updateLesson(response.id, { content_url: attachment.secure_url });
        const updatedLesson = { ...response, content_url: attachment.secure_url };
        setLessons(prev => [...prev, updatedLesson]);
        return updatedLesson;
      }

      setLessons(prev => [...prev, response]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to create lesson');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editLesson = async (lessonId, updates) => {
    setLoading(true);
    try {
      const response = await updateLesson(lessonId, updates);
      setLessons(prev => prev.map(l => l.id === lessonId ? response : l));
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update lesson');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeLesson = async (lessonId) => {
    setLoading(true);
    try {
      await deleteLesson(lessonId);
      setLessons(prev => prev.filter(l => l.id !== lessonId));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete lesson');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moduleId) {
      fetchLessons(moduleId);
    }
  }, [moduleId]);

  return {
    lessons,
    loading,
    error,
    fetchLessons,
    addLesson,
    editLesson,
    removeLesson
  };
};