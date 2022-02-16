import Task from './Task'

const TaskList = ({ data }) => {

  return (
    <div className='task_list'>
        <h5>Today's tasks</h5>
      {data && data.tasks.length > 0 ? (
        data.tasks.map((task, id) => {
          return <Task key={id} task={task.task} date={task.due} urgent={task.urgent} veryUrgent={task.veryUrgent} />;
        })
      ) : (
        <h4>No Tasks</h4>
      )}
    </div>
  )
}

export default TaskList;