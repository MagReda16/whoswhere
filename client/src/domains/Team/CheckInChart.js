import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTeam } from '../../lib/hooks/useTeam';
import './CheckInChart.css';

Chart.register(ArcElement, Tooltip);

const CheckInChart = () => {

  const { data, isLoading } = useTeam();

  if (isLoading) return <p>Loading...</p>

  const checkedIn = data.members.map(member => member.checkedIn)
  const checked = checkedIn.filter(status => status === true)
  const notchecked = checkedIn.filter(status => status === false);


  const chartData = {
    labels: ['Checked In', 'Not present'],
    datasets: [
      {
        data: [checked.length, notchecked.length],
        backgroundColor: ['#BFDAB2', '#C4C4C4']
      },
    ],
  };
  return (
    <div className='chart_container'>
      <h3>Checked in:</h3>
      <Pie
        data={chartData}
        width={30}
        height={30}
      />
    </div>
  )
}

export default CheckInChart;
