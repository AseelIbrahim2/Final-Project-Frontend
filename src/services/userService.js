// import apiClient from '../api/apiClient';
// import { createResponse } from '../utils/helpers';

// const userService = {
//   // Get user profile
//   getProfile: async () => {
//     try {
//       const response = await apiClient.get('/user/profile-jwt');
//       return createResponse(true, 'Profile retrieved successfully', response.data);
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to get profile');
//     }
//   },

//   // Update user profile
//   updateProfile: async (profileData) => {
//     try {
//       const response = await apiClient.put('/user/profile-jwt', profileData);
//       return createResponse(true, 'Profile updated successfully', response.data);
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to update profile');
//     }
//   },

//   // Delete user account
//   deleteAccount: async () => {
//     try {
//       await apiClient.delete('/user/account');
//       return createResponse(true, 'Account deleted successfully');
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to delete account');
//     }
//   },

//   // Change password
//   changePassword: async (currentPassword, newPassword, confirmPassword) => {
//     try {
//       const response = await apiClient.put('/user/change-password', {
//         currentPassword,
//         newPassword,
//         confirmPassword,
//       });
//       return createResponse(true, 'Password changed successfully', response.data);
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to change password');
//     }
//   },

//   // Link OAuth provider
//   linkProvider: async (providerData) => {
//     try {
//       const response = await apiClient.post('/user/link-provider', providerData);
//       return createResponse(true, 'Provider linked successfully', response.data);
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to link provider');
//     }
//   },

//   // Get all users (admin only)
//   getAllUsers: async () => {
//     try {
//       const response = await apiClient.get('/user/all');
//       return createResponse(true, 'Users retrieved successfully', response.data);
//     } catch (error) {
//       return createResponse(false, error.message || 'Failed to get users');
//     }
//   },
// };

// export default userService;



import apiClient from '../api/apiClient';
import { createResponse } from '../utils/helpers';

const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      return createResponse(true, 'Profile retrieved successfully', response.data);
    } catch (error) {
      return createResponse(false, error.message || 'Failed to get profile');
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/users/profile', profileData);
      return createResponse(true, 'Profile updated successfully', response.data);
    } catch (error) {
      return createResponse(false, error.message || 'Failed to update profile');
    }
  },

  deleteAccount: async () => {
    try {
      await apiClient.delete('/api/users/account');
      return createResponse(true, 'Account deleted successfully');
    } catch (error) {
      return createResponse(false, error.message || 'Failed to delete account');
    }
  },

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await apiClient.put('/api/users/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return createResponse(true, 'Password changed successfully', response.data);
    } catch (error) {
      return createResponse(false, error.message || 'Failed to change password');
    }
  },

  linkProvider: async (providerData) => {
    try {
      const response = await apiClient.post('/api/users/link-provider', providerData);
      return createResponse(true, 'Provider linked successfully', response.data);
    } catch (error) {
      return createResponse(false, error.message || 'Failed to link provider');
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/api/admin/users');
      return createResponse(true, 'Users retrieved successfully', response.data);
    } catch (error) {
      return createResponse(false, error.message || 'Failed to get users');
    }
  },
};

export default userService;