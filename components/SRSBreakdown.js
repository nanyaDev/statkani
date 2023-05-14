import React, { useState } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const browsers = [
  { label: 'Google Chrome', usage: 48 },
  { label: 'Internet Explorer', usage: 24 },
  { label: 'Firefox', usage: 18 },
  { label: 'Safari', usage: 7 },
];

const initial = [
  { label: 'Google Chrome', usage: 38 },
  { label: 'Internet Explorer', usage: 34 },
  { label: 'Firefox', usage: 9 },
  { label: 'Safari', usage: 2 },
];

const SRSBreakdown = () => {
  const [data, setData] = useState(false);

  const size = 400;

  return (
    <svg width={size} height={size}>
      <Group top={size / 2} left={size / 2}>
        <Pie
          data={data ? initial : browsers}
          pieValue={(d) => d.usage}
          outerRadius={size / 2}
          innerRadius={size / 4}
          padAngle={0.01}
        >
          {(props) => <PieOverride setData={setData} {...props} />}
        </Pie>
      </Group>
    </svg>
  );
};

const PieOverride = ({ arcs, path, setData }) => {
  return (
    <Group>
      {arcs.map((arc, i) => (
        <PieIndividual
          key={`pie-arc-${i}`}
          arc={arc}
          path={path}
          setData={setData}
        />
      ))}
    </Group>
  );
};

const PieIndividual = ({ arc, path, setData }) => {
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
        onClick={() => setData((p) => !p)}
        fill="white"
      />
    </g>
  );
};

export default SRSBreakdown;
