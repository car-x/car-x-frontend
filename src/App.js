import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyThemeProvider from './context/Theme/MyThemeProvider';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ThemeState from './context/Theme/ThemeState';
import UserState from './context/User/UserState';
import SocketState from './context/Socket/SocketState';
import DataState from './context/Data/DataState';
import ControlState from './context/Control/ControlState';
import NotificationState from './context/Notification/NotificationState';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeState>
          <UserState>
            <MyThemeProvider>
              <Switch>
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
                <Route path="/" >
                  <h1>Wrong</h1>
                </Route>
              </Switch>
            </MyThemeProvider>
          </UserState>
        </ThemeState>
      </BrowserRouter>
    </div>
  );
}

export default App;
