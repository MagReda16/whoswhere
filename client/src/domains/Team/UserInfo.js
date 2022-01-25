import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./UserInfo.css";

const UserInfo = ({ user }) => {
  return (
    <div className="public_user_info_container">
      <div className="public_user_info_header">
        <div className="public_user_image">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        {user.admin && <p className="manager_tag">⭐️ Manager</p>}
      </div>
      <div className="public_user_details">
        <p>
          Role: <span className="public_info">{user.role}</span>
        </p>
        <p />
        {!user.location || user.location === "" ? (
          <p>No recent update 🌎 </p>
        ) : (
          <p>
            Location: <span className="public_info">{user.location}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
