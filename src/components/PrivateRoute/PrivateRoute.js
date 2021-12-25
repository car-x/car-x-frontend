import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useHistory, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  // const history = useHistory()

  // useEffect(() => {
  //   // Validating JWT token
  //   const token = JSON.parse(localStorage.getItem('user'))?.token
  //   if (token) {
  //     const decodedToken = decode(token)

  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       localStorage.clear()
  //       history.push('/login')
  //     } else {
  //       history.push('/')
  //     }
  //   } else {
  //     history.push('/login')
  //   }
  // }, [history])
  let isAuthenticated = true;
  // console.log("Private Route");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
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
