import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import apiService from "../utils/ApiService";
import { useAuth } from "../lib/context/authContext";
import "./Login.css";

const initialState = {
  username: "",
  password: "",
};

function Login() {
  const history = useHistory();

  const { setLoggedUser } = useAuth();

  const [logInForm, setLogInForm] = useState(initialState);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setLogInForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    try {
      const { accessToken } = await apiService.logInUser(logInForm);
      localStorage.setItem("accessToken", accessToken);
      const user = await apiService.showProfile();
      setLoggedUser(user);
      history.push("/profile");
    } catch (error) {
      setHasError(true);
      setLogInForm(initialState);
    }
  };

  return (
    <div className="login_page">
      {hasError && <div> ERROR </div>}
      <h2>Let's Log In!</h2>
      <div className="login_form_container">
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="username"
            type="text"
            name="username"
            placeholder="Enter username..."
            value={logInForm.username}
            onChange={handleChange}
          />
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Enter password..."
            value={logInForm.password}
            onChange={handleChange}
          />
          <input
            className="login_btn"
            type="submit"
            name="register"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
