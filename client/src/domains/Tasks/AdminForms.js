import { useState } from "react";
import "./AdminForms.css";
import { useTeam } from "../../lib/hooks/useTeam";

const initialState = {
  task: '',
  due: '',
  urgent: false,
  veryUrgent: false
};

const AdminForms = () => {
  const { updateTeam } = useTeam()
  const [taskForm, setTaskForm] = useState(initialState);

  const handleChange = (e, valkey = "value") => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target[valkey] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTeam(taskForm)
    setTaskForm(initialState);
  };
 
  const today = new Date().toISOString().split('T')[0];

  return (

    <div className="add_task_container">
      <p>Add a task for your team</p>
      <form className="add_task_form" onSubmit={handleSubmit}>
        <input
          className="add_task"
          name="task"
          placeholder="Task..."
          value={taskForm.task}
          onChange={handleChange}
          required
        />
        <input
          className="add_task"
          name="due"
          type="date"
          min={today}
          value={taskForm.due}
          onChange={handleChange}
          required
        />
        <div className="urgent_tasks">
        <label htmlFor="urgent">Urgent?</label>
        <input
          name="urgent"
          type="checkbox"
          value={taskForm.urgent}
          onChange={(e) => handleChange(e, "checked")}
        />
        <label htmlFor="veryUrgent">Very urgent?</label>
        <input
          name="veryUrgent"
          type="checkbox"
          value={taskForm.veryUrgent}
          onChange={(e) => handleChange(e, "checked")}
        />
        </div>
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
