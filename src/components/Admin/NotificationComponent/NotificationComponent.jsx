import React, {useContext} from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';
import Notification from './Notification/Notification';
import NotificationContext from './../../../context/Notification/NotificationContext';

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: theme.spacing(1),
    margin: 0,
    textDecoration: 'underline'
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    maxHeight: '400px',
    marginBottom: theme.spacing(2),
    overflow: 'scroll'
  },
  link: {
    textAlign: 'right'
  }
}));

const NotificationComponent = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);  
  let notification = useContext(NotificationContext);
  return (
    <>
      <Typography variant="h6" component="div" className={classes.heading} gutterBottom >Notifications</Typography>
      <Paper elevation={1} className={classes.paper}>
        {
          notification?.map(noti => <Notification {...noti} />)
        }
    </Paper>
    </>
  )
}

export default NotificationComponent
