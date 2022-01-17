import React from "react";
import { useState } from 'react';
import apiService from "../utils/ApiService";
import { useAuth } from '../lib/context/authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPrivateProfile.css';




function UserPrivateProfile(props) {
  const context = useAuth();
  const user = context.authUser;
  console.log(user)

  console.log(context.authUser)

  const [ profileForm, setProfileForm ] = useState({role: ''})

  const updateProfile = () => {
    const token = localStorage.getItem('accessToken');
    apiService.updateProfile(profileForm, token);
 };
 
  const handleChange = (e) => {
      setProfileForm({...profileForm, [e.target.name]: e.target.value})
}

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm)
    console.log('submitting')
    setProfileForm({title: ''});
  };
  

  return (
    <div className="user_page">
      <header className="user_heading">
        <h1 className="user_heading">Welcome, {user.firstName}!</h1>
        <FontAwesomeIcon icon={faCoffee} /> 
        <div className="current_user_information">
          <h3>Your current location: {user.location}</h3>
      </div>
    </header>
   <div className="user_profile_container">
      <div className="update_user_container">
      <p>Working from somewhere else?</p>
        <form className="update_user_form" onSubmit={handleSubmit}>
          <label htmlFor="location"></label>
          <input className="update_user_location" name="location" placeholder="Tell your team..." value={profileForm.location} onChange={handleChange}></input>
          <input className="submit_user_update" type='submit' name='update' value='Update location'/>
        </form> 
      </div>
      <div className="user_info_container">
        <div className="user_image">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="user_details">
          <p>Role: {user.role}</p>
          <p/>
          <p>Location: {user.location}</p>
        </div>
      </div>
   </div>
  </div>
  );
}

export default UserPrivateProfile;
