import { useState } from "react";
import UserList from "../domains/Team/UserList";
import TaskList from "../domains/Team/TaskList";
import TaskButton from "../domains/Team/TaskButton";
import { useTeam } from "../lib/hooks/useTeam";
import "./Team.css";

const Team = () => {

const { data } = useTeam();

  console.log(data)
  return (
    <div>
      <h2 className="team_name">{data && data.name} Team</h2>
      <div className="public_profile_page">
        {data && <UserList data={data}/>}
      </div>
    </div>
  );
}

export default Team;
