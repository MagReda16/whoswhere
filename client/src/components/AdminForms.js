import { useState, useEffect } from "react";
import "./AdminForms.css";
import { useAuth } from "../lib/context/authContext";
import apiService from "../utils/ApiService";

function AdminForms() {
  const { setLoggedUser } = useAuth();

  const [taskForm, setTaskForm] = useState({ tasks: "" });

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      setTaskForm({ tasks: "" });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await apiService.updateTasks(taskForm);
    setLoggedUser(updatedUser);
    setTaskForm({ tasks: "" });
  };

  return (
    <div className="add_task_wrapper">
      <div className="add_task_container">
        <p>Let your team know what's important today</p>
        <form className="add_task_form" onSubmit={handleSubmit}>
          <input
            className="add_task"
            name="tasks"
            placeholder="Add a task..."
            value={taskForm.tasks}
            onChange={handleChange}
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
