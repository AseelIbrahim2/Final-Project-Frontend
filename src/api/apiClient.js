

// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


apiClient.upload = async (url, formData, config = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'multipart/form-data',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config.headers,
  };

  try {
    const response = await axios.post(
      `${apiClient.defaults.baseURL}${url}`,
      formData,
      {
        ...config,
        headers,
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
};
export default apiClient;
