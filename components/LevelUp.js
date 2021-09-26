import { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom } from '@visx/axis';

// todo: make this responsive
const LevelUp = () => {
  const xMax = 636;
  const yMax = 84;

  // ? why are these memoized for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        domain: barData.map((d) => d.letter),
        range: [0, xMax],
        round: true,
        padding: 0.4,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, Math.max(...barData.map((d) => +d.frequency))],
        range: [yMax, 0],
        round: true,
      }),
    [yMax]
  );

  // todo: merge with xScale
  const timeScale = useMemo(
    () =>
      scaleTime({
        domain: [Date.now(), Date.now() + 3 * 24 * 60 * 60 * 1000],
        range: [0, xMax],
        nice: true,
      }),
    [xMax]
  );

  const xPoint = (d) => xScale(d.letter);
  const yPoint = (d) => yScale(d.frequency);

  return (
    <svg width={xMax + 60} height={yMax + 30}>
      <Group left={20}>
        {barData.map((d) => {
          return (
            <Bar
              key={`bar-${d.letter}`}
              x={xPoint(d)}
              y={yPoint(d)}
              width={xScale.bandwidth()}
              height={yMax - yPoint(d)}
              fill="#e53e3e"
            />
          );
        })}
        <AxisBottom
          scale={timeScale}
          left={-20}
          top={yMax - 5}
          hideTicks
          hideAxisLine
          numTicks={8}
          tickLabelProps={() => ({ fontSize: 9, textAnchor: 'middle' })}
        />
      </Group>
    </svg>
  );
};

export default LevelUp;

export const barData = [
  { letter: 'A', frequency: 816 },
  { letter: 'B', frequency: 149 },
  { letter: 'C', frequency: 278 },
  { letter: 'D', frequency: 425 },
  { letter: 'E', frequency: 1270 },
  { letter: 'F', frequency: 228 },
  { letter: 'G', frequency: 201 },
  { letter: 'H', frequency: 609 },
  { letter: 'I', frequency: 696 },
  { letter: 'J', frequency: 15 },
  { letter: 'K', frequency: 77 },
  { letter: 'L', frequency: 402 },
  { letter: 'M', frequency: 240 },
  { letter: 'N', frequency: 674 },
  { letter: 'O', frequency: 750 },
  { letter: 'P', frequency: 192 },
  { letter: 'Q', frequency: 9 },
  { letter: 'R', frequency: 598 },
];
