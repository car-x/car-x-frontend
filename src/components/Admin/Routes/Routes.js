import React from 'react';
import { Box, Divider, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import Dashboard from './../Dashboard/Dashboard';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { DrawerHeader } from './../Navbar/Navbar';
import Sensor1 from './../Sensor1/Sensor1';
import Sensor2 from './../Sensor2/Sensor2';
import Accounts from './../Accounts/Accounts';
import { Dashboard as Dash, Group, ManageAccounts, Sensors } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import Profile from './../Profile/Profile';

// This routes will imported in Navbar and create navlinks accordingly
const routes = [{
  name: 'Dashboard',
  path: '/',
  icon: <Dash />
},
{
  name: 'Sensor 1',
  path: '/sensor1',
  icon: ''
},
{
  name: 'Sensor 2',
  path: '/sensor2',
  icon: ''
},
{
  name: 'Divider',
  path: null,
  icon: null
},
{
  name: 'Profile',
  path: '/profile',
  icon: <ManageAccounts />
},
{
  name: 'Accounts',
  path: '/accounts',
  icon: <Group />
},
];

export const Routes = () => {
  let history = useHistory();
  let { path } = useRouteMatch();

  return (
    <>
      {
        routes.map((route, index) => {
          let comp = route.name === 'Divider' ?
            <Divider sx={{ margin: 1 }} key={route.name} />
            :
            <ListItem button key={route.name} onClick={() => history.push(`${path}${route.path}`)}>
              <ListItemIcon>
                {route.icon ? route.icon : <Sensors />}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>

          return comp;
        })
      }
    </>
  )
}

const MyRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1, overflow: 'hidden' }}>
      <DrawerHeader />
      <Paper elevation={0}>

        {/* My Routes */}
        <Switch>
          <Route exact path={path} component={Dashboard} />
          <Route path={`${path}/sensor1`} component={Sensor1} />
          <Route path={`${path}/sensor2`} component={Sensor2} />
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
