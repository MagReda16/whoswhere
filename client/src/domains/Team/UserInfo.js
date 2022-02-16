import React from "react";
import "./UserInfo.css";

const UserInfo = ({ user }) => {
  const displayFirstName =  user.firstName[0].toUpperCase() + user.firstName.substring(1)
  const displayLastName =  user.lastName[0].toUpperCase() + user.lastName.substring(1)


  return (
    <div className="public_user_info_container">
      <div className="public_user_info">
        <h3>{displayFirstName} {displayLastName}</h3>
        <p>Role: <span className="public_info">{user.role}</span></p>
        <p />
        {!user.location || user.location === "" ? (
          <p>No recent update 🌎 </p>
        ) : (
          <p>
            Location: <span className="public_info">{user.location}</span>
          </p>
        )}
      </div>
      <div className="public_user_assets">
          {/* <p>Map?</p> */}
          <p>Checked in? <br/>{user.checkedIn ? '✔️' : '❌'}</p>
      </div>
    </div>
  );
}

export default UserInfo;
