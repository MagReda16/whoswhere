import React from "react";
import { useState, useEffect } from "react";
import Header from "../navigation/Header";





function Team () {
  const [ team, setTeam ] = useState([]);
  
  return (
    <h2>
      <Header />
      Teams page!!</h2>
    //render individual public profiles here according to team
  
  )
}

export default Team;