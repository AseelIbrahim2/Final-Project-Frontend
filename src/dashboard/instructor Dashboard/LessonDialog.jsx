
// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Typography,
//   useTheme,
//   CircularProgress,
//   Alert,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box
// } from '@mui/material';

// const contentTypes = [
//   { value: 'video', label: 'Video' },
//   { value: 'pdf', label: 'PDF' },
//   { value: 'quiz', label: 'Quiz' }
// ];

// const durationOptions = [
//   { value: 5, label: '5 minutes' },
//   { value: 10, label: '10 minutes' },
//   { value: 15, label: '15 minutes' },
//   { value: 30, label: '30 minutes' },
//   { value: 45, label: '45 minutes' },
//   { value: 60, label: '1 hour' }
// ];

// const LessonDialog = ({
//   open,
//   handleClose,
//   lesson = null,
//   moduleId,
//   onSubmit,
//   loading,
//   error
// }) => {
//   const theme = useTheme();
//   const [formData, setFormData] = useState({
//     title: '',
//     content_type: 'video',
//     duration: 30,
//     order: 1,
//     file: null
//   });

//   useEffect(() => {
//     if (lesson) {
//       setFormData({
//         title: lesson.title || '',
//         content_type: lesson.content_type || 'video',
//         duration: lesson.duration || 30,
//         order: lesson.order || 1,
//         file: null
//       });
//     } else {
//       setFormData({
//         title: '',
//         content_type: 'video',
//         duration: 30,
//         order: 1,
//         file: null
//       });
//     }
//   }, [lesson]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'order' || name === 'duration' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       file: e.target.files[0]
//     }));
//   };
//  const handleSubmit = async () => {
//   if (!formData.title) {
//     setError('Title is required');
//     return;
//   }

//   if (formData.content_type !== 'quiz' && !formData.file && !lesson?.content_url) {
//     setError('Please upload a file for this content type');
//     return;
//   }

//   try {
//     const lessonData = {
//       title: formData.title,
//       content_type: formData.content_type,
//       duration: formData.duration,
//       order: formData.order
//       // module_id سيتم تمريره من خلال useLessons
//     };

//     await onSubmit(lessonData, formData.file);
//     handleClose();
//   } catch (err) {
//     setError(err.message || 'Failed to save lesson');
//   }
// };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ 
//         bgcolor: theme.palette.primary.main, 
//         color: 'white',
//         fontWeight: 'bold'
//       }}>
//         {lesson ? 'Edit Lesson' : 'Create New Lesson'}
//       </DialogTitle>
//       <DialogContent sx={{ mt: 2 }}>
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
//         <TextField
//           name="title"
//           label="Lesson Title"
//           fullWidth
//           margin="normal"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
        
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Content Type</InputLabel>
//           <Select
//             name="content_type"
//             value={formData.content_type}
//             onChange={handleChange}
//             label="Content Type"
//             required
//           >
//             {contentTypes.map(type => (
//               <MenuItem key={type.value} value={type.value}>
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Duration</InputLabel>
//           <Select
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             label="Duration"
//           >
//             {durationOptions.map(option => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
//         <TextField
//           name="order"
//           label="Order"
//           type="number"
//           fullWidth
//           margin="normal"
//           value={formData.order}
//           onChange={handleChange}
//           inputProps={{ min: 1 }}
//         />
        
//         {(formData.content_type !== 'quiz') && (
//           <Box mt={2}>
//             <Typography variant="subtitle2" gutterBottom>
//               {lesson?.content_url ? 'Replace' : 'Upload'} {formData.content_type} Content
//             </Typography>
//             <input
//               type="file"
//               accept={
//                 formData.content_type === 'video' ? 'video/*' : 
//                 formData.content_type === 'pdf' ? '.pdf' : '*'
//               }
//               onChange={handleFileChange}
//               required={!lesson?.content_url}
//             />
//             {formData.file && (
//               <Typography variant="caption" color="text.secondary">
//                 Selected file: {formData.file.name}
//               </Typography>
//             )}
//             {lesson?.content_url && !formData.file && (
//               <Typography variant="caption" color="text.secondary">
//                 Current file: {lesson.content_url}
//               </Typography>
//             )}
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button 
//           onClick={handleClose} 
//           color="secondary"
//           sx={{ fontWeight: 'bold' }}
//           disabled={loading}
//         >
//           Cancel
//         </Button>
//         <Button 
//           onClick={handleSubmit} 
//           color="primary"
//           variant="contained"
//           disabled={loading || !formData.title}
//           sx={{ fontWeight: 'bold' }}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Submit'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default LessonDialog;



import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';

const contentTypes = [
  { value: 'video', label: 'Video' },
  { value: 'pdf', label: 'PDF' },
  { value: 'quiz', label: 'Quiz' }
];

const durationOptions = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' }
];

const LessonDialog = ({
  open,
  handleClose,
  lesson = null,
  onSubmit,
  loading,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'video',
    duration: 30,
    order: 1,
    file: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || '',
        content_type: lesson.content_type || 'video',
        duration: lesson.duration || 30,
        order: lesson.order || 1,
        file: null
      });
    } else {
      setFormData({
        title: '',
        content_type: 'video',
        duration: 30,
        order: 1,
        file: null
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' || name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    
    if (!formData.title) {
      setError('Title is required');
      return;
    }

    if (formData.content_type !== 'quiz' && !formData.file && !lesson?.content_url) {
      setError('Please upload a file for this content type');
      return;
    }

    try {
      await onSubmit(formData, formData.file);
    } catch (err) {
      setError(err.message || 'Failed to save lesson');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        fontWeight: 'bold'
      }}>
        {lesson ? 'Edit Lesson' : 'Create New Lesson'}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          name="title"
          label="Lesson Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Content Type</InputLabel>
          <Select
            name="content_type"
            value={formData.content_type}
            onChange={handleChange}
            label="Content Type"
            required
          >
            {contentTypes.map(type => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Duration</InputLabel>
          <Select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            label="Duration"
          >
            {durationOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          name="order"
          label="Order"
          type="number"
          fullWidth
          margin="normal"
          value={formData.order}
          onChange={handleChange}
          inputProps={{ min: 1 }}
        />
        
        {formData.content_type !== 'quiz' && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              {lesson?.content_url ? 'Replace' : 'Upload'} {formData.content_type} Content
            </Typography>
            <input
              type="file"
              accept={
                formData.content_type === 'video' ? 'video/*' : 
                formData.content_type === 'pdf' ? '.pdf' : '*'
              }
              onChange={handleFileChange}
              required={!lesson?.content_url}
            />
            {formData.file && (
              <Typography variant="caption" color="text.secondary">
                Selected file: {formData.file.name}
              </Typography>
            )}
            {lesson?.content_url && !formData.file && (
              <Typography variant="caption" color="text.secondary">
                Current file: {lesson.content_url}
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          color="secondary"
          sx={{ fontWeight: 'bold' }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary"
          variant="contained"
          disabled={loading || !formData.title}
          sx={{ fontWeight: 'bold' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonDialog;