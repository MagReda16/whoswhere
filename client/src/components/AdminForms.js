import React, { useState } from "react";
import './AdminForms.css';
import { useAuth } from "../lib/context/authContext";
import apiService from "../utils/ApiService";


function AdminForms() {

  const context = useAuth();

  const [ taskForm, setTaskForm ] = useState( {tasks: ''} )

  const updateUserTasks = async (taskForm) => {
      const token = localStorage.getItem('accessToken');
      await apiService.updateTasks(taskForm, token);
    
    };
  const handleChange = (e) => {
      setTaskForm({...taskForm, [e.target.name]: e.target.value})
    };

  const handleSubmit = async (e) => {
     e.preventDefault();
     await updateUserTasks(taskForm)
      context.setAuthUser({
        firstName: context.authUser.firstName,
        lastName: context.authUser.lastName,
        role: context.authUser.role,
        admin: context.authUser.admin,
        team: context.authUser.team,
        image: context.authUser.image,
        location: context.authUser.location,
        tasks: [...context.authUser.tasks, (taskForm.tasks)]
    });
    setTaskForm({tasks: ''});
  };
 
  return (
    <div className="add_task_wrapper">
      <div className="add_task_container">
      <p>Let your team know what's important today</p>
        <form className="add_task_form" onSubmit={handleSubmit} >
          <input className="add_task" name="tasks" placeholder="Add a task..." value={taskForm.tasks} onChange={handleChange}/>
          <input className="submit_task_btn" type='submit' name='update' value='Add Task' />
        </form> 
      </div>
    </div>
  );
};

export default AdminForms;