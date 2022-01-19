import React from 'react';
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
      {props.admin && <p className='manager_tag'>⭐️ Manager</p>}
    </div>
    <div className="public_user_details">
      <p>Role: <span className='public_info'>{props.role}</span></p>
      <p/>
      {!props.location || props.location === '' ? <p>No recent update 🌎 </p> :
      <p>Location: <span className='public_info'>{props.location}</span></p>}
      </div>
    </div>
  );
}

export default UserPublicProfile;