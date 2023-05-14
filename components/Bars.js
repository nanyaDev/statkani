import { Group } from '@visx/group';
import { Bar, Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

// todo: make this responsive
const Bars = ({ progressions, median, average }) => {
  const xMax = 53 * 18; // * from heatmap
  const yMax = 7 * 18 * 1.5; // * 1.5 factor

  // ? memoize?
  const xScale = scaleBand({
    domain: progressions.map((d) => d.level),
    range: [0, xMax],
    round: true,
    padding: 0.1,
  });

  const yScale = scaleLinear({
    // domain: [0, Math.max(...progressions.map((d) => +d.duration))],
    domain: [0, average * 2], // * what about outliers
    range: [yMax, 0],
    round: true,
  });

  const xPoint = (d) => xScale(d.level);
  const yPoint = (d) => yScale(d.duration);

  return (
    <svg width={xMax + 30} height={yMax + 30}>
      <Group left={30}>
        {progressions.map((d) => {
          return (
            <Bar
              key={`bar-${d.level}`}
              x={xPoint(d)}
              y={yPoint(d)}
              width={xScale.bandwidth()}
              height={yMax - yPoint(d)}
              fill={d.duration <= median ? '#A100F1' : '#FF00AA'}
            />
          );
        })}
        <Line
          className="stroke-current text-gray-1"
          from={{ x: xScale(1), y: yScale(median) }}
          to={{ x: xScale(47) + xScale.bandwidth(), y: yScale(median) }}
        />
        <AxisLeft
          scale={yScale}
          top={5}
          left={5}
          hideTicks
          hideAxisLine
          numTicks={5}
          tickLabelProps={() => ({
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
          numTicks={progressions.length}
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
