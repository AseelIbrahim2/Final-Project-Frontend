// import { useState } from 'react';
// import userService from '../services/userService';

// const useUser = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getProfile = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.getProfile();
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async (profileData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.updateProfile(profileData);
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteAccount = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.deleteAccount();
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changePassword = async (currentPassword, newPassword, confirmPassword) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.changePassword(
//         currentPassword,
//         newPassword,
//         confirmPassword
//       );
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const linkProvider = async (providerData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.linkProvider(providerData);
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getAllUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await userService.getAllUsers();
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     getProfile,
//     updateProfile,
//     deleteAccount,
//     changePassword,
//     linkProvider,
//     getAllUsers,
//   };
// };

// export default useUser;


import { useState } from 'react';
import userService from '../services/userService';

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getProfile();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.updateProfile(profileData);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.deleteAccount();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.changePassword(currentPassword, newPassword, confirmPassword);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const linkProvider = async (providerData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.linkProvider(providerData);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAllUsers();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getProfile,
    updateProfile,
    deleteAccount,
    changePassword,
    linkProvider,
    getAllUsers,
  };
};

export default useUser;