import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import apiService from "../../lib/utils/ApiService";
import { useAuth } from "../../lib/context/authContext";
import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const history = useHistory();

  const { setLoggedUser } = useAuth();

  const [logInForm, setLogInForm] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLogInForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiService.logInUser(logInForm);
      if (data.error) throw new Error(data.message);
      localStorage.setItem("accessToken", data.accessToken);
      const user = await apiService.showProfile();
      setLoggedUser(user);
      history.push("/profile");
    } catch (error) {
      setError(error);
      setLogInForm(initialState);
    }
  };

  return (
    <div>
      {error && <div> {error.message} </div>}
      <div>
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email..."
            value={logInForm.email}
            onChange={handleChange}
            required
          />
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Enter password..."
            value={logInForm.password}
            onChange={handleChange}
            required
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
