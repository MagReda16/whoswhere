import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [logIn, setLogIn] = useState(false);

  const handleClick = () => {
    setLogIn(!logIn);
  };

  return (
    <div className="home_page_container">
      <h3>welcome to whosWhere!</h3>
      {logIn ? <Login /> : <Register />}
      <button className="login_register" onClick={() => handleClick()}>
        {logIn ? "Not a user? Register here" : "Already a user? Sign in here"}
      </button>
    </div>
  );
}

export default Home;
