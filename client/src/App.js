import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UsersProvider } from './lib/context';
import apiService from './utils/ApiService';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Team from './pages/Team';
import NavBar from './navigation/NavBar';
import { AuthProvider } from './lib/context/authContext';


function App () {

  const [ users, setUsers ] = useState([]);
  const [ authUser, setAuthUser ] = useState(null);
  // const [ token, setToken ] = useState('')

  // if (token) setAuth(true);
   
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    const getUser = async (accessToken) => {
        const userInfo = await apiService.showProfile(accessToken);
        if (userInfo) {
          setAuthUser(userInfo);
          console.log(userInfo)
      } else {
          console.log('NOPE WRONG AGAIN')
          // alert('WHOOPS NOT A USER')
      }
    }; 
    getUser(accessToken);
  }, []);

  // useEffect(()=> {
  //   // getUser(accessToken);
  // })
  console.log('AUTH USER:', authUser)

  const updateInfo = async () => {
    const info = await apiService.getAllUsers();
    console.log(info)
      setUsers(info)   
  };

  useEffect(()=>{
    updateInfo()
  }, [])

  console.log(users)
    

  return (
  <UsersProvider value={{users}} >
  <AuthProvider value={{
    authUser, 
    setAuthUser
    }}>
<Router>
  <NavBar />
  <main>
  <Switch>
    <Route path="/" exact> 
      <Home 
      />
    </Route>
    <Route path="/profile" exact>
      <Profile 
      />
    </Route>
    <Route path="/teams" exact>
      <Team />
    </Route>
    <Redirect to="/"/>
  </Switch> 
</main>
</Router>
  </AuthProvider>
  </UsersProvider>

  );
}

export default App;
