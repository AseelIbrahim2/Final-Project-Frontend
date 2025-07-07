
import { useState, useEffect } from 'react';
import { 
  getCourses, 
  getCourseDetails, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  getCourseModules,
  createModule,
  updateModule,
  deleteModule
} from '../services/courseService';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getCourses();
      setCourses(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (id) => {
    try {
      const { data } = await getCourseDetails(id);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const fetchCourseModules = async (courseId) => {
    try {
      const { data } = await getCourseModules(courseId);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const addCourse = async (courseData) => {
    setOperationLoading(true);
    try {
      const { data } = await createCourse(courseData);
      setCourses(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const editCourse = async (id, updates) => {
    setOperationLoading(true);
    try {
      const { data } = await updateCourse(id, updates);
      setCourses(prev => prev.map(course => course.id === id ? data : course));
      return data;
    } catch (err) {
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };


const removeCourse = async (id) => {
  setOperationLoading(true);
  try {
    await deleteCourse(id);
    setCourses(prev => prev.filter(course => course.id !== id));
    return true;
  } catch (err) {
    throw err;
  } finally {
    setOperationLoading(false);
  }
};

  const addModule = async (courseId, moduleData) => {
    try {
      const { data } = await createModule(courseId, moduleData);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const editModule = async (moduleId, updates) => {
    try {
      const { data } = await updateModule(moduleId, updates);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const removeModule = async (moduleId) => {
    try {
      await deleteModule(moduleId);
      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { 
    courses, 
    loading,
    operationLoading,
    error, 
    fetchCourses,
    fetchCourseDetails,
    fetchCourseModules,
    addCourse, 
    editCourse, 
    removeCourse,
    addModule,
    editModule,
    removeModule
  };
};