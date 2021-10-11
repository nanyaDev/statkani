import { getDay, getWeek, format } from 'date-fns';

export const getMonthTicks = (year) => {
  let ticks = [];

  for (let i = 0; i <= 11; i++) {
    const tick = getWeek(new Date(year, i, 1), { weekStartsOn: 1 });
    ticks.push(tick - 1);
  }

  return ticks;
};

export const indexToDate = (index, year) => {
  let offset = getDay(year, 0, 1);
  if (offset === 0) offset === 7;
  offset -= 1;

  const date = new Date(year, 0, index - offset);
  return format(date, 'MMMM d');
};

export const millisToDays = (millis) => {
  let ms = millis;

  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  ms = ms % (1000 * 60 * 60 * 24);

  const hours = Math.floor(ms / (1000 * 60 * 60));
  ms = ms % (1000 * 60 * 60);

  const minutes = Math.round(ms / (1000 * 60));
  ms = ms % (1000 * 60);

  return { days, hours, minutes };
};
