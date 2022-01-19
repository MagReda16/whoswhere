import React from "react";
import {useState} from 'react';
import './Tasks.css';

function Tasks (props) {

  return (
    <div className="task_wrapper">
      <div className="task" >
      {props.info}
      </div>
    </div>
  );
}

export default Tasks;