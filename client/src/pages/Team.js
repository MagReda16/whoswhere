import { useState } from "react";
import UserPublicProfile from "../components/UserPublicProfile";
import Tasks from "../components/Tasks";
import { useTeam } from "../lib/hooks/useTeam";
import "./Team.css";

function Team() {
  // const { loggedUser } = useAuth;
  const [taskDisplay, setTaskDisplay] = useState(false);
  const { data } = useTeam();

  const handleClick = () => {
    setTaskDisplay(!taskDisplay);
  };

  return (
    <div>
      <h2>
        <span className="team_name">{data && data.name}</span> Team
      </h2>
      <div className="public_profile_page">
        <div className="profile_card">
          {data &&
            data.members.map((user) => {
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
            {data && data.tasks.length > 0 ? (
              data.tasks.map((task, id) => {
                return <Tasks key={id} task={task} />;
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
