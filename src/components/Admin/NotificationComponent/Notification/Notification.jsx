import React from 'react';
import { Alert} from '@mui/material';

const Notification = (props) => {
  return (
    <div style={{marginBottom: '1%'}}>
      <Alert severity={props.type}>{props.message}</Alert>
    </div>
  )
}

export default Notification
