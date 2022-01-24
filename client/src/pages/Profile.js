import UserPrivateProfile from "../components/UserPrivateProfile";
import AdminForms from "../components/AdminForms";
import { useAuth } from "../lib/context/authContext";
import "./Profile.css";

function Profile() {
  const { loggedUser } = useAuth();

  return (
    <div className="profile_page">
      <div className="profile_page_container">
        {loggedUser && <UserPrivateProfile />}
      </div>
      <div className="admin_forms_container">
        {loggedUser && loggedUser.admin && <AdminForms />}
      </div>
    </div>
  );
}

export default Profile;
