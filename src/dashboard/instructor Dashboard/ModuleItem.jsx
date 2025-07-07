


// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   Button,
//   useTheme,
//   Chip,
//   Divider,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   CircularProgress
// } from '@mui/material';
// import {
//   ExpandMore as ExpandMoreIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   VideoLibrary as VideoIcon,
//   Article as ArticleIcon,
//   Quiz as QuizIcon
// } from '@mui/icons-material';
// import LessonItem from './LessonItem';

// const ModuleItem = ({
//   module,
//   onEdit,
//   onDelete,
//   onAddLesson,
//   onEditLesson,
//   onDeleteLesson,
//   lessons,
//   lessonsLoading,
//   lessonsError
// }) => {
//   const theme = useTheme();
//   const [expanded, setExpanded] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const handleMenuClick = (event) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEditClick = () => {
//     onEdit(module);
//     handleMenuClose();
//   };

//   const handleDeleteClick = () => {
//     onDelete(module.id);
//     handleMenuClose();
//   };

//   const handleAddLessonClick = () => {
//     onAddLesson(module);
//   };

//   const getLessonIcon = (type) => {
//     switch (type) {
//       case 'video': return <VideoIcon fontSize="small" />;
//       case 'quiz': return <QuizIcon fontSize="small" />;
//       case 'pdf': return <ArticleIcon fontSize="small" />;
//       default: return <ArticleIcon fontSize="small" />;
//     }
//   };

//   return (
//     <Box mb={2}>
//       <Accordion expanded={expanded} onChange={handleExpand}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           sx={{
//             bgcolor: expanded ? theme.palette.action.selected : 'inherit',
//             '&:hover': {
//               bgcolor: theme.palette.action.hover
//             }
//           }}
//         >
//           <Box display="flex" alignItems="center" width="100%">
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               {module.title}
//             </Typography>
//             <Chip 
//               label={`Order: ${module.order}`} 
//               size="small" 
//               sx={{ mr: 1 }} 
//             />
//             <IconButton onClick={(e) => {
//               e.stopPropagation();
//               handleMenuClick(e);
//             }}>
//               <ExpandMoreIcon />
//             </IconButton>
//           </Box>
//         </AccordionSummary>
        
//         <AccordionDetails>
//           {module.description && (
//             <Typography variant="body2" color="text.secondary" mb={2}>
//               {module.description}
//             </Typography>
//           )}
          
//           <Divider sx={{ my: 2 }} />
          
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="subtitle1">
//               Lessons ({lessons?.length || 0})
//             </Typography>
//             <Button
//               variant="contained"
//               size="small"
//               startIcon={<AddIcon />}
//               onClick={handleAddLessonClick}
//             >
//               Add Lesson
//             </Button>
//           </Box>
          
//           {lessonsLoading ? (
//             <Box display="flex" justifyContent="center" p={2}>
//               <CircularProgress size={24} />
//             </Box>
//           ) : lessonsError ? (
//             <Typography color="error">{lessonsError}</Typography>
//           ) : (
//             <Box>
//               {lessons?.map(lesson => (
//                 <LessonItem
//                   key={lesson.id}
//                   lesson={lesson}
//                   onEdit={() => onEditLesson(lesson, module)}
//                   onDelete={() => onDeleteLesson(lesson.id)}
//                   icon={getLessonIcon(lesson.content_type)}
//                 />
//               ))}
//             </Box>
//           )}
//         </AccordionDetails>
//       </Accordion>
      
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleEditClick}>
//           <ListItemIcon>
//             <EditIcon fontSize="small" />
//           </ListItemIcon>
//           Edit Module
//         </MenuItem>
//         <MenuItem onClick={handleDeleteClick}>
//           <ListItemIcon>
//             <DeleteIcon fontSize="small" color="error" />
//           </ListItemIcon>
//           <Typography color="error">Delete Module</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default ModuleItem;



import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  useTheme,
  Chip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import LessonItem from './LessonItem';

const ModuleItem = ({
  module,
  onEdit,
  onDelete,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  lessons,
  lessonsLoading,
  lessonsError
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    onEdit(module);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDelete(module.id);
    handleMenuClose();
  };

  const handleAddLessonClick = () => {
    onAddLesson(module);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <VideoIcon fontSize="small" />;
      case 'quiz': return <QuizIcon fontSize="small" />;
      case 'pdf': return <ArticleIcon fontSize="small" />;
      default: return <ArticleIcon fontSize="small" />;
    }
  };

  return (
    <Box mb={2}>
      <Accordion expanded={expanded} onChange={handleExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: expanded ? theme.palette.action.selected : 'inherit',
            '&:hover': {
              bgcolor: theme.palette.action.hover
            }
          }}
        >
          <Box display="flex" alignItems="center" width="100%">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {module.title}
            </Typography>
            <Chip 
              label={`Order: ${module.order}`} 
              size="small" 
              sx={{ mr: 1 }} 
            />
            <IconButton onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(e);
            }}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </AccordionSummary>
        
        <AccordionDetails>
          {module.description && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              {module.description}
            </Typography>
          )}
          
          <Divider sx={{ my: 2 }} />
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1">
              Lessons ({lessons?.length || 0})
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddLessonClick}
            >
              Add Lesson
            </Button>
          </Box>
          
          {lessonsLoading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={24} />
            </Box>
          ) : lessonsError ? (
            <Typography color="error">{lessonsError}</Typography>
          ) : (
            <Box>
              {lessons?.map(lesson => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={() => onEditLesson(lesson, module)}
                  onDelete={() => onDeleteLesson(lesson.id)}
                  icon={getLessonIcon(lesson.content_type)}
                />
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Module
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete Module</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ModuleItem;