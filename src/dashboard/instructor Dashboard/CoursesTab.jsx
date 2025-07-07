

// import React from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Grid,
//   IconButton,
//   Typography,
//   useTheme,
//   alpha,
//   Skeleton,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Avatar
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   People as PeopleIcon,
//   MoreVert as MoreIcon,
//   List as ListIcon,
//   ArrowForward as ArrowForwardIcon,
//   CheckCircle,
//   Pending,
//   Cancel
// } from "@mui/icons-material";

// const CoursesTab = ({ 
//   courses, 
//   loading, 
//   error, 
//   handleDialogOpen, 
//   handleMenuClick,
//   onCourseSelect 
// }) => {
//   const theme = useTheme();

//   const getStatusConfig = (status) => {
//     switch (status) {
//       case "approved":
//         return {
//           color: "success",
//           label: "Published",
//           icon: <CheckCircle fontSize="small" />
//         };
//       case "pending":
//         return {
//           color: "warning",
//           label: "Under Review",
//           icon: <Pending fontSize="small" />
//         };
//       case "rejected":
//         return {
//           color: "error",
//           label: "Rejected",
//           icon: <Cancel fontSize="small" />
//         };
//       default:
//         return {
//           color: "default",
//           label: status,
//           icon: null
//         };
//     }
//   };

//   if (loading) {
//     return (
//       <Grid container spacing={3}>
//         {[...Array(3)].map((_, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography color="error">{error}</Typography>
//         <Button onClick={() => window.location.reload()} variant="outlined" sx={{ mt: 2 }}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 4,
//           p: 2,
//           borderRadius: 2,
//           backgroundColor: alpha(theme.palette.primary.main, 0.05),
//           border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" color="text.primary">
//           My Courses ({courses.length})
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => handleDialogOpen("create")}
//           sx={{
//             textTransform: "none",
//             fontWeight: 600,
//             px: 3,
//             py: 1,
//             boxShadow: theme.shadows[3],
//             "&:hover": {
//               boxShadow: theme.shadows[6],
//               transform: "translateY(-1px)"
//             },
//             transition: "all 0.3s ease"
//           }}
//         >
//           New Course
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {courses.map((course) => {
//           const statusConfig = getStatusConfig(course.status);
          
//           return (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: theme.shadows[8]
//                   },
//                   border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//                   borderRadius: 3,
//                   overflow: "hidden"
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Box display="flex" alignItems="center" mb={2}>
//                     <Avatar
//                       src={course.thumbnail_url}
//                       variant="rounded"
//                       sx={{ 
//                         width: 60, 
//                         height: 60, 
//                         mr: 2,
//                         bgcolor: theme.palette.primary.light
//                       }}
//                     >
//                       {course.title.charAt(0)}
//                     </Avatar>
//                     <Box flexGrow={1}>
//                       <Typography
//                         variant="h6"
//                         fontWeight={700}
//                         sx={{
//                           color: "text.primary",
//                           lineHeight: 1.3
//                         }}
//                       >
//                         {course.title}
//                       </Typography>
//                       <Box display="flex" alignItems="center">
//                         <Chip
//                           label={statusConfig.label}
//                           color={statusConfig.color}
//                           size="small"
//                           icon={statusConfig.icon}
//                           sx={{
//                             fontWeight: 600,
//                             borderRadius: 1,
//                             px: 1,
//                             textTransform: "capitalize",
//                             fontSize: "0.75rem"
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <IconButton
//                       size="small"
//                       onClick={(e) => handleMenuClick(e, course)}
//                       sx={{
//                         color: "text.secondary",
//                         "&:hover": {
//                           color: "primary.main",
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1)
//                         }
//                       }}
//                     >
//                       <MoreIcon />
//                     </IconButton>
//                   </Box>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       display: "-webkit-box",
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       mb: 2,
//                       minHeight: 60
//                     }}
//                   >
//                     {course.description || "No description available"}
//                   </Typography>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       mb: 2,
//                       "& > *": {
//                         display: "flex",
//                         alignItems: "center",
//                         color: "text.secondary",
//                         fontSize: "0.875rem"
//                       }
//                     }}
//                   >
//                     <Box>
//                       <PeopleIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
//                       <span>{course.enrollments_count || 0} Enrolled</span>
//                     </Box>
//                     <Box>
//                       <ListIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
//                       <span>{course.modules_count || 0} Modules</span>
//                     </Box>
//                   </Box>

//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       color: "text.disabled",
//                       fontStyle: "italic",
//                       mb: 2
//                     }}
//                   >
//                     Last updated: {new Date(course.updated_at).toLocaleDateString()}
//                   </Typography>

//                   <Paper elevation={0} sx={{ mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Quick Actions:</Typography>
//                     <List dense>
//                       <ListItem 
//                         button 
//                         onClick={() => onCourseSelect(course)}
//                         sx={{ borderRadius: 1 }}
//                       >
//                         <ListItemText primary="Manage Content" />
//                         <ArrowForwardIcon fontSize="small" />
//                       </ListItem>
//                     </List>
//                   </Paper>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       gap: 1,
//                       "& > *": {
//                         flex: 1
//                       }
//                     }}
//                   >
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<EditIcon fontSize="small" />}
//                       onClick={() => {
//                         handleMenuClick(null, course);
//                         handleDialogOpen("edit");
//                       }}
//                       sx={{
//                         textTransform: "none",
//                         fontWeight: 500,
//                         borderColor: alpha(theme.palette.primary.main, 0.5),
//                         "&:hover": {
//                           borderColor: theme.palette.primary.main,
//                           backgroundColor: alpha(theme.palette.primary.main, 0.08)
//                         }
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       startIcon={<PeopleIcon fontSize="small" />}
//                       sx={{
//                         textTransform: "none",
//                         fontWeight: 500,
//                         backgroundColor: alpha(theme.palette.secondary.main, 0.9),
//                         "&:hover": {
//                           backgroundColor: theme.palette.secondary.main
//                         }
//                       }}
//                     >
//                       Students
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default CoursesTab;


import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
  alpha,
  Skeleton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  People as PeopleIcon,
  MoreVert as MoreIcon,
  List as ListIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle,
  Pending,
  Cancel
} from "@mui/icons-material";

const CoursesTab = ({
  courses,
  loading,
  error,
  handleDialogOpen,
  handleMenuClick,
  onCourseSelect
}) => {
  const theme = useTheme();
  const primaryNavy = "#2C3E50"; // كحلي فاتح

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "success",
          label: "Published",
          icon: <CheckCircle fontSize="small" />
        };
      case "pending":
        return {
          color: "warning",
          label: "Under Review",
          icon: <Pending fontSize="small" />
        };
      case "rejected":
        return {
          color: "error",
          label: "Rejected",
          icon: <Cancel fontSize="small" />
        };
      default:
        return {
          color: "default",
          label: status,
          icon: null
        };
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={() => window.location.reload()} variant="outlined" sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          p: 2,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          My Courses ({courses.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen("create")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: theme.shadows[3],
            backgroundColor: primaryNavy,
            "&:hover": {
              backgroundColor: "#1B2A41",
              boxShadow: theme.shadows[6],
              transform: "translateY(-1px)"
            },
            transition: "all 0.3s ease"
          }}
        >
          New Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => {
          const statusConfig = getStatusConfig(course.status);

          return (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[8]
                  },
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  borderRadius: 3,
                  overflow: "hidden"
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={course.thumbnail_url}
                      variant="rounded"
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        bgcolor: primaryNavy,
                        color: "#fff",
                        fontWeight: 600
                      }}
                    >
                      {course.title.charAt(0)}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          color: "text.primary",
                          lineHeight: 1.3
                        }}
                      >
                        {course.title}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Chip
                          label={statusConfig.label}
                          color={statusConfig.color}
                          size="small"
                          icon={statusConfig.icon}
                          sx={{
                            fontWeight: 600,
                            borderRadius: 1,
                            px: 1,
                            textTransform: "capitalize",
                            fontSize: "0.75rem"
                          }}
                        />
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, course)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                          backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        }
                      }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 2,
                      minHeight: 60
                    }}
                  >
                    {course.description || "No description available"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                      "& > *": {
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "0.875rem"
                      }
                    }}
                  >
                    <Box>
                      <PeopleIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                      <span>{course.enrollments_count || 0} Enrolled</span>
                    </Box>
                    <Box>
                      <ListIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                      <span>{course.modules_count || 0} Modules</span>
                    </Box>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      color: "text.disabled",
                      fontStyle: "italic",
                      mb: 2
                    }}
                  >
                    Last updated: {new Date(course.updated_at).toLocaleDateString()}
                  </Typography>

                  <Paper elevation={0} sx={{ mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Quick Actions:
                    </Typography>
                    <List dense>
                      <ListItem button onClick={() => onCourseSelect(course)} sx={{ borderRadius: 1 }}>
                        <ListItemText primary="Manage Content" />
                        <ArrowForwardIcon fontSize="small" />
                      </ListItem>
                    </List>
                  </Paper>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      "& > *": {
                        flex: 1
                      }
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon fontSize="small" />}
                      onClick={() => {
                        handleMenuClick(null, course);
                        handleDialogOpen("edit");
                      }}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        borderColor: alpha(primaryNavy, 0.5),
                        color: primaryNavy,
                        "&:hover": {
                          borderColor: primaryNavy,
                          backgroundColor: alpha(primaryNavy, 0.08)
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PeopleIcon fontSize="small" />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        backgroundColor: primaryNavy,
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#1B2A41"
                        }
                      }}
                    >
                      Students
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CoursesTab;
