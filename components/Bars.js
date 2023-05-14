import { useState } from 'react';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { AiOutlineCompress, AiOutlineExpand } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Bars = ({ progressions, median, stats }) => {
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
    domain: [0, median * 2.5],
    range: [yMax, 0],
    round: true,
  }).clamp(true);

  const xPoint = (d) => xScale(d.level);
  const yPoint = (d) => yScale(d.duration);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-gray-1 px-8">
        <div className="flex items-center space-x-4 text-sm">
          {Object.entries(stats).map(([key, value]) => (
            <span key={key}>
              <span className="">{key}: </span>
              <span className="text-white">{value}</span>
            </span>
          ))}
        </div>
        <button className="font-semibold" onClick={() => setZoom((p) => !p)}>
          {zoom ? (
            <AiOutlineExpand size={18} />
          ) : (
            <AiOutlineCompress size={18} />
          )}
        </button>
      </div>
      <div className="relative">
        <svg width={xMax + 60} height={yMax + 30}>
          <Group left={30} right={30}>
            {progressions.map((d) => (
              <>
                <motion.rect
                  key={`bar-${d.level}`}
                  initial={false}
                  animate={{ x: xPoint(d), width: xScale.bandwidth() }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                  y={yPoint(d)}
                  height={yMax - yPoint(d)}
                  fill={d.duration <= median ? '#A100F1' : '#FF00AA'}
                  onMouseMove={(e) => {
                    showTooltip({
                      tooltipData: d,
                      tooltipLeft: xPoint(d) + 30,
                      tooltipTop: localPoint(e).y,
                    });
                  }}
                  onMouseLeave={hideTooltip}
                />
                {d.duration > median * 2.5 && (
                  <svg
                    x={xPoint(d)}
                    y={15}
                    width={xScale.bandwidth()}
                    height={xScale.bandwidth() * 0.67}
                    viewBox="0 0 75 50"
                  >
                    <path
                      d="M0 26.0376V50.5L24.9135 26.0376L49.308 50.5L75 26.0376V0.5L49.308 26.0376L24.9135 0.5L0 26.0376Z"
                      className="fill-current text-bg"
                    />
                  </svg>
                )}
              </>
            ))}
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
            offsetTop={null}
            style={{
              ...defaultStyles,
              minWidth: 60,
              backgroundColor: '#11162D',
              color: 'white',
              transform: 'translateY(-100%)',
              whiteSpace: 'nowrap',
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
    </div>
  );
};

export default Bars;
