import React from "react";
import {useUsers} from '../lib/context/usersContext'
import {useAuth} from '../lib/context/authContext';
import UserPublicProfile from '../components/UserPublicProfile';

function Team () {

  const context = useUsers();
  const authContext = useAuth();
  const currentUserRole = authContext.authUser.role;

  //option 1:
    //remove teams model, allow user to write in their team on registration
    //team as a string on user model
    //check on frontend if authuser team matches other user teams
    //drawbacks: no reason for admin???????
    
  //option 2 (initial plan):
    //admin can create team
    //create team form will include: title, owner which will be populated by creator user data
    //admin can add members
    //members will be an array on teams model, populated by added member user data
    //add members will search member by username (get?) 
    //on add member submit, call function to add to team members array (post?)

  return (
    <div>
      <h2>Teams page!!</h2>
    {context.users.map(user => {
      if (currentUserRole === user.role) {
      return <UserPublicProfile key={user._id} firstName={user.firstName} 
      lastName={user.lastName}
      role={user.role}
      location={user.location}
      team={user.team}/>
      }}
    )}
    </div>
  )
}

export default Team;