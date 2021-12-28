import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const PrivateRoute = ({ children, ...rest }) => {
  // const history = useHistory()
  const isAuthenticated = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.clear();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  console.log("Private Route");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
