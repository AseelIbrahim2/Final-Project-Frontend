// // src/hooks/useQuiz.js
// import { useState } from 'react';
// import { 
//   createQuiz,
//   getQuiz,
//   updateQuiz,
//   deleteQuiz,
//   getQuizzesByLesson,
//   submitQuiz,
//   getQuizSubmissions,
//   getQuizSubmission,
//   getMyQuizSubmission
// } from '../services/quizService';

// export const useQuiz = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const addQuiz = async (quizData) => {
//     try {
//       const newQuiz = await createQuiz(quizData);
//       setQuizzes([...quizzes, newQuiz.quiz]);
//       return newQuiz;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchQuiz = async (quizId) => {
//     try {
//       const data = await getQuiz(quizId);
//       return data.quiz;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const editQuiz = async (quizId, updates) => {
//     try {
//       const updatedQuiz = await updateQuiz(quizId, updates);
//       setQuizzes(quizzes.map(q => q.id === quizId ? updatedQuiz.quiz : q));
//       return updatedQuiz;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const removeQuiz = async (quizId) => {
//     try {
//       await deleteQuiz(quizId);
//       setQuizzes(quizzes.filter(q => q.id !== quizId));
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchQuizzesByLesson = async (lessonId) => {
//     setLoading(true);
//     try {
//       const data = await getQuizzesByLesson(lessonId);
//       setQuizzes(data.quizzes || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submit = async (quizId, answers) => {
//     try {
//       const data = await submitQuiz(quizId, answers);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchSubmissions = async (quizId) => {
//     try {
//       const data = await getQuizSubmissions(quizId);
//       return data.submissions;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchSubmission = async (quizId, submissionId) => {
//     try {
//       const data = await getQuizSubmission(quizId, submissionId);
//       return data.submission;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchMySubmission = async (quizId) => {
//     try {
//       const data = await getMyQuizSubmission(quizId);
//       return data.submission;
//     } catch (err) {
//       throw err;
//     }
//   };

//   return { 
//     quizzes, 
//     loading, 
//     error, 
//     addQuiz, 
//     fetchQuiz, 
//     editQuiz, 
//     removeQuiz,
//     fetchQuizzesByLesson,
//     submit,
//     fetchSubmissions,
//     fetchSubmission,
//     fetchMySubmission
//   };
// };



// src/hooks/useQuiz.js
import { useState } from 'react';
import { 
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizzesByLesson,
  submitQuiz,
  getQuizSubmissions,
  getQuizSubmission,
  getMyQuizSubmission
} from '../services/quizService';

export const useQuiz = (lessonId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addQuiz = async (quizData) => {
    try {
      setLoading(true);
      const newQuiz = await createQuiz(quizData);
      setQuizzes(prev => [...prev, newQuiz.quiz]);
      return newQuiz;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuiz = async (quizId) => {
    try {
      setLoading(true);
      const data = await getQuiz(quizId);
      return data.quiz;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editQuiz = async (quizId, updates) => {
    try {
      setLoading(true);
      const updatedQuiz = await updateQuiz(quizId, updates);
      setQuizzes(prev => prev.map(q => 
        q.id === quizId ? updatedQuiz.quiz : q
      ));
      return updatedQuiz;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeQuiz = async (quizId) => {
    try {
      setLoading(true);
      await deleteQuiz(quizId);
      setQuizzes(prev => prev.filter(q => q.id !== quizId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzesByLesson = async () => {
    try {
      setLoading(true);
      const data = await getQuizzesByLesson(lessonId);
      setQuizzes(data.quizzes || []);
      setError(null);
      return data.quizzes;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submit = async (quizId, answers) => {
    try {
      setLoading(true);
      const data = await submitQuiz(quizId, answers);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (quizId) => {
    try {
      setLoading(true);
      const data = await getQuizSubmissions(quizId);
      return data.submissions;
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
      const data = await getQuizSubmission(submissionId);
      return data.submission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMySubmission = async (quizId) => {
    try {
      setLoading(true);
      const data = await getMyQuizSubmission(quizId);
      return data.submission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    quizzes, 
    loading, 
    error, 
    addQuiz, 
    fetchQuiz, 
    editQuiz, 
    removeQuiz,
    fetchQuizzesByLesson,
    submit,
    fetchSubmissions,
    fetchSubmission,
    fetchMySubmission
  };
};