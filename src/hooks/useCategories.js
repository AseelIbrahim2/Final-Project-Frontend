// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.categories || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name) => {
    try {
      const newCategory = await createCategory(name);
      setCategories([...categories, newCategory.category]);
      return newCategory;
    } catch (err) {
      throw err;
    }
  };

  const editCategory = async (id, name) => {
    try {
      const updatedCategory = await updateCategory(id, name);
      setCategories(categories.map(cat => cat.id === id ? updatedCategory.category : cat));
      return updatedCategory;
    } catch (err) {
      throw err;
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, addCategory, editCategory, removeCategory };
};