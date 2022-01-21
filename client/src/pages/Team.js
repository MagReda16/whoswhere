import React, { useEffect, useState } from "react";
import { useUsers } from "../lib/context/usersContext";
import { useAuth } from "../lib/context/authContext";
import UserPublicProfile from "../components/UserPublicProfile";
import Tasks from "../components/Tasks";
import apiService from "../utils/ApiService";
import "./Team.css";

function Team() {
  const userContext = useUsers();
  const authContext = useAuth();

  const usersArray = userContext.users;
  const currentUserTeam = authContext.authUser.team;
  const matchingTeam = usersArray.filter(
    (user) => user.team === currentUserTeam
  );
  const adminUser = matchingTeam.filter((user) => user.admin);
  const adminTasks = adminUser[0] ? adminUser[0].tasks : [];
  const accessToken = localStorage.getItem("accessToken");

  const getAuthUser = async (accessToken) => {
    const userInfo = await apiService.showProfile(accessToken);
    if (userInfo) {
      authContext.setAuthUser(userInfo);
    } else {
      console.log("NOPE WRONG AGAIN");
    }
  };

  useEffect(() => {
    getAuthUser(accessToken);
    userContext.updateInfo();
  }, []);

  const [taskDisplay, setTaskDisplay] = useState(false);

  const handleClick = () => {
    setTaskDisplay(!taskDisplay);
  };

  return (
    <div>
      <h2>
        <span className="team_name">{currentUserTeam}</span> Team
      </h2>
      <div className="public_profile_page">
        <div className="profile_card">
          {userContext.users.map((user) => {
            if (currentUserTeam === user.team) {
              return (
                <UserPublicProfile
                  key={user._id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  role={user.role}
                  location={user.location}
                  team={user.team}
                  admin={user.admin}
                />
              );
            }
          })}
        </div>
        <div className="task_wrapper">
          <h3>Today's Top Tasks</h3>
          <button className="show_tasks" onClick={handleClick}>
            {" "}
            {taskDisplay ? "Hide Tasks" : "Show My Tasks"}
          </button>
          <div
            className="task_list"
            style={{ display: taskDisplay ? "block" : "none" }}
          >
            {adminTasks.length > 0 ? (
              adminTasks.map((task) => {
                return <Tasks key={task} info={task} />;
              })
            ) : (
              <h4>No Tasks!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;

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
