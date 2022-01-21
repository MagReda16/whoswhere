import React, { useEffect } from "react";
import UserPrivateProfile from "../components/UserPrivateProfile";
import AdminForms from "../components/AdminForms";
import apiService from "../utils/ApiService";
import { useAuth } from "../lib/context/authContext";
import {} from "react-router-dom";
import "./Profile.css";

function Profile() {
  const context = useAuth();

  useEffect(() => {
    const getAuthUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const userInfo = await apiService.showProfile(accessToken);
      if (userInfo) {
        context.setAuthUser(userInfo);
        console.log("USERINFO", userInfo);
      } else {
        console.log("NOPE WRONG AGAIN");
      }
    };
    getAuthUser();
  }, []);

  const isAdmin = context.authUser.admin;

  return (
    <div className="profile_page">
      <div className="profile_page_container">
        <UserPrivateProfile />
      </div>
      <div className="admin_forms_container">{isAdmin && <AdminForms />}</div>
    </div>
  );
}

export default Profile;
