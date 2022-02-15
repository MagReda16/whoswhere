const API_URL = process.env.REACT_APP_API_URL;

const apiService = {};

apiService.registerUser = async (registerForm) => {
  try {
    const res = await fetch(`${API_URL}register`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { error: "500", message: "internal server error" };
  }
};

apiService.logInUser = async (logInForm) => {
  try {
    const res = await fetch(`${API_URL}login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInForm),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { error: "500", message: "Internal server error" };
  }
};

apiService.showProfile = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${API_URL}profile`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return { error: "500", message: "Internal server error" };
  }
};

apiService.updateLocation = async (profileForm) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${API_URL}profile/location`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileForm),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return { error: "500", message: "Internal server error" };
  }
};

apiService.addTask = async (taskForm) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${API_URL}team/task`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(taskForm),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return { error: "500", message: "Internal server error" };
  }
};

apiService.updateCheckin = async (checkinForm) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${API_URL}profile/checkin`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(checkinForm),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return { error: "500", message: "Internal server error" };
  }
};

apiService.logOut = () => {
  localStorage.removeItem("accessToken");
};

export default apiService;
