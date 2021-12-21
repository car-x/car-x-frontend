import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='center-center'>
      Login
      <Link to="/admin">Admin</Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Login;