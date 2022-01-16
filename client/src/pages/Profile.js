import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import UserPrivateProfile from '../components/UserPrivateProfile';
import UserPublicProfile from '../components/UserPublicProfile';
import AdminPrivateProfile from '../components/AdminPrivateProfile';
import apiService from '../utils/ApiService';
import { useAuth } from '../lib/context/authContext';
import { useHistory } from 'react-router-dom';
// import {useUsers} from '../lib/context'



function Profile (props) {
  const history = useHistory();
  const context = useAuth();
  const [ profile, setProfile ] = useState([]);
  
  console.log(context.auth)
  // useEffect(()=>{
  //   const accessToken = localStorage.getItem('accessToken');
  //   const getProfile = async (accessToken) => {
  //     const userInfo = await apiService.showProfile(accessToken);
  //     if (userInfo) {
  //       setProfile(userInfo);
  //     } else {
  //       console.log('NOPE WRONG AGAIN')
  //       alert('WHOOPS NOT A USER')
  //       //add logic to handle unauthorized user UI
  //     }
  //   }; 
  //   getProfile(accessToken);
  // }, []);

//logs user out, and sends them back to the homescreen
  const handleClick = () => {
      removeToken();
      handleAuth();
      console.log('LOOGING OUT')
      history.push('/')
  }
  //removes token from local storage
  const removeToken = () => {
    apiService.logOut('accessToken');
  }
//sets Authenticated back to false
  const handleAuth = () => {
    context.setAuth(null);
  }


  const isAdmin = profile.admin;
  


return (

<div>
  {isAdmin ? 
  <AdminPrivateProfile
    profile={profile}/> :
  <UserPrivateProfile
    profile={profile}/> }
    <button onClick={handleClick}>LOGOUT</button>
</div>

)
}

export default withRouter(Profile);
