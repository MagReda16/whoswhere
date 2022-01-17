import React from "react";
import './AdminForms.css';
import { useAuth } from '../lib/context/authContext'
import {useState} from 'react';
import apiService from "../utils/ApiService";
// import { useUsers } from '../lib/context';


function AdminForms(props) {


  
  const [ teamForm, setTeamForm ] = useState({title:''})
  const [newMemberForm, setNewMemberForm ] = useState({firstName: ''})

  const handleNMChange = (e) => {
    setNewMemberForm({...newMemberForm, [e.target.name]: e.target.value})
  }

  const handleTFChange = (e) => {
    setTeamForm({...teamForm, [e.target.name] :e.target.value})
  }

  const handleNMSubmit = async (e) => {
    e.preventDefault();
    try{
      await apiService.findAUser(newMemberForm);
      console.log('searching...')
    } catch(error) {
      console.log(error)
    }
  }

  const handleTFSubmit = (e) => {
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
    <div>
      <div className="create_team_container">
        <form className="create_team_form" onSubmit={handleTFSubmit}>
      <input
         type="text" 
          name="title"
          placeholder="Team title..." 
          value={teamForm.title} 
          onChange={handleTFChange}/>
        </form>
        <input type="submit" name="submit" value="Create Team"/>
      </div>
    <div className="add_team_member_container">
    <form className="add_team_member_container" onSubmit={handleNMSubmit}>
      <input
         type="text" 
          name="firstName"
          placeholder="Member name..." 
          value={newMemberForm.firstName} 
          onChange={handleNMChange}/>
        </form>
        <input type="submit" name="submit" value="Search by name..."/>
    </div>
    </div>

  )
}

export default AdminForms;