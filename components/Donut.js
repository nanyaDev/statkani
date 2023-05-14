import React from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import useToggle from '@/lib/useToggle';

const Donut = ({ stages, completed }) => {
  const [symmetry, toggleSymmetry] = useToggle(true);

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
      >
        <tspan x="50%">{completed}</tspan>
        <tspan x="50%" dy="1.5em" className="text-base">
          COMPLETE
        </tspan>
      </text>
    </svg>
  );
};

const PieIndividual = ({ arc, path, handleClick, fill, symmetry }) => {
  // sa -> startAngle, ea -> endAngle
  const sa = useMotionValue(0);
  const ea = useMotionValue(0);
  const d = useTransform([sa, ea], ([sa, ea]) =>
    path({ ...arc, startAngle: sa, endAngle: ea })
  );

  const [x, y] = path.centroid(arc);

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
      {symmetry && (
        <motion.text
          className="text-2xl font-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          fill="white"
          x={x}
          y={y}
          textAnchor="middle"
          dy=".33em"
          onClick={handleClick}
        >
          {arc.data.value}
        </motion.text>
      )}
    </g>
  );
};

export default Donut;
