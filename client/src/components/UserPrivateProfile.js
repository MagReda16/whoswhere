import React from "react";
import { useState, useEffect } from 'react';
import apiService from "../utils/ApiService";
import {useAuth} from '../lib/context/authContext'
import './UserPrivateProfile.css';



function UserPrivateProfile(props) {
  // const context = useAuth();

 const [ profileForm, setProfileForm ] = useState({role: '', location: ''})

 const [ location, setLocation ] = useState({location: ''})


 const updateProfile = () => {
   const token = localStorage.getItem('accessToken');
    apiService.updateProfile(profileForm, token);
 }
 

  const currentUser = props.profile
  const handleChange = (e) => {
      setProfileForm({...profileForm, [e.target.name]: e.target.value})
}

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm)
    console.log('submitting')
  };

  return (
  <div className="user_page_container">
   <header className="user_heading">
        <h1 className="user_heading">Welcome, {currentUser.firstName}!</h1>
      </header>
    <div className="current_user_information">
        <h3>Your current location: {currentUser.location}</h3>
        <p>Working from somewhere else?</p>
    </div>
    <div className="update_user_container">
      <form className="update_user_form"
      onSubmit={handleSubmit}
      >
    <label htmlFor="role"></label>
    <input
        className="update_user_role"
        name="role"
        placeholder="What's your role?"
        value={profileForm.role}
        onChange={handleChange}
        >
    </input>
    <label htmlFor="role"></label>
    <input
        className="update_user_location"
        name="location"
        placeholder="Where are you today?"
        value={profileForm.location}
        onChange={handleChange}
     ></input>
     <input 
          className="submit_user_update"
          type='submit' 
          name='update' 
          value='Update'/>
    </form> 
  </div>
</div>

//contains:
  //all info expect password
  //update location form
  //location state lives here?
  );
}

export default UserPrivateProfile;


