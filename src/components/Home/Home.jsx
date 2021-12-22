import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Hello
      <Link to="/admin">Admin</Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Home
