import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UsersProvider } from './lib/context';
import apiService from './utils/ApiService';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Team from './pages/Team';
import NavBar from './navigation/NavBar';
import { AuthProvider } from './lib/context/authContext';


function App () {

  const [ users, setUsers ] = useState([]);
  const [ auth, setAuth ] = useState(null);
  // const [ token, setToken ] = useState('')

  // if (token) setAuth(true);
   
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken) => {
      const userInfo = await apiService.showProfile(accessToken);
      if (userInfo) {
        setAuth(userInfo);
      } else {
        console.log('NOPE WRONG AGAIN')
        alert('WHOOPS NOT A USER')
        //add logic to handle unauthorized user UI
      }
    }; 
    getProfile(accessToken);
  }, []);

  console.log(auth, 'auth')

  // const updateInfo = async () => {
  //   // const accessToken = localStorage.getItem('accessToken');
  //   const info = await apiService.getAllUsers();
  //   console.log(info)
  //     setUsers(info)   
  // };

  // useEffect(()=>{
  //   updateInfo()
  // }, [])
    

  return (
  <UsersProvider value={{users}} >
  <AuthProvider value={{
    auth:auth, 
    setAuth:setAuth
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
