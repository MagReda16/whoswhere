import { useState } from "react";
import "./AdminForms.css";
import { useTeam } from "../../lib/hooks/useTeam";

const initialState = {
  task: ''
};

const AdminForms = () => {
  const { updateTeam } = useTeam()
  const [ taskForm, setTaskForm ] = useState(initialState);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTeam(taskForm)
    setTaskForm(initialState);
  };

  return (
  
      <div className="add_task_container">
        <p>Let your team know what's important today</p>
        <form className="add_task_form" onSubmit={handleSubmit}>
          <input
            className="add_task"
            name="task"
            placeholder="Add a task..."
            value={taskForm.task}
            onChange={handleChange}
            required
          />
          <input
            className="submit_task_btn"
            type="submit"
            name="update"
            value="Add Task"
          />
        </form>
      </div>
 
  );
}

export default AdminForms;
