const BASE_URL = "http://localhost:3001";

const apiService = {};

apiService.getAllUsers = async () => {
  return fetch(`${BASE_URL}/users`)
    .then((res) => res.json())
    .then((data) => data)
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

apiService.showProfile = (accessToken) => {
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

apiService.getAllTeams = async () => {
  return fetch(`${BASE_URL}/teams`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

apiService.updateProfile = (profileForm, accessToken) => {
  return fetch(`http://localhost:3001/profile/location`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileForm),
  });
};

apiService.updateTasks = (taskForm, accessToken) => {
  return fetch(`${BASE_URL}/profile/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(taskForm),
  });
};

apiService.logOut = () => {
  localStorage.removeItem("accessToken");
};

export default apiService;
