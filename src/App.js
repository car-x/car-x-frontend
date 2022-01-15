import React, { Suspense, lazy } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyThemeProvider from './context/Theme/MyThemeProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ThemeState from './context/Theme/ThemeState';
import UserState from './context/User/UserState';
import SocketState from './context/Socket/SocketState';
import DataState from './context/Data/DataState';
import ControlState from './context/Control/ControlState';
import NotificationState from './context/Notification/NotificationState';

const Home = lazy(() => import('./components/Home/Home'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const Login = lazy(() => import('./components/Login/Login'));


/*

Contexts are => {
  ThemeState: Theme Management,
  UserState: User Management & Authentication,
  SocketState: Socket Management,
  DataState: Data Management,
  ControlState: Controlling Management,
  NotificationState: Notification Management
}

*/
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeState>
          <UserState>
            <MyThemeProvider>

              <Switch>
                <Suspense fallback={<div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />

                  <PrivateRoute path="/admin">
                    <SocketState>
                      <DataState>
                        <ControlState>
                          <NotificationState>
                            <Admin />
                          </NotificationState>
                        </ControlState>
                      </DataState>
                    </SocketState>
                  </PrivateRoute>

                  {/* <Route path="/" >
                    <h1>Wrong</h1>
                  </Route> */}
                </Suspense>
              </Switch>

            </MyThemeProvider>
          </UserState>
        </ThemeState>
      </BrowserRouter>
    </div>
  );
}

export default App;
