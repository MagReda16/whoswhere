import UserProfile from "../domains/Profile/UserProfile";
import AdminForms from "../domains/Profile/AdminForms";
import { useAuth } from "../lib/context/authContext";
import "./Profile.css";

const Profile = () => {
  const { loggedUser } = useAuth();

  return (
    <div className="profile_page">
      <div className="profile_page_container">
        {loggedUser && <UserProfile />}
      </div>
      <div className="admin_forms_container">
        {loggedUser && loggedUser.admin && <AdminForms />}
      </div>
    </div>
  );
}

export default Profile;
