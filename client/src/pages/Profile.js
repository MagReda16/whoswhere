import UserProfile from "../domains/Profile/UserProfile";
import { useAuth } from "../lib/context/authContext";
import "./Profile.css";

const Profile = () => {
 
  const { loggedUser } = useAuth();

  return (
    <div>
      <div className='profile_page'>
        {loggedUser && <UserProfile />}
      </div>
    </div>
  );
}

export default Profile;
