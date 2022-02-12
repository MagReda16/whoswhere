import React, { createContext } from 'react';

export const UsersContext = createContext();


export const UsersProvider = ({value, children}) => {

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => React.useContext(UsersContext);

