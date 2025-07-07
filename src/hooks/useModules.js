

import { useState, useEffect } from 'react';
import { 
  getModulesByCourse, 
  createModule, 
  updateModule, 
  deleteModule 
} from '../services/moduleService';

export const useModules = (courseId) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModules = async (courseId) => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const data = await getModulesByCourse(courseId);
      setModules(data.data || []);
      setError(null);
      return data.data || [];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addModule = async (courseId, moduleData) => {
    try {
      const { data } = await createModule(courseId, moduleData);
      setModules(prev => [...prev, data.module]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const editModule = async (courseId, moduleId, updates) => {
    try {
      const { data } = await updateModule(courseId, moduleId, updates);
      setModules(prev => 
        prev.map(m => m.id === moduleId ? data.module : m)
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  const removeModule = async (courseId, moduleId) => {
    try {
      await deleteModule(courseId, moduleId);
      setModules(prev => prev.filter(m => m.id !== moduleId));
      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchModules(courseId);
    }
  }, [courseId]);

  return { 
    modules, 
    loading, 
    error, 
    fetchModules, 
    addModule, 
    editModule, 
    removeModule 
  };
};