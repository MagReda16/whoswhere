import React from "react";
import './Tasks.css';

function Tasks ({task}) {

  return (
    <div className="task_wrapper">
      <div className="task" >
      {task.task}
      </div>
    </div>
  );
}

export default Tasks;