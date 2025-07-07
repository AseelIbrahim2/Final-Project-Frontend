

// import React from "react";
// import {
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   useTheme,
//   CircularProgress,
//   Tooltip
// } from "@mui/material";
// import {
//   BarChart as BarChartIcon,
//   PieChart as PieChartIcon,
//   ShowChart as LineChartIcon,
//   Info
// } from "@mui/icons-material";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   ChartTooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// const DashboardCharts = ({
//   userGrowthData,
//   courseCategoryData,
//   enrollmentTrendsData,
//   theme,
//   loading
// }) => {
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           color: theme.palette.text.primary,
//           font: { size: 12 },
//           padding: 20,
//           usePointStyle: true,
//           pointStyle: "circle",
//         },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: theme.palette.background.paper,
//         titleColor: theme.palette.text.primary,
//         bodyColor: theme.palette.text.secondary,
//         borderColor: theme.palette.divider,
//         borderWidth: 1,
//         padding: 12,
//         boxPadding: 8,
//         callbacks: {
//           label: (ctx) => {
//             let label = ctx.dataset.label || '';
//             if (label) label += ': ';
//             if (ctx.parsed.y !== null) label += ctx.parsed.y;
//             else if (ctx.parsed !== null) label += ctx.parsed;
//             return label;
//           }
//         }
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: theme.palette.mode === "dark" ? '#2a3c6e' : theme.palette.divider,
//           drawBorder: false,
//         },
//         ticks: {
//           color: theme.palette.text.secondary,
//           callback: (value) => Number.isInteger(value) ? value : ''
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//           drawBorder: false,
//         },
//         ticks: {
//           color: theme.palette.text.secondary,
//         },
//       },
//     },
//     elements: {
//       bar: {
//         borderRadius: 6,
//         borderSkipped: false,
//       },
//       point: {
//         radius: 5,
//         hoverRadius: 7,
//         backgroundColor: theme.palette.background.paper,
//         borderWidth: 2,
//       },
//       line: {
//         tension: 0.3,
//         borderWidth: 3,
//       },
//     },
//   };

//   const pieChartOptions = {
//     ...chartOptions,
//     plugins: {
//       ...chartOptions.plugins,
//       tooltip: {
//         ...chartOptions.plugins.tooltip,
//         callbacks: {
//           label: (ctx) => {
//             const label = ctx.label || '';
//             const value = ctx.raw || 0;
//             const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
//             const percent = Math.round((value / total) * 100);
//             return `${label}: ${value} (${percent}%)`;
//           }
//         }
//       }
//     }
//   };

//   const safeUserGrowthData = userGrowthData || {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [{
//       label: 'Users',
//       data: [0, 0, 0, 0, 0, 0],
//       backgroundColor: theme.palette.primary.main,
//     }],
//   };

//   const safeCourseCategoryData = courseCategoryData || {
//     labels: ['Programming', 'Business', 'Design', 'IT', 'Languages'],
//     datasets: [{
//       label: 'Courses by Category',
//       data: [0, 0, 0, 0, 0],
//       backgroundColor: [
//         theme.palette.primary.main,
//         theme.palette.secondary.main,
//         theme.palette.success.main,
//         theme.palette.info.main,
//         theme.palette.warning.main,
//       ],
//     }],
//   };

//   const safeEnrollmentTrendsData = enrollmentTrendsData || {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//     datasets: [{
//       label: 'Enrollments',
//       data: [0, 0, 0, 0],
//       borderColor: theme.palette.warning.main,
//       backgroundColor: theme.palette.warning.main,
//     }],
//   };

//   const ChartContainer = ({ title, description, icon: Icon, children }) => (
//     <Paper
//       elevation={4}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         height: { xs: 360, sm: 400 },
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: theme.palette.background.paper,
//         position: 'relative',
//         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//         '&:hover': {
//           transform: 'scale(1.03)',
//           boxShadow: theme.shadows[6],
//         }
//       }}
//     >
//       <Box display="flex" alignItems="center" mb={2}>
//         <Icon sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 28 }} />
//         <Typography variant="h6" fontWeight={600}>
//           {title}
//         </Typography>
//         {description && (
//           <Tooltip title={description} arrow>
//             <Box sx={{ ml: 1, cursor: 'pointer' }}>
//               <Info color="action" fontSize="small" />
//             </Box>
//           </Tooltip>
//         )}
//       </Box>
//       <Box sx={{ flexGrow: 1, position: "relative", pt: 1 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//             <CircularProgress
//               size={40}
//               thickness={5}
//               sx={{ color: theme.palette.primary.main }}
//             />
//           </Box>
//         ) : children}
//       </Box>
//     </Paper>
//   );

//   return (
//     <Grid container spacing={4} sx={{ mt: 1, mb: 4 }}>
//       <Grid item md={6} xs={12}>
//         <ChartContainer
//           title="User Growth (Last 6 Months)"
//           description="Shows new user registrations per month"
//           icon={BarChartIcon}
//         >
//           <Bar
//             data={safeUserGrowthData}
//             options={chartOptions}
//           />
//         </ChartContainer>
//       </Grid>

//       <Grid item md={6} xs={12}>
//         <ChartContainer
//           title="Course Distribution by Category"
//           description="Shows course distribution across different categories"
//           icon={PieChartIcon}
//         >
//           <Doughnut
//             data={safeCourseCategoryData}
//             options={pieChartOptions}
//           />
//         </ChartContainer>
//       </Grid>

//       <Grid item md={6} xs={12}>
//         <ChartContainer
//           title="Enrollment Trends (Last 4 Weeks)"
//           description="Weekly course enrollment trends"
//           icon={LineChartIcon}
//         >
//           <Line
//             data={safeEnrollmentTrendsData}
//             options={chartOptions}
//           />
//         </ChartContainer>
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardCharts;



import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
  CircularProgress,
  Tooltip
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon,
  Info
} from "@mui/icons-material";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardCharts = ({
  userGrowthData,
  courseCategoryData,
  enrollmentTrendsData,
  theme,
  loading
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme.palette.text.primary,
          font: { size: 12 },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 8,
        callbacks: {
          label: (ctx) => {
            let label = ctx.dataset.label || '';
            if (label) label += ': ';
            if (ctx.parsed.y !== null) label += ctx.parsed.y;
            else if (ctx.parsed !== null) label += ctx.parsed;
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.mode === "dark" ? '#2a3c6e' : theme.palette.divider,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: (value) => Number.isInteger(value) ? value : ''
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
        borderSkipped: false,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
    },
  };

  const pieChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || '';
            const value = ctx.raw || 0;
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percent = Math.round((value / total) * 100);
            return `${label}: ${value} (${percent}%)`;
          }
        }
      }
    }
  };

  const safeUserGrowthData = userGrowthData || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Users',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: theme.palette.primary.dark,
    }],
  };

  const safeCourseCategoryData = courseCategoryData || {
    labels: ['Programming', 'Business', 'Design', 'IT', 'Languages'],
    datasets: [{
      label: 'Courses by Category',
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.info.main,
        theme.palette.warning.main,
      ],
    }],
  };

  const safeEnrollmentTrendsData = enrollmentTrendsData || {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Enrollments',
      data: [0, 0, 0, 0],
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      fill: true,
    }],
  };

  const ChartContainer = ({ title, description, icon: Icon, children }) => (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        height: { xs: 360, sm: 400 },
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: theme.shadows[6],
        }
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Icon sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 28 }} />
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        {description && (
          <Tooltip title={description} arrow>
            <Box sx={{ ml: 1, cursor: 'pointer' }}>
              <Info color="action" fontSize="small" />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative", pt: 1 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress
              size={40}
              thickness={5}
              sx={{ color: theme.palette.primary.main }}
            />
          </Box>
        ) : children}
      </Box>
    </Paper>
  );

  return (
    <Grid container spacing={4} sx={{ mt: 1, mb: 4 }}>
      <Grid item md={6} xs={12}>
        <ChartContainer
          title="User Growth (Last 6 Months)"
          description="Shows new user registrations per month"
          icon={BarChartIcon}
        >
          <Bar
            data={safeUserGrowthData}
            options={chartOptions}
          />
        </ChartContainer>
      </Grid>

      <Grid item md={6} xs={12}>
        <ChartContainer
          title="Course Distribution by Category"
          description="Shows course distribution across different categories"
          icon={PieChartIcon}
        >
          <Doughnut
            data={safeCourseCategoryData}
            options={pieChartOptions}
          />
        </ChartContainer>
      </Grid>

      <Grid item md={6} xs={12}>
        <ChartContainer
          title="Enrollment Trends (Last 4 Weeks)"
          description="Weekly course enrollment trends"
          icon={LineChartIcon}
        >
          <Line
            data={safeEnrollmentTrendsData}
            options={chartOptions}
          />
        </ChartContainer>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
