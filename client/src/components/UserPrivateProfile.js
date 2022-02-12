import React,  { useState } from "react";
import {useHistory } from 'react-router-dom';
import apiService from "../utils/ApiService";
import { useAuth } from '../lib/context/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPrivateProfile.css';


function UserPrivateProfile () {
  const context = useAuth();
  const history = useHistory();
  const user = context.authUser;

  const [ profileForm, setProfileForm ] = useState( {location: ''} )

  const updateUserLocation = async (profileForm) => {
    const token = localStorage.getItem('accessToken');
    await apiService.updateProfile(profileForm, token);
 };
 
  const handleChange = (e) => {
      setProfileForm({...profileForm, [e.target.name]: e.target.value})
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserLocation(profileForm)
    context.setAuthUser({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      admin: user.admin,
      team: user.team,
      image: user.image,
      tasks: user.tasks,
      location: profileForm.location
    })
    console.log('submitting', profileForm)
    setProfileForm({location: ''});
  };

  const handleLogOut = () => {
    apiService.logOut('accessToken');
    context.setAuthUser({  
      firstName: '',
      lastName: '',
      admin: false,
      image : '',
      location: '',
      team: '',
      tasks: [],
      role: ''});
      history.push('/')
  };
  
  return (
    <div className="user_page">
      <div className="user_location_wrapper">
        <h2 className="user_greeting">Welcome, {user.firstName}!</h2>
        <div className="current_user_information">
          <FontAwesomeIcon icon={faCoffee} />  
          {!user.location || user.location === '' ? <h4>Let your team know where you are below</h4>:
          <h4>You're working from: <span>{user.location}</span></h4>}
        </div>
        <div className="update_user_container">
          <p className="update_title">Working from somewhere else?</p>
          <p>Let your team know:</p>
            <form className="update_user_form" onSubmit={handleSubmit} >
            <input 
                className="update_user_location" 
                name="location" 
                placeholder="Tell your team..."
                value={profileForm.location} 
                onChange={handleChange}></input>
            <input 
                className="submit_user_update" 
                type='submit' 
                name='update' 
                value='Update location'/>
          </form> 
        </div>
        <button className="logout" onClick={handleLogOut}>LOGOUT</button> 
      </div>
      <div className="user_info_wrapper">
        <div className="user_image">
          <FontAwesomeIcon icon={faUser} />
        </div>
          <div className="user_details">
          {user.admin && <p>⭐️ Manager</p>}
            <p>Role: <span className="info">{user.role}</span></p> 
            <p/>
            {!user.location || user.location === '' ? <p>No recent update 🌎 </p> : <p>Location: <span className="info">{user.location}</span></p>  }
        </div>
      </div>
    </div>
  );
}

export default UserPrivateProfile;
