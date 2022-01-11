import React from 'react';
import { Box, Paper } from '@mui/material';
import Dashboard from './../Dashboard/Dashboard';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { DrawerHeader } from './../Navbar/Navbar';
// import Sensor1 from './../Sensor1/Sensor1';
// import Sensor2 from './../Sensor2/Sensor2';
import SensorComponent from './../Sensor/Sensor';
import Accounts from './../Accounts/Accounts';
import Profile from './../Profile/Profile';

const MyRoutes = (props) => {
  let { path } = useRouteMatch();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1, overflow: 'hidden' }}>
      <DrawerHeader />
      <Paper elevation={0}>

        {/* My Routes */}
        <Switch>
          <Route exact path={path}>
            <Dashboard {...props.routes?.find(r => r.name === 'Sensors')} controls={props.controls} />
          </Route>
          {/* <Route path={`${path}/sensor1`} component={Sensor1} />
          <Route path={`${path}/sensor2`} component={Sensor2} /> */}

          {props.routes?.find(r => r.name === 'Sensors')['sensors'].map(sensor =>
            <Route key={sensor.name} path={`${path}${sensor.path}`}>
              <SensorComponent {...sensor} />
            </Route>
          )}

          <Route path={`${path}/accounts`} component={Accounts} />
          <Route path={`${path}/profile`} component={Profile} />
          <Route path={path} >
            <h1>Wrong</h1>
          </Route>
        </Switch>

      </Paper>
    </Box>
  )
}

export default MyRoutes;
