import UserList from "../domains/Team/UserList";
import { useTeam } from "../lib/hooks/useTeam";
import "./Team.css";
import CheckInChart from "../domains/Team/CheckInChart";

const Team = () => {

const { data } = useTeam();

  console.log(data)
  return (
    <div>
      <h2 className="team_name">{data && data.name} Team</h2>
      <div className="public_profile_page">
        {data && <UserList data={data}/>}
        <CheckInChart />
      </div>
    </div>
  );
}

export default Team;
