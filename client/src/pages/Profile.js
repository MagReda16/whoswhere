import React, {useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import UserPrivateProfile from '../components/UserPrivateProfile';
import AdminForms from '../components/AdminForms';
import apiService from '../utils/ApiService';
import { useAuth } from '../lib/context/authContext';
import { useHistory } from 'react-router-dom';

function Profile () {

  const history = useHistory();
  const context = useAuth();

  console.log(context.authUser)

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    const getUser = async (accessToken) => {
        const userInfo = await apiService.showProfile(accessToken);
        if (userInfo) {
          context.setAuthUser(userInfo);
          console.log(userInfo);
      } else {
          console.log('NOPE WRONG AGAIN')
      }
    }; 
    getUser(accessToken);
  }, []);


  const handleLogOut = () => {
    apiService.logOut('accessToken');
    context.setAuthUser({  
      firstName: '',
      lastName: '',
      admin: false,
      image : '',
      location: '',
      team: '',
      role: ''});
      console.log('LOGGING OUT')
      history.push('/')
  };

  
  const isAdmin = context.authUser.admin;

return (
<div>
  <UserPrivateProfile /> 
  {isAdmin &&
  <AdminForms/>}
    <button onClick={handleLogOut}>LOGOUT</button>
</div>

)
}

export default Profile;
