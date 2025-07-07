// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   LinearProgress,
//   Button,
//   Chip,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import { PlayCircle } from "@mui/icons-material";

// const CourseCard = ({ course, onContinue }) => {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";

//   return (
//     <Card
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         borderRadius: 3,
//         background: isDark
//           ? alpha("#ffffff", 0.05)
//           : alpha(theme.palette.primary.light, 0.05),
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
//         boxShadow: isDark
//           ? `0 4px 20px rgba(255,255,255,0.05)`
//           : `0 4px 20px rgba(0,0,0,0.05)`,
//         overflow: "hidden",
//         transition: "transform 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-6px)",
//           boxShadow: isDark
//             ? "0 12px 30px rgba(187,134,252,0.3)"
//             : "0 12px 30px rgba(106,27,154,0.2)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="160"
//         image={course.thumbnail}
//         alt={course.name}
//         sx={{ objectFit: "cover" }}
//       />

//       <CardContent sx={{ px: 3, py: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         <Chip
//           label={course.category || "General"}
//           size="small"
//           sx={{
//             mb: 1,
//             fontWeight: "bold",
//             background: "#482880",
//             color: "#fff",
//             width: "fit-content",
//           }}
//         />

//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 600,
//             letterSpacing: 0.3,
//             mb: 0.5,
//             color: isDark ? "#ffffff" : "#1c1c1c",
//           }}
//         >
//           {course.name}
//         </Typography>

//         <Typography
//           variant="caption"
//           sx={{
//             color: isDark ? "#bbbbbb" : "#555555",
//             fontSize: "0.75rem",
//             mb: 1,
//           }}
//         >
//           Instructor: {course.instructor}
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{
//             color: alpha(theme.palette.text.primary, 0.8),
//             fontSize: "0.85rem",
//             lineHeight: 1.5,
//             mb: 2,
//           }}
//         >
//           {course.description}
//         </Typography>

//         {/* Progress */}
//         <Box mb={2}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
//             <Typography
//               variant="body2"
//               sx={{ color: isDark ? "#888888" : "#666666", fontSize: "0.8rem" }}
//             >
//               Progress
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ fontWeight: 600, color: isDark ? "#bb86fc" : "#6a1b9a" }}
//             >
//               {course.progress}%
//             </Typography>
//           </Box>

//           <LinearProgress
//             variant="determinate"
//             value={course.progress}
//             sx={{
//               height: 10,
//               borderRadius: 5,
//               backgroundColor: isDark ? "#2c2c2c" : "#e0e0e0",
//               "& .MuiLinearProgress-bar": {
//                 backgroundImage: isDark
//                   ? "linear-gradient(90deg, #bb86fc, #985eff)"
//                   : "linear-gradient(90deg, #6a1b9a, #ba68c8)",
//               },
//             }}
//           />
//         </Box>

//         {/* Button */}
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={onContinue}
//           startIcon={<PlayCircle />}
//           sx={{
//             mt: "auto",
//             borderRadius: "25px",
//             fontWeight: 600,
//             textTransform: "none",
//             py: 1.2,
//             fontSize: "0.95rem",
//             background: isDark
//               ? "linear-gradient(90deg, #bb86fc, #985eff)"
//               : "linear-gradient(90deg, #667eea, #764ba2)",
//             color: "#fff",
//             boxShadow: "none",
//             "&:hover": {
//               boxShadow: isDark
//                 ? "0 0 18px rgba(187,134,252,0.6)"
//                 : "0 0 18px rgba(106,27,154,0.3)",
//             },
//           }}
//         >
//           Continue Learning
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseCard;


import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Button,
  Chip,
  useTheme,
  alpha,
  Badge
} from "@mui/material";
import { PlayCircle, CheckCircle, Star } from '@mui/icons-material';

const CourseCard = ({ course, onContinue, onEnroll }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Default course images based on category
  const getDefaultThumbnail = (category) => {
    const images = {
      "Programming": "https://source.unsplash.com/random/800x400/?coding",
      "Design": "https://source.unsplash.com/random/800x400/?design",
      "Business": "https://source.unsplash.com/random/800x400/?business",
      "Science": "https://source.unsplash.com/random/800x400/?science",
      "Math": "https://source.unsplash.com/random/800x400/?math",
      "General": "https://source.unsplash.com/random/800x400/?education"
    };
    return images[category] || images["General"];
  };

  const thumbnail = course.thumbnail_url || getDefaultThumbnail(course.category?.name);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        background: isDark
          ? alpha("#ffffff", 0.05)
          : alpha(theme.palette.primary.light, 0.05),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        boxShadow: isDark
          ? `0 4px 20px rgba(255,255,255,0.05)`
          : `0 4px 20px rgba(0,0,0,0.05)`,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: isDark
            ? "0 12px 30px rgba(187,134,252,0.3)"
            : "0 12px 30px rgba(106,27,154,0.2)",
        },
      }}
    >
      <Badge
        badgeContent={course.is_new ? "NEW" : null}
        color="secondary"
        overlap="rectangular"
        sx={{
          width: "100%",
          "& .MuiBadge-badge": {
            top: 15,
            right: 15,
            fontSize: '0.7rem',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: 2
          }
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={thumbnail}
          alt={course.title || course.name}
          sx={{ objectFit: "cover" }}
        />
      </Badge>

      <CardContent sx={{ px: 3, py: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Chip
            label={course.category?.name || "General"}
            size="small"
            sx={{
              fontWeight: "bold",
              background: theme.palette.primary.main,
              color: "#fff",
              width: "fit-content",
            }}
          />
          {course.rating && (
            <Box display="flex" alignItems="center">
              <Star color="warning" fontSize="small" />
              <Typography variant="body2" ml={0.5}>
                {course.rating.toFixed(1)}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.3,
            mb: 0.5,
            color: isDark ? "#ffffff" : "#1c1c1c",
            minHeight: '64px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {course.title || course.name}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: isDark ? "#bbbbbb" : "#555555",
            fontSize: "0.75rem",
            mb: 1,
          }}
        >
          Instructor: {course.instructor?.name || course.instructor || "Unknown"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: alpha(theme.palette.text.primary, 0.8),
            fontSize: "0.85rem",
            lineHeight: 1.5,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {course.description}
        </Typography>

        {/* Progress */}
        {course.progress !== undefined && (
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography
                variant="body2"
                sx={{ color: isDark ? "#888888" : "#666666", fontSize: "0.8rem" }}
              >
                Progress
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: isDark ? "#bb86fc" : "#6a1b9a" }}
              >
                {course.progress}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: isDark ? "#2c2c2c" : "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundImage: isDark
                    ? "linear-gradient(90deg, #bb86fc, #985eff)"
                    : "linear-gradient(90deg, #6a1b9a, #ba68c8)",
                },
              }}
            />
          </Box>
        )}

        {/* Button */}
        {onContinue ? (
          <Button
            variant="contained"
            fullWidth
            onClick={onContinue}
            startIcon={course.progress > 0 ? <PlayCircle /> : <CheckCircle />}
            sx={{
              mt: "auto",
              borderRadius: "25px",
              fontWeight: 600,
              textTransform: "none",
              py: 1.2,
              fontSize: "0.95rem",
              background: isDark
                ? "linear-gradient(90deg, #bb86fc, #985eff)"
                : "linear-gradient(90deg, #667eea, #764ba2)",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                boxShadow: isDark
                  ? "0 0 18px rgba(187,134,252,0.6)"
                  : "0 0 18px rgba(106,27,154,0.3)",
              },
            }}
          >
            {course.progress > 0 ? "Continue Learning" : "Start Learning"}
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={onEnroll}
            startIcon={<CheckCircle />}
            sx={{
              mt: "auto",
              borderRadius: "25px",
              fontWeight: 600,
              textTransform: "none",
              py: 1.2,
              fontSize: "0.95rem",
              background: "linear-gradient(90deg, #4caf50, #2e7d32)",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 0 18px rgba(76, 175, 80, 0.3)",
                background: "linear-gradient(90deg, #43a047, #1b5e20)",
              },
            }}
          >
            Enroll Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;