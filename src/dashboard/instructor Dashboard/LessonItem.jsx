

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   useTheme,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   Chip,
//   Tooltip,
//   Collapse
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   MoreVert as MoreIcon,
//   VideoLibrary as VideoIcon,
//   Article as ArticleIcon,
//   Quiz as QuizIcon,
//   PlayCircle as PlayIcon,
//   PictureAsPdf as PdfIcon,
//   ExpandMore as ExpandMoreIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const LessonItem = ({ lesson, onEdit, onDelete, icon }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [expanded, setExpanded] = useState(false);

//   const handleMenuClick = (event) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     onEdit(lesson);
//     handleMenuClose();
//   };

//   const handleDelete = () => {
//     onDelete(lesson.id);
//     handleMenuClose();
//   };

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const handleLessonClick = () => {
//   if (lesson.content_type === 'quiz') {
//     navigate(`/quiz/${lesson.id}`);
//   } else {
//     toggleExpand(); // Toggle expand for media content
//   }
// };

//   const getContentIcon = () => {
//     switch (lesson.content_type) {
//       case 'video':
//         return <VideoIcon fontSize="small" color="primary" />;
//       case 'pdf':
//         return <PdfIcon fontSize="small" color="error" />;
//       case 'quiz':
//         return <QuizIcon fontSize="small" color="secondary" />;
//       default:
//         return <ArticleIcon fontSize="small" />;
//     }
//   };

//   const getDurationText = (duration) => {
//     if (!duration) return 'N/A';
//     if (duration < 60) return `${duration} min`;
//     const hours = Math.floor(duration / 60);
//     const minutes = duration % 60;
//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <Box mb={1}>
//       <Paper 
//         elevation={2} 
//         sx={{ 
//           mb: 1,
//           p: 2,
//           '&:hover': {
//             bgcolor: theme.palette.action.hover,
//             cursor: 'pointer'
//           }
//         }}
//         onClick={handleLessonClick}
//       >
//         <Box display="flex" alignItems="center">
//           <Box mr={2}>
//             {icon || getContentIcon()}
//           </Box>
//           <Box flexGrow={1}>
//             <Typography variant="subtitle1" fontWeight="bold">
//               {lesson.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {lesson.description || 'No description'}
//             </Typography>
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Chip 
//               label={`Order: ${lesson.order}`} 
//               size="small" 
//               variant="outlined"
//             />
//             <Chip 
//               label={getDurationText(lesson.duration)} 
//               size="small" 
//               variant="outlined"
//             />
//             {lesson.content_type === 'video' && lesson.content_url && (
//               <Tooltip title="Play content">
//                 <PlayIcon color="primary" />
//               </Tooltip>
//             )}
//             <IconButton onClick={(e) => {
//               e.stopPropagation();
//               handleMenuClick(e);
//             }}>
//               <MoreIcon />
//             </IconButton>
//           </Box>
//         </Box>
        
//         <Collapse in={expanded}>
//   <Box mt={2}>
//     {lesson.content_type === 'video' && lesson.content_url && (
//       <video controls width="100%" src={lesson.content_url} />
//     )}
//     {lesson.content_type === 'pdf' && lesson.content_url && (
//       <iframe 
//         src={lesson.content_url} 
//         width="100%" 
//         height="500px"
//         title={lesson.title}
//         style={{ border: 'none' }}
//       />
//     )}
//   </Box>
// </Collapse>
//       </Paper>
      
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <MenuItem onClick={handleEdit}>
//           <ListItemIcon>
//             <EditIcon fontSize="small" />
//           </ListItemIcon>
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleDelete}>
//           <ListItemIcon>
//             <DeleteIcon fontSize="small" color="error" />
//           </ListItemIcon>
//           <Typography color="error">Delete</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default LessonItem;



import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Tooltip,
  Collapse
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  PlayCircle as PlayIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LessonItem = ({ lesson, onEdit, onDelete, icon }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(lesson);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(lesson.id);
    handleMenuClose();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleLessonClick = () => {
    if (lesson.content_type === 'quiz') {
      navigate(`/quiz/${lesson.id}`);
    } else {
      toggleExpand();
    }
  };

  const getContentIcon = () => {
    switch (lesson.content_type) {
      case 'video': return <VideoIcon fontSize="small" color="primary" />;
      case 'pdf': return <PdfIcon fontSize="small" color="error" />;
      case 'quiz': return <QuizIcon fontSize="small" color="secondary" />;
      default: return <ArticleIcon fontSize="small" />;
    }
  };

  const getDurationText = (duration) => {
    if (!duration) return 'N/A';
    if (duration < 60) return `${duration} min`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box mb={1}>
      <Paper 
        elevation={2} 
        sx={{ 
          mb: 1,
          p: 2,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
            cursor: 'pointer'
          }
        }}
        onClick={handleLessonClick}
      >
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            {icon || getContentIcon()}
          </Box>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {lesson.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lesson.description || 'No description'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip 
              label={`Order: ${lesson.order}`} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={getDurationText(lesson.duration)} 
              size="small" 
              variant="outlined"
            />
            {lesson.content_type === 'video' && lesson.content_url && (
              <Tooltip title="Play content">
                <PlayIcon color="primary" />
              </Tooltip>
            )}
            <IconButton onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(e);
            }}>
              <MoreIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Collapse in={expanded && lesson.content_type !== 'quiz'}>
          <Box mt={2}>
            {lesson.content_type === 'video' && lesson.content_url && (
              <video controls width="100%" src={lesson.content_url} />
            )}
            {lesson.content_type === 'pdf' && lesson.content_url && (
              <iframe 
                src={lesson.content_url} 
                width="100%" 
                height="500px"
                title={lesson.title}
                style={{ border: 'none' }}
              />
            )}
          </Box>
        </Collapse>
      </Paper>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LessonItem;