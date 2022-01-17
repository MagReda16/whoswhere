import React from 'react';
import{useUsers} from '../lib/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPublicProfile.css';


function UserPublicProfile (props) {
console.log(props)
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