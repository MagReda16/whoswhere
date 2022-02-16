import React from 'react';
import AdminForms from '../domains/Tasks/AdminForms';
import TaskList from '../domains/Tasks/TaskList';
import { useAuth } from '../lib/context/authContext';
import { useTeam } from "../lib/hooks/useTeam";
import './Tasks.css'


const Tasks = () => {
  const { loggedUser } = useAuth();
  const { data } = useTeam();
  const displayTeam =  data.name[0].toUpperCase() + data.name.substring(1)


  if (!loggedUser) return <h3>Loading...</h3>

  return (
    <div className='task_page_container'>
      <h2>Your team: {data&& displayTeam}</h2>
      <h5>Today's tasks</h5>
      <div className='task_list_container'>
      {loggedUser.admin && <AdminForms data={data}/>}
      <TaskList data={data}/>
      </div>
    </div>
  )
}


export default Tasks;