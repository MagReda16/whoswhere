import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [ authUser, setAuthUser ] = useState({
    firstName: '',
    lastName: '',
    admin: false,
    image : '',
    location: '',
    team: '',
    tasks: [],
    role: ''
})

  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);