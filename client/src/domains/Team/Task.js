import React from "react";
import './Task.css';

const Task = ({task}) => {

  return (
    <div className="task_wrapper">
      <div className="task" >
      {task}
      </div>
    </div>
  );
}

export default Task;