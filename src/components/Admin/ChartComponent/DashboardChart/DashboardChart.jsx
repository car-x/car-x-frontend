import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';
import Chart from './../Chart/Chart';
import { Link } from 'react-router-dom';


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
    marginBottom: theme.spacing(2)
  },
  link: {
    textAlign: 'right'
  }
}));

const DashboardChart = ({data, heading, xAxis, yAxis, width, height, chartType, link, CartesianGridEnable, LegendEnable}) => {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h6" component="div" className={classes.heading} gutterBottom >{heading}</Typography>
      <Chart points={data} chartType={chartType} xAxis={xAxis} yAxis={yAxis} CartesianGridEnable={CartesianGridEnable} LegendEnable={LegendEnable}/>
      <Link className={classes.link} to={link?link:'/'}>See Details</Link>
    </Paper>
  )
}

export default DashboardChart
