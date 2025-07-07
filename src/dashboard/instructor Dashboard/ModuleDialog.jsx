


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
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';

// const durationOptions = [
//   { value: 5, label: '5 minutes' },
//   { value: 10, label: '10 minutes' },
//   { value: 15, label: '15 minutes' },
//   { value: 30, label: '30 minutes' },
//   { value: 45, label: '45 minutes' },
//   { value: 60, label: '1 hour' },
//   { value: 90, label: '1.5 hours' },
//   { value: 120, label: '2 hours' },
//   { value: 180, label: '3 hours' }
// ];

// const ModuleDialog = ({
//   open,
//   handleClose,
//   module = null,
//   courseId,
//   onSubmit,
//   loading,
//   error
// }) => {
//   const theme = useTheme();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     order: 1,
//     duration: 30
//   });

//   useEffect(() => {
//     if (module) {
//       setFormData({
//         title: module.title || '',
//         description: module.description || '',
//         order: module.order || 1,
//         duration: module.duration || 30
//       });
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         order: 1,
//         duration: 30
//       });
//     }
//   }, [module]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'order' || name === 'duration' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.title) return;
    
//     const data = {
//       ...formData,
//       course_id: courseId
//     };
    
//     onSubmit(data);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ 
//         bgcolor: theme.palette.primary.main, 
//         color: 'white',
//         fontWeight: 'bold'
//       }}>
//         {module ? 'Edit Module' : 'Create New Module'}
//       </DialogTitle>
//       <DialogContent sx={{ mt: 2 }}>
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message || 'An error occurred'}</Alert>}
        
//         <TextField
//           name="title"
//           label="Module Title"
//           fullWidth
//           margin="normal"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
        
//         <TextField
//           name="description"
//           label="Description"
//           fullWidth
//           multiline
//           rows={3}
//           margin="normal"
//           value={formData.description}
//           onChange={handleChange}
//         />
        
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

// export default ModuleDialog;


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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const durationOptions = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' }
];

const ModuleDialog = ({
  open,
  handleClose,
  module = null,
  courseId,
  onSubmit,
  loading,
  error
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1,
    duration: 30
  });

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title || '',
        description: module.description || '',
        order: module.order || 1,
        duration: module.duration || 30
      });
    } else {
      setFormData({
        title: '',
        description: '',
        order: 1,
        duration: 30
      });
    }
  }, [module]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' || name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    
    const data = {
      ...formData,
      course_id: courseId
    };
    
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        fontWeight: 'bold'
      }}>
        {module ? 'Edit Module' : 'Create New Module'}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message || 'An error occurred'}</Alert>}
        
        <TextField
          name="title"
          label="Module Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        
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

export default ModuleDialog;