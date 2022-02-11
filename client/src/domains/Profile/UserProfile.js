import { useState } from "react";
import { useHistory } from "react-router-dom";
import apiService from "../../lib/utils/ApiService";
import { useAuth } from "../../lib/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faUser } from "@fortawesome/free-solid-svg-icons";
import "./UserProfile.css";

const UserProfile = () => {
  const { loggedUser, setLoggedUser } = useAuth();
  const history = useHistory();

  const [profileForm, setProfileForm] = useState({ location: "" });

  const handleChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await apiService.updateLocation(profileForm);
    setLoggedUser(updatedUser);
    setProfileForm({ location: "" });
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setLoggedUser(null);
    history.push("/");
  };

  return (
    <div className="user_page">
      <div className="user_location_wrapper">
        <h2 className="user_greeting">Welcome, {loggedUser.firstName}!</h2>
        <div className="current_user_information">
          <FontAwesomeIcon icon={faCoffee} />
          {!loggedUser.location || loggedUser.location === "" ? (
            <h4>Let your team know where you are below</h4>
          ) : (
            <h4>
              You're working from: <span>{loggedUser.location}</span>
            </h4>
          )}
        </div>
        <div className="update_user_container">
          <p className="update_title">Working from somewhere else?</p>
          <p>Let your team know:</p>
          <form className="update_user_form" onSubmit={handleSubmit}>
            <input
              className="update_user_location"
              name="location"
              placeholder="Tell your team..."
              value={profileForm.location}
              onChange={handleChange}
            ></input>
            <input
              className="submit_user_update"
              type="submit"
              name="update"
              value="Update location"
            />
          </form>
        </div>
        <button className="logout" onClick={handleLogOut}>
          LOGOUT
        </button>
      </div>
      <div className="user_info_wrapper">
        <div className="user_image">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="user_details">
          {loggedUser.admin && <p>⭐️ Manager</p>}
          <p>
            Role: <span className="info">{loggedUser.role}</span>
          </p>
          <p />
          {!loggedUser.location || loggedUser.location === "" ? (
            <p>No recent update 🌎 </p>
          ) : (
            <p>
              Location: <span className="info">{loggedUser.location}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
