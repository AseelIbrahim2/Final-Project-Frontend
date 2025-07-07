// src/services/questionService.js
import apiClient from '../api/apiClient';

export const createQuestion = async (quizId, questionData) => {
  try {
    const response = await apiClient.post(`/questions/${quizId}`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestion = async (questionId) => {
  try {
    const response = await apiClient.get(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (questionId, updates) => {
  try {
    const response = await apiClient.put(`/questions/${questionId}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await apiClient.delete(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionsByQuiz = async (quizId) => {
  try {
    const response = await apiClient.get(`/questions/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};