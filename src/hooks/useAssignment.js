// // src/hooks/useAssignment.js
// import { useState } from 'react';
// import { 
//   createAssignment,
//   getAssignment,
//   getAssignmentsByLesson,
//   updateAssignment,
//   deleteAssignment
// } from '../services/assignmentService';

// export const useAssignment = (lessonId) => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const addAssignment = async (assignmentData) => {
//     try {
//       const newAssignment = await createAssignment(assignmentData);
//       setAssignments([...assignments, newAssignment.assignment]);
//       return newAssignment;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchAssignment = async (assignmentId) => {
//     try {
//       const data = await getAssignment(assignmentId);
//       return data.assignment;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const fetchAssignments = async () => {
//     setLoading(true);
//     try {
//       const data = await getAssignmentsByLesson(lessonId);
//       setAssignments(data.data || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const editAssignment = async (assignmentId, updates) => {
//     try {
//       const updatedAssignment = await updateAssignment(assignmentId, updates);
//       setAssignments(assignments.map(a => a.id === assignmentId ? updatedAssignment.assignment : a));
//       return updatedAssignment;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const removeAssignment = async (assignmentId) => {
//     try {
//       await deleteAssignment(assignmentId);
//       setAssignments(assignments.filter(a => a.id !== assignmentId));
//     } catch (err) {
//       throw err;
//     }
//   };

//   return { 
//     assignments, 
//     loading, 
//     error, 
//     addAssignment, 
//     fetchAssignment, 
//     fetchAssignments,
//     editAssignment, 
//     removeAssignment
//   };
// };

// src/hooks/useAssignment.js
import { useState } from 'react';
import { 
  createAssignment,
  getAssignment,
  getAssignmentsByLesson,
  updateAssignment,
  deleteAssignment
} from '../services/assignmentService';

export const useAssignment = (lessonId) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addAssignment = async (assignmentData) => {
    try {
      setLoading(true);
      const newAssignment = await createAssignment(assignmentData);
      setAssignments(prev => [...prev, newAssignment.assignment]);
      return newAssignment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignment = async (assignmentId) => {
    try {
      setLoading(true);
      const data = await getAssignment(assignmentId);
      return data.assignment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await getAssignmentsByLesson(lessonId);
      setAssignments(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editAssignment = async (assignmentId, updates) => {
    try {
      setLoading(true);
      const updatedAssignment = await updateAssignment(assignmentId, updates);
      setAssignments(prev => 
        prev.map(a => a.id === assignmentId ? updatedAssignment.assignment : a)
      );
      return updatedAssignment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeAssignment = async (assignmentId) => {
    try {
      setLoading(true);
      await deleteAssignment(assignmentId);
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    assignments, 
    loading, 
    error, 
    addAssignment, 
    fetchAssignment, 
    fetchAssignments,
    editAssignment, 
    removeAssignment
  };
};