import { useState } from 'react';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { indexToDate, getMonthTicks } from '@/utils/dates';

let tooltipTimeout;

const HeatMap = ({ data, stats }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  // prettier-ignore
  const { showTooltip, hideTooltip, tooltipLeft, tooltipTop, tooltipData } = useTooltip();

  // todo: get 53 and 7 from data
  const gap = 4;
  const sideLength = 18;
  const width = 53 * sideLength;
  const height = 7 * sideLength;

  const xScale = scaleLinear({
    domain: [0, 53],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, 7],
    range: [0, height],
  });

  const colorScale = scaleLinear({
    domain: [0, 200], // * fix this
    range: ['#11162D', '#00AAFF'],
  });

  const days = ['M', null, 'W', null, 'F', null, 'S'];
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const xTickValues = getMonthTicks(year);
  const xTickFormat = (_, i) => months[i];

  const yTickValues = [1, 2, 3, 4, 5, 6, 7];
  const yTickFormat = (_, i) => days[i];

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-gray-1 px-8">
        <div className="flex items-center space-x-4 text-sm">
          {Object.entries(stats).map(([key, value]) => (
            <span key={key}>
              <span className="">{key}: </span>
              <span className="text-blue">{value}</span>
            </span>
          ))}
        </div>
        <div className="ml-auto flex space-x-2 items-center">
          <button
            disabled={!Object.keys(data).includes((year - 1).toString())}
            onClick={() => setYear((p) => p - 1)}
            className="disabled:text-gray-700"
          >
            <MdChevronLeft size={24} />
          </button>
          <span className="font-semibold">{year}</span>
          <button
            disabled={!Object.keys(data).includes((year + 1).toString())}
            onClick={() => setYear((p) => p + 1)}
            className="disabled:text-gray-700"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="relative">
        <svg width={width + 60} height={height + 20}>
          <Group left={30} right={30}>
            <HeatmapRect
              data={data[year]}
              bins={(d) => d}
              count={(d) => d}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              binWidth={sideLength}
              binHeight={sideLength}
              gap={gap}
            >
              {(heatmap) =>
                heatmap.map((heatmapBins) =>
                  heatmapBins.map((bin) => (
                    <rect
                      key={`rect-${bin.row}-${bin.column}`}
                      width={bin.width}
                      height={bin.height}
                      x={bin.x}
                      y={bin.y}
                      rx={2}
                      ry={2}
                      fill={bin.color || '#050B20'}
                      fillOpacity={bin.opacity}
                      onMouseEnter={() => {
                        showTooltip({
                          tooltipData: bin,
                          tooltipLeft: bin.x + 30,
                          tooltipTop: bin.y,
                        });
                      }}
                      onMouseLeave={hideTooltip}
                    />
                  ))
                )
              }
            </HeatmapRect>
            <AxisLeft
              scale={yScale}
              top={-5}
              left={5}
              tickValues={yTickValues}
              tickFormat={yTickFormat}
              hideTicks
              hideAxisLine
              numTicks={7}
              tickLabelProps={() => ({
                dx: '-0.25em',
                dy: '0.25em',
                fill: 'white',
                fontSize: 10,
                textAnchor: 'end',
              })}
            />
            <AxisBottom
              scale={xScale}
              top={height - 10}
              left={8}
              tickValues={xTickValues}
              tickFormat={xTickFormat}
              hideTicks
              hideAxisLine
              numTicks={53}
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
              minWidth: 30,
              backgroundColor: '#11162D',
              color: 'white',
              transform: 'translateY(-100%)',
            }}
          >
            <div className="font-medium text-blue">
              {indexToDate(tooltipData.column * 7 + tooltipData.row, year)}
            </div>
            <div className="font-light">{`${tooltipData.count} reviews`}</div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default HeatMap;
