// src/hooks/useQuestion.js
import { useState } from 'react';
import { 
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByQuiz
} from '../services/questionService';

export const useQuestion = (quizId) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addQuestion = async (questionData) => {
    try {
      const newQuestion = await createQuestion(quizId, questionData);
      setQuestions([...questions, newQuestion.question]);
      return newQuestion;
    } catch (err) {
      throw err;
    }
  };

  const fetchQuestion = async (questionId) => {
    try {
      const data = await getQuestion(questionId);
      return data.question;
    } catch (err) {
      throw err;
    }
  };

  const editQuestion = async (questionId, updates) => {
    try {
      const updatedQuestion = await updateQuestion(questionId, updates);
      setQuestions(questions.map(q => q.id === questionId ? updatedQuestion.question : q));
      return updatedQuestion;
    } catch (err) {
      throw err;
    }
  };

  const removeQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (err) {
      throw err;
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await getQuestionsByQuiz(quizId);
      setQuestions(data.questions || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    questions, 
    loading, 
    error, 
    addQuestion, 
    fetchQuestion, 
    editQuestion, 
    removeQuestion,
    fetchQuestions
  };
};