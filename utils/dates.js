import { getWeek } from 'date-fns';

export const getMonthTicks = (year) => {
  let ticks = [];

  for (let i = 0; i <= 11; i++) {
    const tick = getWeek(new Date(year, i, 1), { weekStartsOn: 1 });
    ticks.push(tick - 1);
  }

  return ticks;
};
