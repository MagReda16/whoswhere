import React from 'react';
import { withRouter } from 'react-router-dom';
import UserPrivateProfile from '../components/UserPrivateProfile';
import AdminForms from '../components/AdminForms';
import apiService from '../utils/ApiService';
import { useAuth } from '../lib/context/authContext';
import { useHistory } from 'react-router-dom';




function Profile (props) {
  const history = useHistory();
  const context = useAuth();
  // const [ profile, setProfile ] = useState([]);
  
  console.log(context.authUser)

//logs user out, and sends them back to the homescreen
  const handleClick = () => {
      removeToken();
      handleAuth();
      console.log('LOGGING OUT')
      history.push('/')
  }
  //removes token from local storage
  const removeToken = () => {
    apiService.logOut('accessToken');
  }
//sets Authenticated back to false
  const handleAuth = () => {
      context.setAuthUser(null);
    }

  const isAdmin = context.authUser.admin;

return (
<div>
  <UserPrivateProfile /> 
  {isAdmin &&
  <AdminForms/>}

    <button onClick={handleClick}>LOGOUT</button>
</div>

)
}

export default withRouter(Profile);
