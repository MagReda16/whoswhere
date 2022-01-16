import React, { createContext } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({value, children}) => {


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);