import { useContext, createContext, useEffect, useState } from 'react';

import { useAuth } from './auth';
import { setToken, fetchEndpoint } from '@/lib/api';

const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [progressions, setProgressions] = useState([]);
  const [reviewStats, setReviewStats] = useState([]);

  useEffect(() => {
    (async () => {
      setToken(token);
      setUser((await fetchEndpoint('user'))[0]);
      setAssignments(await fetchEndpoint('assignments'));
      setProgressions(await fetchEndpoint('level_progressions'));
      setReviewStats(await fetchEndpoint('review_statistics'));
    })();
  }, [token]);

  const value = { user, assignments, progressions, reviewStats };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
