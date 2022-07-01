import { format } from 'date-fns';

import { useData } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Donut from '@/components/Donut';
import StatsBox from '@/components/StatsBox';
import getMedian from '@/utils/getMedian';
import getDuration from '@/utils/getDuration';
import toPercentage from '@/utils/toPercentage';

const Dashboard = () => {
  const { user, subjects, assignments, progressions, reviewStats } = useData();

  const stagesArr = assignments.reduce((acc, curr) => {
    acc[curr.stage] += 1;
    return acc;
  }, Array(10).fill(0));

  // prettier-ignore
  const stages = [
    { stage: 'Apprentice', value: stagesArr.slice(1, 5).reduce((a, b) => a + b) },
    { stage: 'Guru', value: stagesArr.slice(5, 7).reduce((a, b) => a + b) },
    { stage: 'Master', value: stagesArr[7] },
    { stage: 'Enlightened', value: stagesArr[8] },
    { stage: 'Burned', value: stagesArr[9] },
    { stage: 'Unknown', value: subjects.length - stagesArr.slice(1).reduce((a, b) => a + b) },
  ];

  let completion = [
    stagesArr.slice(5).reduce((a, b) => a + b) / subjects.length,
    stagesArr[9] / subjects.length,
  ];
  completion = completion.map((e) => toPercentage(e, 1));

  let dates = {};
  if (user && assignments.length && progressions.length) {
    // prettier-ignore
    const timeSince = getDuration(user.start, 'now', [ 'years', 'months', 'days' ]);

    // remove reset levels using 'first or last?' method from link below
    // cf. https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    let prog = [...new Map(progressions.map((x) => [x.level, x])).values()];
    // remove any extra reset levels and in progress levels
    prog = prog.filter((level) => level.end);

    if (prog.length) {
      const diffs = prog.map(
        (p) => new Date(p.end).getTime() - new Date(p.start).getTime()
      );

      let timePerLevel = getMedian(diffs);
      let timeLeft = timePerLevel * (60 - user.level);

      timePerLevel = getDuration(0, timePerLevel, ['months', 'days', 'hours']);
      timeLeft = getDuration(0, timeLeft, ['years', 'months', 'days']);

      dates = {
        'Start Date': format(new Date(user.start), 'd MMMM y'),
        'Time Since': timeSince,
        'Time Left': timeLeft,
        'Time/Level': timePerLevel,
      };
    }
  }

  // todo: this code is really gnarly, there should be a better way
  const initial = {
    radical: { mc: 0, mi: 0, rc: 0, ri: 0 },
    kanji: { mc: 0, mi: 0, rc: 0, ri: 0 },
    vocabulary: { mc: 0, mi: 0, rc: 0, ri: 0 },
  };
  let accuracy = reviewStats.reduce((a, c) => {
    a[c.type].mc += c.mc;
    a[c.type].mi += c.mi;
    a[c.type].rc += c.rc;
    a[c.type].ri += c.ri;

    return a;
  }, initial);
  // prettier-ignore
  Object.entries(accuracy).forEach(([key, value]) => {
    const {mc, mi, rc, ri} = value;
    const arr = [mc/(mc+mi), rc/(rc+ri), (mc+rc)/(mc + rc + mi + ri)]
    accuracy[key] = arr.map(v => toPercentage(v, 2))
  })

  accuracy.radical[1] = 'n/a';
  accuracy.radical[2] = accuracy.radical[0];

  const known = assignments.reduce(
    (acc, curr) => {
      if (curr.stage >= 5) acc[curr.type] += 1;
      return acc;
    },
    { radical: 0, kanji: 0, vocabulary: 0 }
  );

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className=" flex-grow flex justify-evenly items-center px-8 pb-8">
        <Donut stages={stages} completion={completion} />
        <StatsBox dates={dates} accuracy={accuracy} known={known} />
      </div>
    </div>
  );
};

export default Dashboard;
