import React, { useState } from "react";
import apiService from "../../lib/utils/ApiService";
import { useAuth } from "../../lib/context/authContext";
import './CheckinForm.css'


const CheckinForm = ({ handleClose }) => {
  const initialState = { checkedIn: false}
  const { setLoggedUser } = useAuth();

  const [ checkinForm, setCheckinForm ] = useState(initialState)

  function handleChange(e, valkey = "value") {
    setCheckinForm({ ...checkinForm, [e.target.name]: e.target[valkey] });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await apiService.updateCheckin(checkinForm);
    setLoggedUser(updatedUser);
    handleClose()
  }

  return (
    <div className="checkin_wrapper">
      <form onSubmit={handleSubmit}>
      <button onClick={handleClose}>X</button>
        <h6>Check in to let your team know you're online</h6>
        <input
          className="checkedIn"
          id="checkedIn"
          type="checkbox"
          name="checkedIn"
          onChange={(e) => handleChange(e, "checked")}
        />
        <input
            className="submit"
            type="submit"
            name="checkinbtn"
            value="Check In"
            onClick={handleChange}
          />
      </form>
    </div>
  )
}

export default CheckinForm;