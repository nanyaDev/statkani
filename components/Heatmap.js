import { scaleLinear, scaleBand } from '@visx/scale';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { AxisBottom, AxisLeft } from '@visx/axis';

// todo: make this responsive, remove all the hardcoded numbers
const HeatMap = ({ data }) => {
  data = data[2021];

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
    domain: [0, 200], // ! fix this
    range: ['#050B20', '#00AAFF'],
  });

  const days = ['M', null, 'W', null, 'F', null, 'S'];
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const xTickValues = [0, 6, 10, 14, 18, 23, 27, 32, 36, 40, 45, 49];
  const xTickFormat = (_, i) => months[i];

  const yTickValues = [1, 2, 3, 4, 5, 6, 7];
  const yTickFormat = (_, i) => days[i];

  return (
    <svg width={width + 30} height={height + 20}>
      <Group left={30}>
        <HeatmapRect
          data={data}
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
                  fill={bin.color}
                  fillOpacity={bin.opacity}
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
  );
};

export default HeatMap;
