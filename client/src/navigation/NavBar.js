import React from 'react';
import Header from './Header';
import NavLinks from './NavLinks';
import { useAuth } from '../lib/context/authContext';
import {Link} from 'react-router-dom';

import './NavBar.css';

function NavBar () {
  
  const context = useAuth();

  return (
    <Header >
      <button className='navbar_menu'>
        <span />
        <span />
        <span />
      </button>
      <h1 className="mainnav_title">
      <Link to="/">whosWhere</Link>
      </h1>
      {context.authUser.firstName !== '' &&
      <nav>
        <NavLinks />
      </nav>}
    </Header>
  );
}


export default NavBar;

