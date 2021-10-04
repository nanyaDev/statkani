import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

// todo: make this responsive
const Bars = () => {
  const xMax = 53 * 18; // * from heatmap
  const yMax = 7 * 18;

  // ? memoize?
  const xScale = scaleBand({
    domain: barData.map((d) => d.level),
    range: [0, xMax],
    round: true,
    padding: 0.1,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...barData.map((d) => +d.duration))],
    range: [yMax, 0],
    round: true,
  });

  const xPoint = (d) => xScale(d.level);
  const yPoint = (d) => yScale(d.duration);

  return (
    <svg width={xMax + 30} height={yMax + 30}>
      <Group left={30}>
        {barData.map((d) => {
          return (
            <Bar
              key={`bar-${d.level}`}
              x={xPoint(d)}
              y={yPoint(d)}
              width={xScale.bandwidth()}
              height={yMax - yPoint(d)}
              fill="#A100F1"
            />
          );
        })}
        <AxisLeft
          scale={yScale}
          top={-5}
          left={5}
          hideTicks
          hideAxisLine
          numTicks={5}
          tickLabelProps={() => ({
            dy: '0.5em',
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 10,
            textAnchor: 'middle',
          })}
        />
        <AxisBottom
          scale={xScale}
          top={yMax - 5}
          hideTicks
          hideAxisLine
          numTicks={barData.length}
          tickLabelProps={() => ({
            dy: '0.5em',
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: 10,
            textAnchor: 'middle',
          })}
        />
      </Group>
    </svg>
  );
};

export default Bars;

export const barData = [
  { level: 1, duration: 2000 },
  { level: 2, duration: 149 },
  { level: 3, duration: 278 },
  { level: 4, duration: 425 },
  { level: 5, duration: 1270 },
  { level: 6, duration: 228 },
  { level: 7, duration: 201 },
  { level: 8, duration: 609 },
  { level: 9, duration: 696 },
  { level: 10, duration: 15 },
  { level: 11, duration: 77 },
  { level: 12, duration: 402 },
  { level: 13, duration: 240 },
  { level: 14, duration: 674 },
  { level: 15, duration: 750 },
  { level: 16, duration: 192 },
  { level: 17, duration: 9 },
  { level: 18, duration: 598 },
  { level: 19, duration: 15 },
  { level: 20, duration: 77 },
  { level: 21, duration: 402 },
  { level: 22, duration: 240 },
  { level: 23, duration: 674 },
  { level: 24, duration: 750 },
  { level: 25, duration: 192 },
  { level: 26, duration: 9 },
  { level: 27, duration: 598 },
  { level: 28, duration: 15 },
  { level: 29, duration: 77 },
  { level: 30, duration: 402 },
  { level: 31, duration: 240 },
  { level: 32, duration: 674 },
  { level: 33, duration: 750 },
  { level: 34, duration: 192 },
  { level: 35, duration: 9 },
  { level: 36, duration: 598 },
  { level: 37, duration: 15 },
  { level: 38, duration: 77 },
  { level: 39, duration: 402 },
  { level: 40, duration: 240 },
  { level: 41, duration: 674 },
  { level: 42, duration: 750 },
  { level: 43, duration: 192 },
  { level: 44, duration: 9 },
  { level: 45, duration: 598 },
];
