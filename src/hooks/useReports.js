// import { useState } from 'react';
// import adminService from '../services/adminService';

// const useReports = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generateReport = async (reportType, options = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       let data;
//       switch (reportType) {
//         case 'user_activity':
//           data = await adminService.fetchUserActivityReport(options.timeRange);
//           break;
//         case 'course_popularity':
//           data = await adminService.fetchCoursePopularityReport();
//           break;
//         case 'system_performance':
//           data = await adminService.fetchSystemPerformanceReport();
//           break;
//         default:
//           throw new Error('Invalid report type');
//       }
//       return data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportReport = async (reportType, format) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await adminService.exportReport(reportType, format);
//       return data;
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
//     generateReport,
//     exportReport,
//   };
// };

// export default useReports;



import { useState } from 'react';
import adminService from '../services/adminService';

const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (reportType, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      switch (reportType) {
        case 'user_activity':
          return await adminService.getUserActivityReport(options.timeRange);
        case 'course_popularity':
          return await adminService.getCoursePopularityReport();
        case 'system_performance':
          return await adminService.getSystemPerformanceReport();
        default:
          throw new Error('Invalid report type');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (reportType, format = 'xlsx') => {
    setLoading(true);
    setError(null);
    try {
      return await adminService.exportReport(reportType, format);
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
    generateReport,
    exportReport,
  };
};

export default useReports;