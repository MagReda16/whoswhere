import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';


function NavLinks () {
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
    </ul>
  )
}

export default NavLinks;