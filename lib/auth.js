import { useState, useContext, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cookieToken = Cookies.get('token');

    if (cookieToken) {
      setToken(cookieToken);
    }
  }, []);

  const signin = async (apiToken) => {
    const response = await fetch('https://api.wanikani.com/v2/user', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!response.ok) throw Error(response.statusText);

    Cookies.set('token', apiToken);
    setToken(apiToken);
    router.push('/dashboard');
  };

  const signout = async () => {
    Cookies.remove('token');
    setToken(null);
    router.push('/');
  };

  const value = { token, signin, signout };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
