import { intervalToDuration, formatDuration } from 'date-fns';

const getDuration = (s, e, format, zero = false) => {
  const start = new Date(s);
  const end = e === 'now' ? new Date() : new Date(e); // ? is there a better way that 'now'

  const duration = intervalToDuration({ start, end });
  const formatted = formatDuration(duration, { format, zero });

  return formatted;
};

export default getDuration;
