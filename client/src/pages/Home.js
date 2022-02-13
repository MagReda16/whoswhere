import React from "react";
import Register from "../domains/Register/Register";
import Login from "../domains/Login/Login";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [logIn, setLogIn] = useState(false);

  const handleClick = () => {
    setLogIn(!logIn);
  };

  return (
    <div className="home_page_container">
      {!logIn && 
      <p>a simple way to keep track of your team... without tracking your team</p>}
      {logIn ? <Register /> : <Login/>}
      <button className="login_register" onClick={handleClick}>
        {logIn ? "Already a user? Sign in here" : "New here? Register"}
      </button>
    </div>
  );
}

export default Home;
