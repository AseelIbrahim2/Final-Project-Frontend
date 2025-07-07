// // src/hooks/useAttachment.js
// import { useState } from 'react';
// import { uploadFile, getFile, deleteFile } from '../services/attachmentService';

// export const useAttachment = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const upload = async (file) => {
//     setLoading(true);
//     try {
//       const data = await uploadFile(file);
//       setError(null);
//       return data.attachment;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFile = async (fileId) => {
//     setLoading(true);
//     try {
//       const data = await getFile(fileId);
//       setError(null);
//       return data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFile = async (fileId) => {
//     setLoading(true);
//     try {
//       await deleteFile(fileId);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { 
//     loading, 
//     error, 
//     upload, 
//     fetchFile, 
//     removeFile
//   };
// };

// src/hooks/useAttachment.js
import { useState } from 'react';
import {
  uploadFile,
  getFile,
  deleteFile,
  uploadLessonAttachment,
  getLessonAttachments,
  uploadSubmissionAttachment,
  getSubmissionAttachments
} from '../services/attachmentService';

export const useAttachment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (file) => {
    setLoading(true);
    try {
      const data = await uploadFile(file);
      setError(null);
      return data.attachment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadForLesson = async (lessonId, file) => {
    setLoading(true);
    try {
      const data = await uploadLessonAttachment(lessonId, file);
      setError(null);
      return data.attachment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadForSubmission = async (submissionId, file) => {
    setLoading(true);
    try {
      const data = await uploadSubmissionAttachment(submissionId, file);
      setError(null);
      return data.attachment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFile = async (fileId) => {
    setLoading(true);
    try {
      const data = await getFile(fileId);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonAttachments = async (lessonId) => {
    setLoading(true);
    try {
      const data = await getLessonAttachments(lessonId);
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionAttachments = async (submissionId) => {
    setLoading(true);
    try {
      const data = await getSubmissionAttachments(submissionId);
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFile = async (fileId) => {
    setLoading(true);
    try {
      await deleteFile(fileId);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    upload,
    uploadForLesson,
    uploadForSubmission,
    fetchFile,
    fetchLessonAttachments,
    fetchSubmissionAttachments,
    removeFile
  };
};