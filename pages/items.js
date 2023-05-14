import { useState } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

import Navbar from '@/components/Navbar';
import jlpt from '@/utils/jlpt';
import { useData } from '@/lib/data';
import toPercentage from '@/utils/toPercentage';

const Items = () => {
  const { subjects, assignments } = useData();
  const [mode, setMode] = useState('jlpt');
  const [size, setSize] = useState(2);

  const wk = subjects.reduce(
    (acc, curr) => {
      if (curr.type === 'kanji') {
        const i = Math.floor((curr.level - 1) / 10);
        acc[i].push(curr.char);
      }

      return acc;
    },
    [[], [], [], [], [], []]
  );

  // prettier-ignore
  const wanikani = { '快 Pleasant': wk[0], '苦 Painful': wk[1], '死 Death': wk[2],
                     '地獄 Hell': wk[3], '天国 Paradise': wk[4], '現実 Reality': wk[5] };

  // prettier-ignore
  const stageToColor = { 0: '#c1c1c1', 1: '#f300a3', 2: '#f300a3', 3: '#f300a3', 4: '#f300a3',
                         5: '#a035ba', 6: '#a035ba', 7: '#4765df', 8: '#0098e6', 9: '#e6ad12' };

  // todo: is there a way to do this with only 2 reduces
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
  }, {});

  const kanjiToDisplay = mode === 'jlpt' ? jlpt : wanikani;

  // prettier-ignore
  const sizeToText = { 0: 'text-sm', 1: 'text-base', 2: 'text-lg', 3: 'text-xl' };
  const sizeNames = { 0: 'XS', 1: 'SM', 2: 'MD', 3: 'LG' };
  const text = sizeToText[size];

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="self-center w-full max-w-4xl flex-grow flex flex-col space-y-6 my-8">
        <div className="flex justify-between items-center text-white">
          <div className="flex space-x-4 items-center text-lg">
            <button onClick={() => setMode('jlpt')} className="font-bold">
              JLPT
            </button>
            <button onClick={() => setMode('wanikani')} className="font-bold">
              WANIKANI
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button disabled={size <= 0} onClick={() => setSize((p) => p - 1)}>
              <BiMinus size={20} />
            </button>
            <span className="font-bold">{sizeNames[size]}</span>
            <button disabled={size >= 3} onClick={() => setSize((p) => p + 1)}>
              <BiPlus size={20} />
            </button>
          </div>
        </div>
        {Object.entries(kanjiToDisplay).map(([level, kanji]) => (
          <Section
            key={`section-${level}`}
            level={level}
            kanji={kanji}
            colors={charToColor}
            stages={charToStage}
            text={text}
          />
        ))}
      </div>
    </div>
  );
};

const Section = ({ level, kanji, colors, stages, text }) => {
  const learnt = kanji.filter((k) => stages[k] >= 5).length;
  const total = kanji.length;
  const percentage = toPercentage(learnt / total);

  kanji.sort((a, b) => (stages[b] || 0) - (stages[a] || 0));

  return (
    <div className="flex flex-col space-y-4 text-gray-1">
      <div className="flex justify-between items-center text-sm">
        <h2 className="uppercase font-bold">{level}</h2>
        <div className="flex items-center space-x-4 font-bold">
          <span>{`${learnt} / ${total}`}</span>
          <span>{percentage}</span>
        </div>
      </div>
      <div className={`flex flex-wrap justify-between gap-1 ${text}`}>
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
