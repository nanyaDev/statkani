import { differenceInSeconds, parseISO } from 'date-fns';

const getDays = (date1, date2) => {
  const diff = differenceInSeconds(parseISO(date2), parseISO(date1));
  return diff / 60 / 60 / 24;
};

export default getDays;
