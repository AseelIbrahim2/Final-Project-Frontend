

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   Tabs,
//   Tab,
//   Grid,
//   useTheme,
//   CircularProgress,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   School as InstructorIcon,
//   Book as CourseIcon,
//   Login as LoginIcon,
//   BarChart as AnalyticsIcon,
//   HealthAndSafety as HealthIcon,
//   Report as ReportIcon,
// } from "@mui/icons-material";

// import { ChartJSRegister } from "../../utils/chartConfig";
// ChartJSRegister();

// import StatCard from "./components/StatCard";
// import UserManagement from "./components/UserManagement";
// import CourseApprovals from "./components/CourseApprovals";
// import SystemReports from "./components/SystemReports";
// import SystemHealth from "./components/SystemHealth";
// import DashboardCharts from "./components/DashboardCharts";
// import useAdmin from "../../hooks/useAdmin";
// import { formatReportData } from "../../utils/reportUtils";

// const AdminDashboard = () => {
//   const theme = useTheme();
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     pendingCourses: 0,
//     activeInstructors: 0,
//     dailyLogins: 0,
//     totalEnrollments: 0,
//   });
//   const [chartData, setChartData] = useState({
//     userGrowth: null,
//     courseCategory: null,
//     enrollmentTrends: null,
//     courseCompletion: null,
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const {
//     loading,
//     error,
//     getUsers,
//     getPendingCourses,
//     getUserActivityReport,
//     getCoursePopularityReport,
//     exportReport,
//   } = useAdmin();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [users, pendingCourses, userActivity, coursePopularity] =
//           await Promise.all([
//             getUsers(),
//             getPendingCourses(),
//             getUserActivityReport("24h"),
//             getCoursePopularityReport(),
//           ]);

//         const instructors = users.filter(user => user.role === "instructor");
//         const activeUsers = users.filter(user => user.is_active);

//         setStats({
//           totalUsers: activeUsers.length,
//           pendingCourses: pendingCourses.length,
//           activeInstructors: instructors.length,
//           dailyLogins: userActivity?.dailyLogins || 0,
//           totalEnrollments: coursePopularity?.totalEnrollments || 0,
//         });

//         setChartData({
//           userGrowth: formatReportData(userActivity, "user_activity"),
//           courseCategory: formatReportData(coursePopularity, "course_popularity"),
//           enrollmentTrends: {
//             labels: coursePopularity?.labels || [],
//             datasets: [{
//               label: "Enrollments",
//               data: coursePopularity?.enrollments || [],
//               fill: false,
//               borderColor: theme.palette.warning.main,
//               backgroundColor: theme.palette.warning.main,
//               tension: 0.3,
//             }],
//           },
//           courseCompletion: {
//             labels: ["Completed", "In Progress", "Not Started"],
//             datasets: [{
//               label: "Course Completion Status",
//               data: [
//                 coursePopularity?.completed || 0,
//                 coursePopularity?.inProgress || 0,
//                 coursePopularity?.notStarted || 0,
//               ],
//               backgroundColor: [
//                 theme.palette.success.main,
//                 theme.palette.info.main,
//                 theme.palette.error.main,
//               ],
//             }],
//           },
//         });
//       } catch (err) {
//         setSnackbar({
//           open: true,
//           message: `Failed to fetch dashboard data: ${err.message}`,
//           severity: "error",
//         });
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleExportReport = async (reportType, format = "csv") => {
//     try {
//       const data = await exportReport(reportType, format);
//       const fileName = `${reportType}_report.${format}`;
//       const blob = new Blob([data], { type: `text/${format}` });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setSnackbar({
//         open: true,
//         message: `Report exported successfully as ${fileName}`,
//         severity: "success",
//       });
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: `Failed to export report: ${err.message}`,
//         severity: "error",
//       });
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const tabItems = [
//     { label: "Dashboard Analytics", icon: <AnalyticsIcon /> },
//     { label: "User Management", icon: <PeopleIcon /> },
//     { label: "Course Approvals", icon: <CourseIcon /> },
//     { label: "System Health", icon: <HealthIcon /> },
//     { label: "System Reports", icon: <ReportIcon /> },
//   ];

//   return (
//     <Container
//       maxWidth="xl"
//       sx={{
//         py: 4,
//         backgroundColor: theme.palette.background.paper,
//         borderRadius: 4,
//         boxShadow: theme.shadows[1],
//       }}
//     >
//       <Box mb={4}>
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{
//             fontWeight: 700,
//             fontSize: "2.25rem",
//             color: theme.palette.primary.main,
//             textShadow: `0 1px 3px ${theme.palette.primary.dark}44`,
//             borderBottom: `3px solid ${theme.palette.primary.main}`,
//             pb: 1,
//             display: "inline-block",
//           }}
//         >
//           Admin Dashboard
//         </Typography>

//         <Grid container spacing={3} mb={4}>
//           {[
//             { title: "Total Users", value: stats.totalUsers, icon: PeopleIcon, color: "primary" },
//             { title: "Pending Courses", value: stats.pendingCourses, icon: CourseIcon, color: "secondary" },
//             { title: "Active Instructors", value: stats.activeInstructors, icon: InstructorIcon, color: "success" },
//             { title: "Daily Logins", value: stats.dailyLogins, icon: LoginIcon, color: "info" },
//           ].map((card, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <StatCard
//                 title={card.title}
//                 value={card.value}
//                 icon={card.icon}
//                 color={card.color}
//                 loading={loading}
//                 sx={{
//                   transition: "0.3s",
//                   boxShadow: 3,
//                   borderRadius: 3,
//                   '&:hover': {
//                     transform: 'translateY(-3px)',
//                     boxShadow: 6,
//                   },
//                 }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       <Box
//         sx={{
//           borderBottom: 1,
//           borderColor: "divider",
//           mb: 3,
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           backgroundColor: theme.palette.background.default,
//           boxShadow: theme.shadows[1],
//         }}
//       >
//         <Tabs
//           value={selectedTab}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           aria-label="admin dashboard tabs"
//           sx={{
//             '& .MuiTabs-indicator': {
//               backgroundColor: theme.palette.primary.main,
//               height: 4,
//               borderRadius: 2,
//             },
//             '& .MuiTab-root': {
//               color: theme.palette.text.secondary,
//               fontWeight: 500,
//             },
//             '& .Mui-selected': {
//               color: theme.palette.primary.main,
//               fontWeight: 600,
//               backgroundColor: theme.palette.action.hover,
//               borderRadius: 2,
//             },
//           }}
//         >
//           {tabItems.map((item, index) => (
//             <Tab
//               key={index}
//               label={item.label}
//               icon={item.icon}
//               iconPosition="start"
//               sx={{
//                 minHeight: 60,
//                 fontSize: "0.875rem",
//                 textTransform: "none",
//                 letterSpacing: 0.5,
//               }}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       <Box sx={{ pt: 2 }}>
//         {loading && selectedTab === 0 ? (
//           <Box display="flex" justifyContent="center" py={4}>
//             <CircularProgress size={60} color="primary" />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         ) : (
//           <>
//             {selectedTab === 0 && (
//               <DashboardCharts
//                 userGrowthData={chartData.userGrowth}
//                 courseCategoryData={chartData.courseCategory}
//                 enrollmentTrendsData={chartData.enrollmentTrends}
//                 courseCompletionData={chartData.courseCompletion}
//                 theme={theme}
//               />
//             )}
//             {selectedTab === 1 && <UserManagement />}
//             {selectedTab === 2 && <CourseApprovals />}
//             {selectedTab === 3 && <SystemHealth />}
//             {selectedTab === 4 && (
//               <SystemReports onExport={handleExportReport} loading={loading} />
//             )}
//           </>
//         )}
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{
//             width: "100%",
//             boxShadow: theme.shadows[6],
//             alignItems: "center",
//             fontWeight: 500,
//             fontSize: "0.95rem",
//           }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Grid,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  People as PeopleIcon,
  School as InstructorIcon,
  Book as CourseIcon,
  Login as LoginIcon,
  BarChart as AnalyticsIcon,
  HealthAndSafety as HealthIcon,
  Report as ReportIcon,
} from "@mui/icons-material";

import { ChartJSRegister } from "../../utils/chartConfig";
ChartJSRegister();

import StatCard from "./components/StatCard";
import UserManagement from "./components/UserManagement";
import CourseApprovals from "./components/CourseApprovals";
import SystemReports from "./components/SystemReports";
import SystemHealth from "./components/SystemHealth";
import DashboardCharts from "./components/DashboardCharts";
import useAdmin from "../../hooks/useAdmin";
import { formatReportData } from "../../utils/reportUtils";

const AdminDashboard = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingCourses: 0,
    activeInstructors: 0,
    dailyLogins: 0,
    totalEnrollments: 0,
  });
  const [chartData, setChartData] = useState({
    userGrowth: null,
    courseCategory: null,
    enrollmentTrends: null,
    courseCompletion: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    loading,
    error,
    getUsers,
    getPendingCourses,
    getUserActivityReport,
    getCoursePopularityReport,
    exportReport,
  } = useAdmin();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [users, pendingCourses, userActivity, coursePopularity] =
          await Promise.all([
            getUsers(),
            getPendingCourses(),
            getUserActivityReport("24h"),
            getCoursePopularityReport(),
          ]);

        const instructors = users.filter(user => user.role === "instructor");
        const activeUsers = users.filter(user => user.is_active);

        setStats({
          totalUsers: activeUsers.length,
          pendingCourses: pendingCourses.length,
          activeInstructors: instructors.length,
          dailyLogins: userActivity?.dailyLogins || 0,
          totalEnrollments: coursePopularity?.totalEnrollments || 0,
        });

        setChartData({
          userGrowth: formatReportData(userActivity, "user_activity"),
          courseCategory: formatReportData(coursePopularity, "course_popularity"),
          enrollmentTrends: {
            labels: coursePopularity?.labels || [],
            datasets: [{
              label: "Enrollments",
              data: coursePopularity?.enrollments || [],
              fill: false,
              borderColor: theme.palette.warning.main,
              backgroundColor: theme.palette.warning.main,
              tension: 0.3,
            }],
          },
          courseCompletion: {
            labels: ["Completed", "In Progress", "Not Started"],
            datasets: [{
              label: "Course Completion Status",
              data: [
                coursePopularity?.completed || 0,
                coursePopularity?.inProgress || 0,
                coursePopularity?.notStarted || 0,
              ],
              backgroundColor: [
                theme.palette.success.main,
                theme.palette.info.main,
                theme.palette.error.main,
              ],
            }],
          },
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: `Failed to fetch dashboard data: ${err.message}`,
          severity: "error",
        });
      }
    };

    fetchDashboardData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleExportReport = async (reportType, format = "csv") => {
    try {
      const data = await exportReport(reportType, format);
      const fileName = `${reportType}_report.${format}`;
      const blob = new Blob([data], { type: `text/${format}` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSnackbar({
        open: true,
        message: `Report exported successfully as ${fileName}`,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to export report: ${err.message}`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const tabItems = [
    { label: "Dashboard Analytics", icon: <AnalyticsIcon /> },
    { label: "User Management", icon: <PeopleIcon /> },
    { label: "Course Approvals", icon: <CourseIcon /> },
    { label: "System Health", icon: <HealthIcon /> },
    { label: "System Reports", icon: <ReportIcon /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ pt: 6, pb: 6 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom={false}
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            textShadow: `0 2px 4px ${theme.palette.primary.dark}33`
          }}
        >
          Admin Dashboard
        </Typography>

        {/* Stat Cards */}
        <Grid container spacing={3} mt={1} mb={4}>
          {[
            { title: "Total Users", value: stats.totalUsers, icon: PeopleIcon, color: "primary" },
            { title: "Pending Courses", value: stats.pendingCourses, icon: CourseIcon, color: "secondary" },
            { title: "Active Instructors", value: stats.activeInstructors, icon: InstructorIcon, color: "success" },
            { title: "Daily Logins", value: stats.dailyLogins, icon: LoginIcon, color: "info" },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                loading={loading}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{
        mb: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: theme.shadows[1],
        px: 2,
        pt: 2
      }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="admin dashboard tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
              borderRadius: 2
            }
          }}
        >
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              icon={item.icon}
              iconPosition="start"
              sx={{
                minHeight: 56,
                px: 2,
                mx: 0.5,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                },
                fontSize: '0.9rem',
                textTransform: 'none'
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ pt: 2 }}>
        {loading && selectedTab === 0 ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            {selectedTab === 0 && (
              <DashboardCharts
                userGrowthData={chartData.userGrowth}
                courseCategoryData={chartData.courseCategory}
                enrollmentTrendsData={chartData.enrollmentTrends}
                courseCompletionData={chartData.courseCompletion}
                theme={theme}
              />
            )}
            {selectedTab === 1 && <UserManagement />}
            {selectedTab === 2 && <CourseApprovals />}
            {selectedTab === 3 && <SystemHealth />}
            {selectedTab === 4 && (
              <SystemReports onExport={handleExportReport} loading={loading} />
            )}
          </>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ 
            width: "100%",
            boxShadow: theme.shadows[4],
            alignItems: 'center'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
