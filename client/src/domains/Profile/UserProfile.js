import { useState } from "react";
import apiService from "../../lib/utils/ApiService";
import { useAuth } from "../../lib/context/authContext";
import CheckinForm from "./CheckinForm";
import "./UserProfile.css";

const UserProfile = () => {
  const { loggedUser, setLoggedUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ location: "" });
  const [showCheckIn, setShowCheckin] = useState(false);

  const handleChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleShowCheckIn = () => {
    setShowCheckin(true)
  }
  const handleClose = () => {
    setShowCheckin(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await apiService.updateLocation(profileForm);
    setLoggedUser(updatedUser);
    setProfileForm({ location: "" });
  };

  const checkedIn = loggedUser.checkedIn

  return (
    <div>
      <div className="user_greeting_container">
        <h2>Welcome, {loggedUser.firstName}</h2>
        {checkedIn ? <p>You're checked in</p> : <p onClick={handleShowCheckIn}>You're in private mode. <span>Check in here</span></p>}
        {showCheckIn && <CheckinForm handleClose={handleClose} />} 
      </div>
      <div className="user_info_container">
        <h5>Your role: {loggedUser.role}</h5>
        {!loggedUser.location || loggedUser.locaiton === '' ?
          <h4>Update your location below</h4> : <h4>Your current work location: {loggedUser.location}</h4>}
      </div>
      <div className="update_user_container">
        <p>Where are you today?</p>
        <form onSubmit={handleSubmit}>
          <input
            className="update_user_location"
            name="location"
            placeholder="Location..."
            value={profileForm.location}
            onChange={handleChange}
          />
          <input
            className="submit_user_update"
            type="submit"
            name="update"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
}


export default UserProfile;
