import React, { useState, useContext, createContext } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = async (apiToken) => {
    const response = await fetch('https://api.wanikani.com/v2/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) throw Error(response.statusText);

    const { username, level } = await response.json();
    setUser({ username, level });
  };

  const signout = async () => {
    setUser(false);
  };

  const value = { user, signin, signout };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
