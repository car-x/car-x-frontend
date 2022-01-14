import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Paper, Switch, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    padding: theme.spacing(1),
    margin: 0,
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const DashboardSwitch = ({heading, checked, handleChange, name}) => {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h6" component="div" className={classes.heading} gutterBottom >{heading}</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        name={name}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Paper>
  )
}

export default DashboardSwitch;
