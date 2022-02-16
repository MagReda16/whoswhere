import React from "react";
import moment from 'moment';
import './Task.css';

const Task = ({ task, date, urgent, veryUrgent }) => {

  const displayDate = moment(date).format("MMM Do, YYYY");


  console.log(displayDate)

  return (
    <div className="task_wrapper">
      <div className="task" >
        {task}
        <p>Due: {displayDate}</p>
        </div>
        {urgent && '!'}{veryUrgent && '!!'}
    </div>
  );
}

export default Task;