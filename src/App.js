import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyStates from './context/State/State';
import MyThemeProvider from './context/Theme/MyThemeProvider';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyStates>
          <MyThemeProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/admin"><Admin /></PrivateRoute>
              <Route path="/" >
                <h1>Wrong</h1>
              </Route>
            </Switch>
          </MyThemeProvider>
        </MyStates>
      </BrowserRouter>
    </div>
  );
}

export default App;
