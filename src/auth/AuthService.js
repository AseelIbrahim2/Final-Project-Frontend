// src/auth/AuthService.js
import { register, login, logout, getMe, googleAuth } from '../api/authAPI';

class AuthService {
  static async register(userData) {
    const response = await register(userData);
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    return response;
  }

  static async login(credentials) {
    const response = await login(credentials);
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    return response;
  }

  static async logout() {
    const response = await logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response;
  }

  static async getCurrentUser() {
    // تحقق أولاً من وجود بيانات المستخدم في localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }

    // إذا لم تكن موجودة، جلبها من الخادم
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await getMe();
      if (response.success && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static initiateGoogleAuth() {
    googleAuth();
  }
}

export default AuthService;