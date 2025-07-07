import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const InstructorProfile = ({ instructor }) => {
  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <Avatar 
          src={instructor.avatar} 
          sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: 'primary.main' }}
        >
          {instructor.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold">
           {instructor.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorProfile;