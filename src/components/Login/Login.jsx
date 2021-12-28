import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from './../../API/index';
import UserContext from './../../context/User/UserContext';

const Login = () => {

  const {setUser} = useContext(UserContext);
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    console.log('Submit', formData);
    event.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data.user);
      history.push('/admin');
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <div className='center-center'>
        Login
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/admin'>Admin</Link>
      </div>
      <div style={{marginTop: '20%'}}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type='text' name='email' value={formData.email} onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type='text' name='password' value={formData.password} onChange={handleChange} />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;