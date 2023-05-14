import { useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import useToggle from '@/lib/useToggle';

const Donut = ({ stages, completion }) => {
  const [symmetry, toggleSymmetry] = useToggle(true);
  const [mode, setMode] = useState(0);

  const modes = ['completed', 'burned'];

  // prettier-ignore
  const getColor = scaleOrdinal({
    domain: [ 'Apprentice', 'Guru', 'Master', 'Enlightened', 'Burned', 'Unknown' ],
    range: ['#f300a3', '#a035ba', '#4765df', '#0098e6', '#e6ad12', '#c1c1c1'],
  });

  const size = 400;

  return (
    <svg width={size} height={size}>
      <Group top={size / 2} left={size / 2}>
        <Pie
          data={stages}
          pieValue={(d) => (symmetry ? 1 : d.value)}
          pieSort={null}
          outerRadius={size / 2}
          innerRadius={size / 4}
        >
          {({ arcs, path }) => (
            <Group>
              {arcs.map((arc, i) => (
                <PieIndividual
                  key={`pie-arc-${i}`}
                  arc={arc}
                  path={path}
                  handleClick={toggleSymmetry}
                  fill={getColor(arc.data.stage)}
                  symmetry={symmetry}
                />
              ))}
            </Group>
          )}
        </Pie>
      </Group>
      <text
        className="text-4xl font-black"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={11}
        fontWeight={300}
        onClick={() => setMode((p) => (p + 1) % 2)}
      >
        <tspan x="50%">{completion[mode]}</tspan>
        <tspan x="50%" dy="1.5em" className="text-base uppercase">
          {modes[mode]}
        </tspan>
      </text>
      <text
        textAnchor="end"
        x={size}
        y={size}
        fill="white"
        fontSize={11}
        fontWeight={300}
        pointerEvents="none"
      >
        Click the donut!
      </text>
    </svg>
  );
};

const PieIndividual = ({ arc, path, handleClick, fill, symmetry }) => {
  // sa -> startAngle, ea -> endAngle
  const sa = useMotionValue(arc.startAngle);
  const ea = useMotionValue(arc.endAngle);
  const d = useTransform([sa, ea], ([sa, ea]) =>
    path({ ...arc, startAngle: sa, endAngle: ea })
  );

  const [x, y] = path.centroid(arc);

  const labels = {
    hide: { opacity: 0, transition: { duration: 0 } },
    show: { opacity: 1, transition: { delay: 0.5 } },
  };

  return (
    <g>
      <motion.path
        d={d}
        style={{ sa, ea }}
        animate={{ sa: arc.startAngle, ea: arc.endAngle }}
        transition={{ duration: 0.5, transition: 'linear' }}
        onClick={handleClick}
        fill={fill}
      />
      <motion.text
        className="text-2xl font-black"
        variants={labels}
        animate={symmetry ? 'show' : 'hide'}
        display={symmetry ? null : 'none'}
        fill="white"
        x={x}
        y={y}
        textAnchor="middle"
        dy=".33em"
        pointerEvents="none"
        onClick={handleClick}
      >
        {arc.data.value}
      </motion.text>
    </g>
  );
};

export default Donut;
