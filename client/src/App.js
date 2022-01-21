import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { UsersProvider } from "./lib/context";
import apiService from "./utils/ApiService";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import NavBar from "./navigation/NavBar";
import { AuthProvider } from "./lib/context/authContext";

function App() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  const updateInfo = async () => {
    const info = await apiService.getAllUsers();
    setUsers(info);
  };

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <UsersProvider value={{ users, setUsers, updateInfo }}>
      <AuthProvider>
        <Router>
          <NavBar />
          <main>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path="/teams" exact>
                <Team />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
      </AuthProvider>
    </UsersProvider>
  );
}

export default App;
