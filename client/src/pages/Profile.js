import { useState } from "react";
import UserProfile from "../domains/Profile/UserProfile";
import { useAuth } from "../lib/context/authContext";
import CheckinForm from "../domains/Profile/CheckinForm";
import "./Profile.css";

const Profile = () => {
  const [ showCheckIn, setShowCheckin ] = useState(true);

  const handleChange = () => {
    setShowCheckin(false)
  }

  const { loggedUser } = useAuth();

  console.log('SHOW', showCheckIn)

  return (
    <div>
      {showCheckIn && <CheckinForm
        handleClose={handleChange} />}
      <div className='profile_page'>
        {loggedUser && <UserProfile />}
      </div>
    </div>
  );
}

export default Profile;
