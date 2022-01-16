import React from "react";
import './AdminPrivateProfile.css';
// import { useUsers } from '../lib/context';


function AdminPrivateProfile (props) {

  const currentUser = props.profile
  console.log(currentUser)

  return (
    <div className="admin_page_container">
    <h1 className="admin_header">Welcome, {currentUser.firstName}!</h1>
    </div>
  )
}

export default AdminPrivateProfile;