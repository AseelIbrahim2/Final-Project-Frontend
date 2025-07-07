// // src/services/apiClient.js
// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // In apiClient.js (ensure it matches your storage method)
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access-token") || Cookie.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("access-token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;