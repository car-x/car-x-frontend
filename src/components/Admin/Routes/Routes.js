import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { DrawerHeader } from './../Navbar/Navbar';
// import Sensor1 from './../Sensor1/Sensor1';
// import Sensor2 from './../Sensor2/Sensor2';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './../../ErrorBoundary/ErrorBoundary';


const Dashboard = lazy(() => import('./../Dashboard/Dashboard'));
const SensorComponent = lazy(() => import('./../Sensor/Sensor'));
const ControllerComponent = lazy(() => import('../ControllerComponent/ControllerComponent'));
const Accounts = lazy(() => import('./../Accounts/Accounts'));
const Profile = lazy(() => import('./../Profile/Profile'));

const MyRoutes = (props) => {
  let history = useHistory();
  let { path } = useRouteMatch();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1, overflow: 'hidden' }}>
      <DrawerHeader />
      <Paper elevation={0}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            history.push('/');
          }}
        >

          {/* My Routes */}
          <Switch>
            <Suspense fallback={<div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}>
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

              <Route path={`${path}/controls`}><ControllerComponent controls={props.controls} /></Route>
              <Route path={`${path}/accounts`} component={Accounts} />
              <Route path={`${path}/profile`} component={Profile} />

            </Suspense>
          </Switch>
        </ErrorBoundary>
      </Paper>
    </Box>
  )
}

export default MyRoutes;
