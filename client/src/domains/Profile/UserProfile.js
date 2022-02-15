import { useState } from "react";
import apiService from "../../lib/utils/ApiService";
import { useAuth } from "../../lib/context/authContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { loggedUser, setLoggedUser } = useAuth();
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


  return (
    <div>
      <div className="user_greeting_container">
        <h2>Welcome, {loggedUser.firstName}</h2>
        <p>You're checked in</p>
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
