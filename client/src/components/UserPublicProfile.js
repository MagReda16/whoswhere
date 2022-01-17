import React, {useState} from 'react';
import{useAuth} from '../lib/context/authContext'
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPublicProfile.css';


function UserPublicProfile (props) {

  return (
  <div className="public_user_info_container">
    <div className='public_user_info_header'>
    <div className="public_user_image">
          <FontAwesomeIcon icon={faUser} />
    </div>
      <h3>{props.firstName} {props.lastName}</h3>
    </div>
    <div className="public_user_details">
      <p>Role: {props.role}</p>
      <p/>
      <p>Location: {props.location}</p>
      </div>
    </div>
  );
}

export default UserPublicProfile;