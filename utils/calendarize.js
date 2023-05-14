import { getISODay, getWeek, getMonth, getYear, parseISO } from 'date-fns';

// todo: optimize this whole process
const calendarize = (timestamp) => {
  const date = parseISO(timestamp);

  // these are localized
  const day = getISODay(date);
  let week = getWeek(date, { weekStartsOn: 1 });
  const year = getYear(date);

  if (week === 1) {
    if (getMonth(date) !== 0) week = 53;
  }

  return { day, week, year };
};

export default calendarize;
