import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../utils/ApiService';
import { useAuth } from '../lib/context/authContext';
import './Login.css'

function Login (props) {

const [ logInForm, setLogInForm ] = useState( {username: '', password: ''} );

const [ hasError, setHasError ] = useState(false);

const context = useAuth();


const history = useHistory();

const handleChange = (e) => {
  setLogInForm({...logInForm, [e.target.name]: e.target.value})
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    try {
      const { accessToken }  = await apiService.logInUser(logInForm);
      localStorage.setItem('accessToken', accessToken);
      // context.setAuth(true);
      // context.setToken(accessToken);
      // console.log(context.token);
      history.push('/profile');
    } catch (error) {
      setHasError(true);
      setLogInForm({username: '', password: ''});
    }
  }


  return (
    <div className='login_page'>
      {hasError && <div> ERROR </div>}
      <h2>Let's Log In!</h2>
      <div className='login_form_container'>
      <form className='login_form' onSubmit={handleSubmit}>
        <label htmlFor='username'></label>
        <input 
          className='username'
          type='text' 
          name='username' 
          placeholder='Enter username...'
          value={logInForm.username}
          onChange={handleChange} />
          
        <label htmlFor='password'></label>
        <input 
          className='password'
          type='password' 
          name='password' 
          placeholder='Enter password...'
          value={logInForm.password}
          onChange={handleChange} />
        <input 
          className='login_btn'
          type='submit' 
          name='register' 
          value='Login' />
      </form>
      </div>
      </div>
  );
}


export default Login;