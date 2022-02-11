import '../../pages/Team.css'

const TaskButton = ({ handleClick, taskDisplay }) => {
  return (
    <button className="show_tasks" onClick={handleClick}>
      {taskDisplay ? "Hide Tasks" : "Show My Tasks"}
    </button>
  )
}

export default TaskButton;