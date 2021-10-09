import { useState } from 'react';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';
import { motion } from 'framer-motion';

import getDuration from '@/utils/getDuration';

let tooltipTimeout;

const Bars = ({ progressions, median, average, stats }) => {
  const [zoom, setZoom] = useState(true);
  // prettier-ignore
  const { showTooltip, hideTooltip, tooltipLeft, tooltipTop, tooltipData } = useTooltip();

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
    domain: [0, average * 2],
    range: [yMax, 0],
    round: true,
  }).clamp(true);

  const xPoint = (d) => xScale(d.level);
  const yPoint = (d) => yScale(d.duration);

  return (
    <div className="flex flex-col space-y-2 relative">
      <div className="flex justify-between items-center text-gray-1 pl-8">
        <div className="flex items-center space-x-4 text-sm">
          {Object.entries(stats).map(([key, value]) => (
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
      <svg width={xMax + 60} height={yMax + 30}>
        <Group left={30} right={30}>
          {progressions.map((d) => {
            return (
              <motion.rect
                key={`bar-${d.level}`}
                initial={false}
                animate={{ x: xPoint(d), width: xScale.bandwidth() }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                y={yPoint(d)}
                height={yMax - yPoint(d)}
                fill={d.duration <= median ? '#A100F1' : '#FF00AA'}
                onMouseMove={(e) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: xPoint(d) + 30,
                    tooltipTop: localPoint(e).y,
                  });
                }}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
              />
            );
          })}
          <Line
            className="stroke-current text-gray-1"
            from={{ x: 0, y: yScale(median) }}
            to={{ x: xMax, y: yScale(median) }}
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
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            minWidth: 60,
            backgroundColor: '#11162D',
            color: 'white',
          }}
        >
          <div
            className={`${
              tooltipData.duration <= median ? 'text-purple' : 'text-pink'
            } font-medium`}
          >{`Level ${tooltipData.level}`}</div>
          <div className="font-light">{`${Math.floor(
            tooltipData.duration
          )} days`}</div>
          <div className="font-light">{`${Math.round(
            (tooltipData.duration % 1) * 24
          )} hours`}</div>
        </Tooltip>
      )}
    </div>
  );
};

export default Bars;
