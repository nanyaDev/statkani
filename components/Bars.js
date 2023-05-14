import { useState } from 'react';
import { Group } from '@visx/group';
import { Bar, Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';

// todo: make this responsive
const Bars = ({ progressions, median, average, stats }) => {
  const [zoom, setZoom] = useState(true);

  const xMax = 53 * 18; // * from heatmap
  const yMax = 7 * 18 * 1.5; // * 1.5 factor

  // ? memoize?
  const xScale = scaleBand({
    domain: zoom
      ? progressions.map((d) => d.level)
      : Array.from({ length: 60 }, (_, i) => i + 1),
    range: [0, xMax],
    padding: 0.1,
  });

  const yScale = scaleLinear({
    domain: [0, average * 2], // * what about outliers
    range: [yMax, 0],
    round: true,
  });

  const xPoint = (d) => xScale(d.level);
  const yPoint = (d) => yScale(d.duration);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-gray-1 pl-8">
        <div className="flex items-center space-x-4 text-sm">
          {Object.entries(stats).map(([key, value]) => (
            // <span key={key}>
            //   {key}: {value}
            // </span>
            <span key={key}>
              <span className="">{key}: </span>
              <span className="text-white">{value}</span>
            </span>
          ))}
        </div>
        <button className="font-semibold" onClick={() => setZoom((p) => !p)}>
          {zoom ? <MdZoomOut size={24} /> : <MdZoomIn size={24} />}
        </button>
      </div>
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
            to={{
              x: xScale(zoom ? progressions.length : 60) + xScale.bandwidth(),
              y: yScale(median),
            }}
          />
          <AxisLeft
            scale={yScale}
            top={5}
            left={-5}
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
            numTicks={zoom ? progressions.length : 60}
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
    </div>
  );
};

export default Bars;
