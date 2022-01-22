import { useEffect, useState } from "react";
import { useAuth } from "../lib/context/authContext";
import UserPublicProfile from "../components/UserPublicProfile";
import Tasks from "../components/Tasks";
import apiService from "../utils/ApiService";
import "./Team.css";
import { useTeamUsers } from "../lib/hooks/useTeamUsers";

function Team() {
  const { loggedUser } = useAuth();
  const [taskDisplay, setTaskDisplay] = useState(false);
  const [teamUsers, setTeamUsers] = useState([]);
  const {data, error, teamAdmin} = useTeamUsers();

  // if (!data) data = [];

  // const adminUser = data.filter((user) => user.admin);
  const adminTasks = teamAdmin ? teamAdmin.tasks : [];

  const getTeamMembers = async () => {
    const members = await apiService.getTeamUsers();
    setTeamUsers(members);
  };

  // useEffect(() => {
  //   getTeamMembers();
  // }, []);

  const handleClick = () => {
    setTaskDisplay(!taskDisplay);
  };

  return (
    <div>
      <h2>
        <span className="team_name">{loggedUser && loggedUser.team}</span> Team
      </h2>
      <div className="public_profile_page">
        <div className="profile_card">
          {data && data.map((user) => {
            return <UserPublicProfile key={user._id} user={user} />;
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
            {/* {adminTasks.length ? (
              adminTasks.map((task, id) => {
                return <Tasks key={id} info={task} />;
              })
            ) : (
              <h4>No Tasks!</h4>
            )} */}
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
