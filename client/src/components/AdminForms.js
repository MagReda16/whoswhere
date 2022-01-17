import React from "react";
import './AdminForms.css';
import { useAuth } from '../lib/context/authContext'
import {useState} from 'react';
import apiService from "../utils/ApiService";
// import { useUsers } from '../lib/context';


function AdminForms(props) {

  const context = useAuth();
  const user = context.authUser;
  const [ teamForm, setTeamForm ] = useState({title:''})

  const handleChange = (e) => {
    setTeamForm({...teamForm, [e.target.name] :e.target.value})
  }

  const handleSubmit = (e) => {
    console.log('trying....')
    e.preventDefault();
    try {
      apiService.createTeam(teamForm);
      console.log('team created!!')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="create_team_container">
      <form className="create_team_form" onSubmit={handleSubmit}>
      <input
         type="text" 
          name="title"
          placeholder="Team title..." 
          value={teamForm.title} 
          onChange={handleChange}/>
      </form>
      <input type="submit" name="submit" value="Create Team"/>
    </div>
  )
}

export default AdminForms;