import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Typography, Paper, Grid } from '@mui/material';
import UserContext from './../../../context/User/UserContext';
import DataContext from './../../../context/Data/DataContext';
import ControlContext from './../../../context/Control/ControlContext';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardChart from '../ChartComponent/DashboardChart/DashboardChart';
import { useRouteMatch } from 'react-router-dom';
import DashboardSwitch from './../DashboardSwitch/DashboardSwitch';
import Table from './../Table/Table';

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: theme.spacing(1),
    border: '1px solid red 0 10 10 10',
    marginBottom: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%'
  },

}));
const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  let { path } = useRouteMatch();

  let user = useContext(UserContext);
  let data = useContext(DataContext);
  let control = useContext(ControlContext);

  const [points, setPoints] = useState([{}]);

  // useEffect(()=>console.log("Switch", switchStates),[switchStates])
  useEffect(() => {
    function pointAllocation(){
      setPoints([...data].slice(data.length - 50, 50));
    }
    data && pointAllocation();
  }, [data])
  
  const headCells = [
    {
      name: 'time',
      label: 'Time',
    },
    {
      name: 'temp',
      label: 'Temperature',
    },
    {
      name: 'speed',
      label: 'Speed',
    },
  ]
  return (
    <div>
      <Paper elevation={1} className={classes.heading}><Typography variant='h6' component='h6' >{user?.name}'s Dashboard</Typography></Paper>

      {/* Outer Grid Container */}
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" padding={0} spacing={1}>
      
        <Grid container item direction="row" justifyContent="space-between" alignItems="center" padding={0} xs={12} md={9} >

          {/* Charts Container */}
          <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1} padding={0}  >
            <Grid item xs={12} >
              <Typography variant='h6' pl={2}>Charts</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart data={points} heading='Temperature' xAxis='time' yAxis='temp' width='95%' height='30%' chartType='Area' link={`${path}/sensor1`} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart data={points} heading='Speed' xAxis='time' yAxis='speed' width='95%' height='30%' chartType='Line' LegendEnable={false} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart data={points} heading='Temperature+Speed' xAxis='time' yAxis='temp' width='95%' height='30%' chartType='Bar'  LegendEnable={false} />
            </Grid>
          </Grid>

          {/* Controller Container */}
          <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1} padding={0} >
            <Grid item xs={12} >
              <Typography variant='h6' pl={2} mt={2}>Controlling System</Typography>
            </Grid>
            {control.switchStates && <><Grid item xs={12} md={3}>
              <DashboardSwitch heading='LED 1' checked={control.switchStates.led1} handleChange={control.handleChange} name='led1' />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSwitch heading='LED 2' checked={control.switchStates.led2} handleChange={control.handleChange} name='led2' />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSwitch heading='LED 3' checked={control.switchStates.led3} handleChange={control.handleChange} name='led3' />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSwitch heading='LED 4' checked={control.switchStates.led4} handleChange={control.handleChange} name='led4' />
            </Grid></>
            }
          </Grid>

          {/* Data Table */}
          <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1} padding={0} >
            <Grid item xs={12} >
              <Typography variant='h6' pl={2} mt={2}>Data Table</Typography>
            </Grid>
            <Grid item xs={12} >
              <Table rows={data} headCells={headCells} />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item direction="row" justifyContent="space-between" alignItems="center" padding={0} spacing={1} xs={12} md={3} >
          <Grid item xs={12} >
            <Paper width='100%' style={{minHeight: 500}} >Todo</Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper width='100%' style={{minHeight: 200}} >Car Details</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard