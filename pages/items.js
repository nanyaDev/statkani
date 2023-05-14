import Navbar from '@/components/Navbar';
import jlpt from '@/utils/jlpt';
import { useData } from '@/lib/data';
import toPercentage from '@/utils/toPercentage';

const Items = () => {
  const { subjects, assignments } = useData();

  // prettier-ignore
  const stageToColor = { 0: '#c1c1c1', 1: '#f300a3', 2: '#f300a3', 3: '#f300a3', 4: '#f300a3',
                         5: '#a035ba', 6: '#a035ba', 7: '#4765df', 8: '#0098e6', 9: '#e6ad12' };

  // todo: is there a way to do this with only 3 reduces
  const idToStage = assignments.reduce((acc, curr) => {
    if (curr.type === 'kanji') {
      acc[curr.id] = curr.stage;
    }

    return acc;
  }, {});

  const charToColor = subjects.reduce((acc, curr) => {
    if (curr.type === 'kanji') {
      const stage = idToStage[curr.id] || 0;
      const color = stageToColor[stage];
      acc[curr.char] = color;
    }

    return acc;
  }, {});

  const charToStage = subjects.reduce((acc, curr) => {
    if (curr.type === 'kanji') {
      acc[curr.char] = idToStage[curr.id];
    }

    return acc;
  });

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="self-center w-full max-w-4xl flex-grow flex flex-col items-center space-y-12 my-14">
        {Object.entries(jlpt).map(([level, kanji]) => (
          <Section
            key={`section-${level}`}
            level={level}
            kanji={kanji}
            colors={charToColor}
            stages={charToStage}
          />
        ))}
      </div>
    </div>
  );
};

const Section = ({ level, kanji, colors, stages }) => {
  const learnt = kanji.filter((k) => stages[k] > 0).length;
  const total = kanji.length;
  const percentage = toPercentage(learnt / total);

  return (
    <div className="flex flex-col space-y-2 text-gray-1">
      <div className="flex justify-between items-center space-y-2">
        <h2 className="text-lg font-bold capitalize">{level}</h2>
        <div className="flex space-x-4 font-light">
          <span>{`${learnt} / ${total}`}</span>
          <span>{percentage}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1 text-lg">
        {kanji.map((k) => (
          <span key={k} style={{ color: colors[k] || '#555' }}>
            {k}
          </span>
        ))}
        <span className="flex-grow"></span>
      </div>
    </div>
  );
};

export default Items;
