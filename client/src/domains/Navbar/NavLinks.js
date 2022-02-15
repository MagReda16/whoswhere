import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../lib/context/authContext';
import './NavLinks.css';

function NavLinks () {
  const { setLoggedUser} = useAuth();
  const history = useHistory()

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setLoggedUser(null);
    history.push("/");
  };
  return(
    <ul className='nav_links'>
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile">My Profile</NavLink>
     </li>
      <li>
        <NavLink to="/teams">My Team</NavLink>
      </li>
      <li>
      <button className="logout" onClick={handleLogOut}>
          Logout
      </button>
      </li>
    </ul>
  )
}

export default NavLinks;