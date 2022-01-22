import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import apiService from "../utils/ApiService";
import { useAuth } from "../lib/context/authContext";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  role: "",
  team: "",
  admin: false,
};

function Register() {
  const history = useHistory();
  const { setLoggedUser } = useAuth();

  const [registerForm, setRegisterForm] = useState(initialState);

  const [hasError, setHasError] = useState(false);

  function handleChange(e, valkey = "value") {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target[valkey] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    try {
      await apiService.registerUser(registerForm);
      const { accessToken } = await apiService.logInUser({
        username: registerForm.username,
        password: registerForm.password,
      });
      localStorage.setItem("accessToken", accessToken);
      const user = await apiService.showProfile();
      setLoggedUser(user);
      history.push("/profile");
    } catch (error) {
      setHasError(true);
      setRegisterForm(initialState);
    }
  };

  return (
    <div className="register_page">
      {hasError && <div> ERROR </div>}
      <div className="register_title_container">
        <h4 className="register_title">Let's Sign Up!</h4>
      </div>
      <div className="register_form_container">
        <form className="register_form" onSubmit={handleSubmit}>
          <input
            className="firstname"
            type="text"
            name="firstName"
            placeholder="First name..."
            value={registerForm.firstName}
            onChange={handleChange}
          />
          <input
            className="lastname"
            type="text"
            name="lastName"
            placeholder="Last name..."
            value={registerForm.lastName}
            onChange={handleChange}
          />
          <input
            className="role"
            name="role"
            placeholder="Your role..."
            value={registerForm.role}
            onChange={handleChange}
          />
          <input
            className="team"
            name="team"
            placeholder="Your team name..."
            value={registerForm.team}
            onChange={handleChange}
          />
          <input
            className="reg_username"
            type="text"
            name="username"
            placeholder="Create username..."
            value={registerForm.username}
            onChange={handleChange}
          />
          <input
            className="reg_password"
            type="password"
            name="password"
            placeholder="Create password..."
            value={registerForm.password}
            onChange={handleChange}
          />
          <div className="checkbox_wrapper">
            <label htmlFor="admin" className="admin_checkbox">
              Are you a team manager?
            </label>
            <input
              className="admin"
              id="admin"
              type="checkbox"
              name="admin"
              onChange={(e) => handleChange(e, "checked")}
            />
          </div>
          <input
            className="submit"
            type="submit"
            name="register"
            value="Register"
            onClick={handleChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
