import React, {useState} from 'react';
import AdminForms from '../domains/Tasks/AdminForms';
import TaskList from '../domains/Tasks/TaskList';
import { useAuth } from '../lib/context/authContext';
import { useTeam } from "../lib/hooks/useTeam";
import './Tasks.css'


const Tasks = () => {
  const { loggedUser } = useAuth();
  const { data } = useTeam();

  if (!loggedUser) return <h3>Loading...</h3>

  return (
    <div className='task_page_container'>
      <h2>Tasks</h2>
      <div className='task_list_container'>
      {loggedUser.admin && <AdminForms data={data}/>}
      <TaskList data={data}/>
      </div>
    </div>
  )
}


export default Tasks;