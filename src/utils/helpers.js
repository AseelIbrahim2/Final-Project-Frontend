// src/utils/helpers.js

/**
 * Creates a standardized response object for API calls
 * @param {boolean} success - Indicates if the operation was successful
 * @param {string} message - Response message
 * @param {object|null} data - Response data (optional)
 * @returns {object} Standardized response object
 */
export const createResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data
  };
};

/**
 * Handles API errors and returns a standardized error response
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default message if error doesn't have one
 * @returns {object} Standardized error response
 */
export const handleApiError = (error, defaultMessage = 'Something went wrong') => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  return createResponse(false, message);
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  // Add more validation rules as needed
  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Checks if an object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} True if object is empty
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Formats date to a readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};