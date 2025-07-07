// // src/hooks/useSubmission.js
// import { useState } from 'react';
// import { 
//   submitAssignment,
//   getSubmission,
//   getSubmissionsByAssignment,
//   gradeSubmission,
//   deleteSubmission
// } from '../services/submissionService';

// export const useSubmission = (assignmentId) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const submit = async (submissionUrl) => {
//     try {
//       const newSubmission = await submitAssignment(assignmentId, submissionUrl);
//       setSubmissions([...submissions, newSubmission.submission]);
//       return newSubmission;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchSubmission = async (submissionId) => {
//     try {
//       const data = await getSubmission(submissionId);
//       return data.submission;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchSubmissions = async () => {
//     setLoading(true);
//     try {
//       const data = await getSubmissionsByAssignment(assignmentId);
//       setSubmissions(data.data || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const grade = async (submissionId, grade, feedback) => {
//     try {
//       const gradedSubmission = await gradeSubmission(submissionId, grade, feedback);
//       setSubmissions(submissions.map(s => s.id === submissionId ? gradedSubmission.submission : s));
//       return gradedSubmission;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const removeSubmission = async (submissionId) => {
//     try {
//       await deleteSubmission(submissionId);
//       setSubmissions(submissions.filter(s => s.id !== submissionId));
//     } catch (err) {
//       throw err;
//     }
//   };

//   return { 
//     submissions, 
//     loading, 
//     error, 
//     submit, 
//     fetchSubmission, 
//     fetchSubmissions,
//     grade, 
//     removeSubmission
//   };
// };
// src/hooks/useSubmission.js
import { useState } from 'react';
import {
  submitAssignment,
  getSubmission,
  getSubmissionsByAssignment,
  gradeSubmission,
  deleteSubmission
} from '../services/submissionService';

export const useSubmission = (assignmentId) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (submissionData) => {
    try {
      setLoading(true);
      const newSubmission = await submitAssignment(assignmentId, submissionData);
      setSubmissions(prev => [...prev, newSubmission.submission]);
      return newSubmission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmission = async (submissionId) => {
    try {
      setLoading(true);
      const data = await getSubmission(submissionId);
      return data.submission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getSubmissionsByAssignment(assignmentId);
      setSubmissions(data.data || []);
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const grade = async (submissionId, grade, feedback) => {
    try {
      setLoading(true);
      const gradedSubmission = await gradeSubmission(submissionId, grade, feedback);
      setSubmissions(prev => prev.map(s => 
        s.id === submissionId ? gradedSubmission.submission : s
      ));
      return gradedSubmission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeSubmission = async (submissionId) => {
    try {
      setLoading(true);
      await deleteSubmission(submissionId);
      setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submissions,
    loading,
    error,
    submit,
    fetchSubmission,
    fetchSubmissions,
    grade,
    removeSubmission
  };
};