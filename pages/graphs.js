import Navbar from '@/components/Navbar';
import HeatMap from '@/components/Heatmap';
import Bars from '@/components/Bars';
import getDays from '@/utils/getDays';
import { getISODay } from 'date-fns';

import { useData } from '@/lib/data';
import getMedian from '@/utils/getMedian';
import getAverage from '@/utils/getAverage';
import calendarize from '@/utils/calendarize';
import sortByKeys from '@/utils/sortByKeys';
import trimZeros from '@/utils/trimZeros';
import toPercentage from '@/utils/toPercentage';
import { millisToDays } from '@/utils/dates';

const Graphs = () => {
  const { user, progressions, reviews } = useData();

  // todo: this code needs to be more readable
  // from dashboard code
  let prog = [...new Map(progressions.map((x) => [x.level, x])).values()];
  prog = prog.filter((p) => p.level <= user.level);
  prog[prog.length - 1].end = new Date().toISOString();

  const diffs = prog
    .slice(0, -1)
    .map((p) => new Date(p.end).getTime() - new Date(p.start).getTime());
  const median = getMedian(diffs);
  const average = getAverage(diffs);
  const medianInDays = median / 1000 / 60 / 60 / 24;
  const averageInDays = average / 1000 / 60 / 60 / 24;

  prog = prog.map(({ level, start, end }) => {
    return { level, duration: getDays(start, end) };
  });

  let bins = {};
  reviews.forEach((review) => {
    const { day, week, year } = calendarize(review.timestamp);

    if (!bins[year]) {
      bins[year] = [...Array(53)].map((e) => Array(7).fill(0));

      const jan1 = new Date(Date.UTC(year, 0, 1));
      const dec31 = new Date(Date.UTC(year, 11, 31));

      bins[year][0] = bins[year][0].fill(null, 0, getISODay(jan1) - 1);
      bins[year][52] = bins[year][52].fill(null, getISODay(dec31));
    }

    bins[year][week - 1][day - 1] += 1;
  });

  let flat = Object.values(sortByKeys(bins))
    .flat(3)
    .filter((e) => e !== null);
  flat = trimZeros(flat);

  let currStreak = 0;
  let maxStreak = 0;
  let daysLearned = 0;
  let totalReviews = 0;
  flat.forEach((n) => {
    if (n > 0) {
      totalReviews += n;
      daysLearned += 1;
      currStreak += 1;
      if (currStreak > maxStreak) maxStreak = currStreak;
    } else {
      currStreak = 0;
    }
  });

  const heatmapStats = {
    'Current Streak': currStreak,
    'Longest Streak': maxStreak,
    Attendance: toPercentage(daysLearned / flat.length),
    'Daily Average': Math.round(totalReviews / daysLearned),
  };

  const m = millisToDays(median);
  const a = millisToDays(average);
  const barStats = {
    Median: `${m.days} days ${m.hours} hours ${m.minutes} minutes`,
    Average: `${a.days} days ${a.hours} hours ${a.minutes} minutes`,
  };

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="flex-grow flex flex-col justify-around items-center px-20 py-10">
        <Bars
          progressions={prog}
          median={medianInDays}
          average={averageInDays}
          stats={barStats}
        />
        <HeatMap data={bins} stats={heatmapStats} />
      </div>
    </div>
  );
};

export default Graphs;
