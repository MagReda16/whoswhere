import { useState } from "react";
import UserList from "../domains/Team/UserList";
import TaskList from "../domains/Team/TaskList";
import TaskButton from "../domains/Team/TaskButton";
import { useTeam } from "../lib/hooks/useTeam";
import "./Team.css";

const Team = () => {
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
        {data && <UserList data={data}/>}
        <div className="task_wrapper">
          <h3>Today's Top Tasks</h3>
          <TaskButton taskDisplay={taskDisplay} handleClick={handleClick}/>
          <TaskList data={data} taskDisplay={taskDisplay}/>
        </div>
      </div>
    </div>
  );
}

export default Team;
