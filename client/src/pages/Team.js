import UserList from "../domains/Team/UserList";
import { useTeam } from "../lib/hooks/useTeam";
import "./Team.css";
import CheckInChart from "../domains/Team/CheckInChart";

const Team = () => {

const { data, isLoading } = useTeam();
if (isLoading) return <h2>Loading...</h2>
const displayTeam =  data.name[0].toUpperCase() + data.name.substring(1)

  return (
    <div>
      <h2 className="team_name">Your Team: {data && displayTeam}</h2>
      <div className="public_profile_page">
        {data && <UserList data={data}/>}
        <CheckInChart />
      </div>
    </div>
  );
}

export default Team;
