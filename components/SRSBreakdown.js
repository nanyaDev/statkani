import React from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import useToggle from '@/lib/useToggle';

const SRSBreakdown = ({ stages }) => {
  const [symmetry, toggleSymmetry] = useToggle(true);

  // prettier-ignore
  const getColor = scaleOrdinal({
    domain: [ 'Apprentice', 'Guru', 'Master', 'Enlightened', 'Burned', 'Unknown' ],
    range: [ '#f300a3', '#a035ba', '#4765df', '#0098e6', '#494949', '#c1c1c1' ],
  });

  const size = 400;

  return (
    <svg width={size} height={size}>
      <Group top={size / 2} left={size / 2}>
        <Pie
          data={stages}
          pieValue={(d) => (symmetry ? d.value : 1)}
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
                />
              ))}
            </Group>
          )}
        </Pie>
      </Group>
    </svg>
  );
};

const PieIndividual = ({ arc, path, handleClick, fill }) => {
  // sa -> startAngle, ea -> endAngle
  const sa = useMotionValue(0);
  const ea = useMotionValue(0);
  const d = useTransform([sa, ea], ([sa, ea]) =>
    path({ ...arc, startAngle: sa, endAngle: ea })
  );

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
    </g>
  );
};

export default SRSBreakdown;
