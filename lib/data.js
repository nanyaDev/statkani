import { useContext, createContext } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from './auth';
import useEndpoint, { setToken } from '@/lib/useEndpoint';
import Loader from '@/components/Loader';

const dataContext = createContext();

export const ConditionalDataProvider = ({ children, exclude }) => {
  const router = useRouter();

  if (exclude.includes(router.pathname)) return children;

  return <DataProvider>{children}</DataProvider>;
};

const DataProvider = ({ children }) => {
  const { token } = useAuth();

  setToken(token);
  const [userP, user] = useEndpoint('user');
  const [subjectsP, subjects] = useEndpoint('subjects');
  const [assignmentsP, assignments] = useEndpoint('assignments');
  const [reviewsP, reviews] = useEndpoint('reviews');
  const [progressionsP, progressions] = useEndpoint('level_progressions');
  const [reviewStatsP, reviewStats] = useEndpoint('review_statistics');

  const progress = {
    user: userP,
    subjects: subjectsP,
    assignments: assignmentsP,
    reviews: reviewsP,
    progressions: progressionsP,
    reviewStats: reviewStatsP,
  };

  if (Object.values(progress).some((e) => e !== 1)) {
    return <Loader progress={progress} />;
  }

  // prettier-ignore
  const value = { user: user[0], subjects, assignments, reviews, progressions, reviewStats };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
