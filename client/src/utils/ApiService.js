const BASE_URL = "http://localhost:3001";

const apiService = {};

apiService.getTeamUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`${BASE_URL}/users`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.registerUser = (registerForm) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerForm),
  }).then((res) => res.json());
};

apiService.logInUser = (logInForm) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInForm),
  }).then((res) => res.json());
};

apiService.showProfile = () => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.updateProfile = (profileForm) => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`http://localhost:3001/profile/location`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileForm),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error updating location", e));
};

apiService.updateTasks = (taskForm) => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`${BASE_URL}/profile/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(taskForm),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};

apiService.logOut = () => {
  localStorage.removeItem("accessToken");
};

export default apiService;
