import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export default function EditButton() {
  
  const onClick = () => {
    alert("Hi how are you")
  }


  return (
    <IconButton onClick={onClick}>
      <EditIcon color='primary'></EditIcon>
    </IconButton>
    
  );
}
