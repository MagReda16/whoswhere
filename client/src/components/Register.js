import React from 'react';
import './Register.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../utils/ApiService';

function Register (props) {
  const history = useHistory();
  const [ registerForm, setRegisterForm ] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
    admin: false
  });

  const [ hasError, setHasError ] = useState(false);

 function handleChange (e, valkey = 'value') {
    setRegisterForm({...registerForm, [e.target.name]: e.target[valkey]})
}

  const handleSubmit = async (e) => {
      e.preventDefault()
      setHasError(false);
    try {
      await apiService.registerUser(registerForm);
      const { accessToken } = await apiService.logInUser(
        {username: registerForm.username, 
        password: registerForm.password});
        localStorage.setItem(accessToken, 'accessToken');
        history.push('/profile');
    } catch (error) {
        setHasError(true);
        clearForm();
    }
  };

  const clearForm = () => {
    setRegisterForm({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      role: '',
      admin: false
    });
  }

  return (
    <div className="register_page">
      {hasError && <div> ERROR </div>}
      <h2 className='register_title'>Let's Sign Up!</h2>
    <div className='register_form_container'>
    <form 
      className='register_form'
      onSubmit={handleSubmit}>
      <label htmlFor='firstname'></label>
      <input 
      className='firstname'
          type='text'
          name='firstName'
          placeholder='First name...'
          value={registerForm.firstName} 
          onChange={handleChange}/>
      <label htmlFor='lastname'></label>
      <input 
          className='lastname'
          type='text'
          name='lastName'
          placeholder='Last name...'
          value={registerForm.lastName}
          onChange={handleChange} />
    <label htmlFor="role"></label>
    <input
        className="role"
        name="role"
        placeholder="What's your role?"
        value={registerForm.role}
        onChange={handleChange}
        >
    </input>
      <label htmlFor='username'></label>
      <input 
          className='username'
          type='text' 
          name='username' 
          placeholder='Create username...'
          value={registerForm.username}
          onChange={handleChange} />
      <label htmlFor='password'></label>
      <input
          className='password'
          type='password' 
          name='password'
          placeholder='Create password...'
          value={registerForm.password} 
          onChange={handleChange}/>
  <div className='checkbox_wrapper'>
      <label htmlFor='admin' className='admin_checkbox'>Are you a team manager?</label>
      <input
          className='admin'
          id='admin'
          type='checkbox'
          name='admin'
          onChange={(e)=> handleChange(e, 'checked')}
          />
      </div>
      <input 
          className='submit'
          type='submit'
          name='register'
          value='Register'
          onClick={handleChange}
         />
    </form>
  </div>
</div>
  );
};


export default Register;