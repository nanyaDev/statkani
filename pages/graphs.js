import Navbar from '@/components/Navbar';
import HeatMap from '@/components/Heatmap';
import Bars from '@/components/Bars';
import getDays from '@/utils/getDays';

import { useData } from '@/lib/data';
import getMedian from '@/utils/getMedian';
import getAverage from '@/utils/getAverage';
import calendarize from '@/utils/calendarize';

const Graphs = () => {
  const { progressions, reviews } = useData();

  // from dashboard code
  let prog = [...new Map(progressions.map((x) => [x.level, x])).values()];
  prog = prog.filter((level) => level.end); // * what about in progress level

  const diffs = prog.map(
    (p) => new Date(p.end).getTime() - new Date(p.start).getTime()
  );
  const median = getMedian(diffs) / 1000 / 60 / 60 / 24;
  const average = getAverage(diffs) / 1000 / 60 / 60 / 24;

  prog = prog.map(({ level, start, end }) => {
    return { level, duration: getDays(start, end) };
  });

  let bins = {};
  reviews.forEach((review) => {
    const { day, week, year } = calendarize(review.timestamp);

    if (!bins[year]) {
      bins[year] = [...Array(53)].map((e) => Array(7).fill(0));
    }

    bins[year][week - 1][day - 1] += 1;
  });

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="flex-grow flex flex-col justify-around items-center px-20 py-10">
        <Bars progressions={prog} median={median} average={average} />
        <HeatMap data={bins} />
      </div>
    </div>
  );
};

export default Graphs;
