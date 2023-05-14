import React, { useState, useContext, createContext, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const cacheToken = window.localStorage.getItem('apiToken');

    if (cacheToken) {
      setToken(cacheToken);
    }
  }, []);

  const signin = async (apiToken) => {
    const response = await fetch('https://api.wanikani.com/v2/user', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!response.ok) throw Error(response.statusText);

    window.localStorage.setItem('apiToken', apiToken);
    setToken(apiToken);
  };

  const signout = async () => {
    window.localStorage.clear();
    setToken(null);
  };

  const value = { token, signin, signout };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
