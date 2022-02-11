import { useState } from "react";
import apiService from "../../lib/utils/ApiService";
import "./AdminForms.css";

const initialState = {
  task: ''
};

const AdminForms = () => {
  const [taskForm, setTaskForm] = useState(initialState);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.addTask(taskForm);
    setTaskForm(initialState);
  };

  return (
    <div className="add_task_wrapper">
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
    </div>
  );
}

export default AdminForms;
