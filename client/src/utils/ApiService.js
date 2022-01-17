const BASE_URL = 'http://localhost:3001';

const apiService = {};

apiService.getAllUsers = async () => {
 return fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(data => (data))
      .catch(err => console.log(err))
};

apiService.registerUser = (registerForm) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerForm)
  }).then((res)=> res.json());
}; 

apiService.logInUser = (logInForm) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logInForm)
  }).then((res)=> res.json());
};

apiService.showProfile = (accessToken) => {
  return fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Authorization' : `Bearer ${accessToken}`,
      'Content-Type' : 'application/json'
    },
  })
  // .then(res => JSON.stringify(res))
  .then(res => res.json())
  // .then(data => console.log(data))
  .catch(err => console.log(err))
};

apiService.getAllTeams = async () => {
  return fetch(`${BASE_URL}/teams`)
      .then(res => res.json())
      .then(data => (data))
      .catch(err => console.log(err))
};

apiService.updateProfile = (profileForm, accessToken) => {
  return fetch(`http://localhost:3001/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${accessToken}`
    },
    body: JSON.stringify(profileForm)
  })
}

apiService.createTeam = (teamForm) => {
  return fetch(`${BASE_URL}/teams`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(teamForm)
}).then((res)=> res.json());
}; 

apiService.logOut = (tokenName) => {
  localStorage.removeItem(tokenName);
  console.log('REMOVED TOKEN')
}


export default apiService;
