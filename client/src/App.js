import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "./lib/utils/ApiService";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import NavBar from "./domains/Navbar/NavBar";
import { AuthProvider } from "./lib/context/authContext";
import Tasks from "./pages/Tasks";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      (async () => {
        const user = await apiService.showProfile();
        if (user) setLoggedUser(user);
      })();
    }
  }, []);

  return (
    <AuthProvider value={{ loggedUser, setLoggedUser }}>
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
            <Route path="/tasks" exact>
              <Tasks />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
