import React from "react";
import {useUsers} from '../lib/context/usersContext'
import UserPublicProfile from '../components/UserPublicProfile';

function Team () {

  const context = useUsers();

  return (
    <div>
    {context.users.map((user)=> {
      return <UserPublicProfile key={user._id} firstName={user.firstName} 
      lastName={user.lastName}
      role={user.role}
      location={user.location}
      team={user.team}/>
    })}
      
      <h2>Teams page!!</h2>

    </div>
  )
}

export default Team;