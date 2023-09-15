import Navbar from '@/components/Navbar';
import HeatMap from '@/components/Heatmap';
import Bars from '@/components/Bars';
import getDays from '@/utils/getDays';
import { getISODay, parseISO } from 'date-fns';

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
  let prog = [...new Map(progressions.map((x) => [x.level, x])).values()];
  // hotfix for wrong ordering when early levels are missing
  prog = prog.sort((a, b) => a.level - b.level);
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

  const bins = initializeBins(reviews);

  reviews.forEach((review) => {
    const { day, week, year } = calendarize(review.timestamp);

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
    <div className="grow flex flex-col bg-bg">
      <Navbar />
      <div className="grow flex flex-col justify-around items-center px-20 py-10">
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

/**
 * Initializes a "bins" object that will passed to the heatmap. "bins" is an object whose keys represent
 * years and whose values are 53x7 arrays (53 weeks in a year, 7 days in a week). The array values are
 * initalized to either 0 or null where null represents "invalid" days. For example, 1st Jan 2023 is a
 * Sunday which would mean the first 6 days (Mon-Sat) would be invalid.
 *
 * @param {Array} reviews
 * @returns {Object.<number, (number|null)[][]}
 */
const initializeBins = (reviews) => {
  let bins = {};

  const currentYear = new Date().getFullYear();
  const allYears = reviews.map((review) =>
    parseISO(review.timestamp).getFullYear()
  );
  const earliestYear = Math.min(...new Set(allYears));

  for (let year = earliestYear; year <= currentYear; year++) {
    bins[year] = [...Array(53)].map((e) => Array(7).fill(0));

    const jan1 = new Date(Date.UTC(year, 0, 1));
    const dec31 = new Date(Date.UTC(year, 11, 31));

    let janOffset = jan1.getUTCDay();
    if (janOffset === 0) janOffset = 7;

    let decOffset = dec31.getUTCDay();
    if (decOffset === 0) decOffset = 7;

    bins[year][0] = bins[year][0].fill(null, 0, janOffset - 1);
    bins[year][52] = bins[year][52].fill(null, decOffset);
  }

  return bins;
};

export default Graphs;
