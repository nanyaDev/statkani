import { scaleLinear, scaleBand } from '@visx/scale';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { AxisBottom, AxisLeft } from '@visx/axis';

// ? does using an svg grid like GitHub does result in better performance
// todo: make this responsive, remove all the hardcoded numbers
const HeatMap = () => {
  // todo: get 53 and 7 from data
  const sideLength = 13;
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
    domain: [0, 100], // ! fix this
    range: ['#eeedff', '#2b6cb0'],
  });

  const days = ['M', null, 'W', null, 'F', null, 'S'];
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const xTickValues = [0, 6, 10, 14, 18, 23, 27, 32, 36, 40, 45, 49];
  // ? what are these parameters
  const xTickFormat = (_, i) => months[i];

  const yTickValues = [1, 2, 3, 4, 5, 6, 7];
  const yTickFormat = (_, i) => days[i];

  return (
    <svg width={width + 30} height={height + 20}>
      <Group left={30}>
        <HeatmapRect
          data={binData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          binWidth={sideLength}
          binHeight={sideLength}
          gap={2}
        />
        <AxisLeft
          scale={yScale}
          top={-5}
          left={5}
          tickValues={yTickValues}
          tickFormat={yTickFormat}
          hideTicks
          hideAxisLine
          numTicks={7}
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
        />
      </Group>
    </svg>
  );
};

export default HeatMap;

const binData = [
  {
    bin: 0,
    bins: [
      { bin: 0, count: 48 },
      { bin: 1, count: 29 },
      { bin: 2, count: 74 },
      { bin: 3, count: 86 },
      { bin: 4, count: 35 },
      { bin: 5, count: 96 },
      { bin: 6, count: 55 },
    ],
  },
  {
    bin: 1,
    bins: [
      { bin: 0, count: 0 },
      { bin: 1, count: 33 },
      { bin: 2, count: 97 },
      { bin: 3, count: 24 },
      { bin: 4, count: 42 },
      { bin: 5, count: 55 },
      { bin: 6, count: 55 },
    ],
  },
  {
    bin: 2,
    bins: [
      { bin: 0, count: 53 },
      { bin: 1, count: 79 },
      { bin: 2, count: 18 },
      { bin: 3, count: 11 },
      { bin: 4, count: 16 },
      { bin: 5, count: 57 },
      { bin: 6, count: 4 },
    ],
  },
  {
    bin: 3,
    bins: [
      { bin: 0, count: 42 },
      { bin: 1, count: 28 },
      { bin: 2, count: 63 },
      { bin: 3, count: 90 },
      { bin: 4, count: 39 },
      { bin: 5, count: 21 },
      { bin: 6, count: 74 },
    ],
  },
  {
    bin: 4,
    bins: [
      { bin: 0, count: 1 },
      { bin: 1, count: 96 },
      { bin: 2, count: 22 },
      { bin: 3, count: 5 },
      { bin: 4, count: 83 },
      { bin: 5, count: 88 },
      { bin: 6, count: 29 },
    ],
  },
  {
    bin: 5,
    bins: [
      { bin: 0, count: 86 },
      { bin: 1, count: 87 },
      { bin: 2, count: 44 },
      { bin: 3, count: 14 },
      { bin: 4, count: 44 },
      { bin: 5, count: 5 },
      { bin: 6, count: 25 },
    ],
  },
  {
    bin: 6,
    bins: [
      { bin: 0, count: 76 },
      { bin: 1, count: 74 },
      { bin: 2, count: 19 },
      { bin: 3, count: 81 },
      { bin: 4, count: 44 },
      { bin: 5, count: 13 },
      { bin: 6, count: 39 },
    ],
  },
  {
    bin: 7,
    bins: [
      { bin: 0, count: 48 },
      { bin: 1, count: 99 },
      { bin: 2, count: 53 },
      { bin: 3, count: 41 },
      { bin: 4, count: 89 },
      { bin: 5, count: 56 },
      { bin: 6, count: 67 },
    ],
  },
  {
    bin: 8,
    bins: [
      { bin: 0, count: 36 },
      { bin: 1, count: 16 },
      { bin: 2, count: 30 },
      { bin: 3, count: 22 },
      { bin: 4, count: 33 },
      { bin: 5, count: 25 },
      { bin: 6, count: 79 },
    ],
  },
  {
    bin: 9,
    bins: [
      { bin: 0, count: 8 },
      { bin: 1, count: 76 },
      { bin: 2, count: 40 },
      { bin: 3, count: 7 },
      { bin: 4, count: 16 },
      { bin: 5, count: 51 },
      { bin: 6, count: 58 },
    ],
  },
  {
    bin: 10,
    bins: [
      { bin: 0, count: 38 },
      { bin: 1, count: 22 },
      { bin: 2, count: 24 },
      { bin: 3, count: 19 },
      { bin: 4, count: 34 },
      { bin: 5, count: 76 },
      { bin: 6, count: 35 },
    ],
  },
  {
    bin: 11,
    bins: [
      { bin: 0, count: 63 },
      { bin: 1, count: 94 },
      { bin: 2, count: 15 },
      { bin: 3, count: 56 },
      { bin: 4, count: 40 },
      { bin: 5, count: 57 },
      { bin: 6, count: 12 },
    ],
  },
  {
    bin: 12,
    bins: [
      { bin: 0, count: 10 },
      { bin: 1, count: 77 },
      { bin: 2, count: 16 },
      { bin: 3, count: 66 },
      { bin: 4, count: 76 },
      { bin: 5, count: 36 },
      { bin: 6, count: 82 },
    ],
  },
  {
    bin: 13,
    bins: [
      { bin: 0, count: 81 },
      { bin: 1, count: 62 },
      { bin: 2, count: 3 },
      { bin: 3, count: 88 },
      { bin: 4, count: 78 },
      { bin: 5, count: 1 },
      { bin: 6, count: 96 },
    ],
  },
  {
    bin: 14,
    bins: [
      { bin: 0, count: 14 },
      { bin: 1, count: 66 },
      { bin: 2, count: 97 },
      { bin: 3, count: 78 },
      { bin: 4, count: 45 },
      { bin: 5, count: 36 },
      { bin: 6, count: 45 },
    ],
  },
  {
    bin: 15,
    bins: [
      { bin: 0, count: 29 },
      { bin: 1, count: 38 },
      { bin: 2, count: 69 },
      { bin: 3, count: 83 },
      { bin: 4, count: 90 },
      { bin: 5, count: 33 },
      { bin: 6, count: 75 },
    ],
  },
  {
    bin: 16,
    bins: [
      { bin: 0, count: 67 },
      { bin: 1, count: 92 },
      { bin: 2, count: 26 },
      { bin: 3, count: 97 },
      { bin: 4, count: 65 },
      { bin: 5, count: 54 },
      { bin: 6, count: 15 },
    ],
  },
  {
    bin: 17,
    bins: [
      { bin: 0, count: 50 },
      { bin: 1, count: 12 },
      { bin: 2, count: 69 },
      { bin: 3, count: 72 },
      { bin: 4, count: 71 },
      { bin: 5, count: 76 },
      { bin: 6, count: 52 },
    ],
  },
  {
    bin: 18,
    bins: [
      { bin: 0, count: 96 },
      { bin: 1, count: 17 },
      { bin: 2, count: 29 },
      { bin: 3, count: 4 },
      { bin: 4, count: 65 },
      { bin: 5, count: 25 },
      { bin: 6, count: 15 },
    ],
  },
  {
    bin: 19,
    bins: [
      { bin: 0, count: 13 },
      { bin: 1, count: 82 },
      { bin: 2, count: 16 },
      { bin: 3, count: 67 },
      { bin: 4, count: 97 },
      { bin: 5, count: 87 },
      { bin: 6, count: 23 },
    ],
  },
  {
    bin: 20,
    bins: [
      { bin: 0, count: 13 },
      { bin: 1, count: 65 },
      { bin: 2, count: 76 },
      { bin: 3, count: 60 },
      { bin: 4, count: 62 },
      { bin: 5, count: 50 },
      { bin: 6, count: 50 },
    ],
  },
  {
    bin: 21,
    bins: [
      { bin: 0, count: 75 },
      { bin: 1, count: 82 },
      { bin: 2, count: 35 },
      { bin: 3, count: 95 },
      { bin: 4, count: 37 },
      { bin: 5, count: 92 },
      { bin: 6, count: 76 },
    ],
  },
  {
    bin: 22,
    bins: [
      { bin: 0, count: 53 },
      { bin: 1, count: 66 },
      { bin: 2, count: 37 },
      { bin: 3, count: 5 },
      { bin: 4, count: 32 },
      { bin: 5, count: 7 },
      { bin: 6, count: 23 },
    ],
  },
  {
    bin: 23,
    bins: [
      { bin: 0, count: 54 },
      { bin: 1, count: 83 },
      { bin: 2, count: 85 },
      { bin: 3, count: 13 },
      { bin: 4, count: 30 },
      { bin: 5, count: 32 },
      { bin: 6, count: 18 },
    ],
  },
  {
    bin: 24,
    bins: [
      { bin: 0, count: 37 },
      { bin: 1, count: 52 },
      { bin: 2, count: 37 },
      { bin: 3, count: 62 },
      { bin: 4, count: 47 },
      { bin: 5, count: 6 },
      { bin: 6, count: 17 },
    ],
  },
  {
    bin: 25,
    bins: [
      { bin: 0, count: 16 },
      { bin: 1, count: 30 },
      { bin: 2, count: 97 },
      { bin: 3, count: 80 },
      { bin: 4, count: 12 },
      { bin: 5, count: 54 },
      { bin: 6, count: 95 },
    ],
  },
  {
    bin: 26,
    bins: [
      { bin: 0, count: 29 },
      { bin: 1, count: 71 },
      { bin: 2, count: 7 },
      { bin: 3, count: 6 },
      { bin: 4, count: 34 },
      { bin: 5, count: 90 },
      { bin: 6, count: 77 },
    ],
  },
  {
    bin: 27,
    bins: [
      { bin: 0, count: 13 },
      { bin: 1, count: 9 },
      { bin: 2, count: 4 },
      { bin: 3, count: 45 },
      { bin: 4, count: 74 },
      { bin: 5, count: 99 },
      { bin: 6, count: 39 },
    ],
  },
  {
    bin: 28,
    bins: [
      { bin: 0, count: 23 },
      { bin: 1, count: 66 },
      { bin: 2, count: 10 },
      { bin: 3, count: 23 },
      { bin: 4, count: 43 },
      { bin: 5, count: 13 },
      { bin: 6, count: 1 },
    ],
  },
  {
    bin: 29,
    bins: [
      { bin: 0, count: 60 },
      { bin: 1, count: 77 },
      { bin: 2, count: 44 },
      { bin: 3, count: 37 },
      { bin: 4, count: 60 },
      { bin: 5, count: 54 },
      { bin: 6, count: 54 },
    ],
  },
  {
    bin: 30,
    bins: [
      { bin: 0, count: 76 },
      { bin: 1, count: 78 },
      { bin: 2, count: 98 },
      { bin: 3, count: 77 },
      { bin: 4, count: 21 },
      { bin: 5, count: 22 },
      { bin: 6, count: 98 },
    ],
  },
  {
    bin: 31,
    bins: [
      { bin: 0, count: 98 },
      { bin: 1, count: 84 },
      { bin: 2, count: 17 },
      { bin: 3, count: 96 },
      { bin: 4, count: 40 },
      { bin: 5, count: 21 },
      { bin: 6, count: 43 },
    ],
  },
  {
    bin: 32,
    bins: [
      { bin: 0, count: 50 },
      { bin: 1, count: 31 },
      { bin: 2, count: 52 },
      { bin: 3, count: 82 },
      { bin: 4, count: 94 },
      { bin: 5, count: 18 },
      { bin: 6, count: 62 },
    ],
  },
  {
    bin: 33,
    bins: [
      { bin: 0, count: 42 },
      { bin: 1, count: 22 },
      { bin: 2, count: 89 },
      { bin: 3, count: 52 },
      { bin: 4, count: 45 },
      { bin: 5, count: 63 },
      { bin: 6, count: 26 },
    ],
  },
  {
    bin: 34,
    bins: [
      { bin: 0, count: 97 },
      { bin: 1, count: 92 },
      { bin: 2, count: 13 },
      { bin: 3, count: 83 },
      { bin: 4, count: 6 },
      { bin: 5, count: 44 },
      { bin: 6, count: 48 },
    ],
  },
  {
    bin: 35,
    bins: [
      { bin: 0, count: 87 },
      { bin: 1, count: 12 },
      { bin: 2, count: 89 },
      { bin: 3, count: 46 },
      { bin: 4, count: 78 },
      { bin: 5, count: 28 },
      { bin: 6, count: 76 },
    ],
  },
  {
    bin: 36,
    bins: [
      { bin: 0, count: 67 },
      { bin: 1, count: 63 },
      { bin: 2, count: 49 },
      { bin: 3, count: 33 },
      { bin: 4, count: 89 },
      { bin: 5, count: 30 },
      { bin: 6, count: 88 },
    ],
  },
  {
    bin: 37,
    bins: [
      { bin: 0, count: 10 },
      { bin: 1, count: 97 },
      { bin: 2, count: 49 },
      { bin: 3, count: 68 },
      { bin: 4, count: 9 },
      { bin: 5, count: 55 },
      { bin: 6, count: 76 },
    ],
  },
  {
    bin: 38,
    bins: [
      { bin: 0, count: 19 },
      { bin: 1, count: 94 },
      { bin: 2, count: 38 },
      { bin: 3, count: 10 },
      { bin: 4, count: 41 },
      { bin: 5, count: 83 },
      { bin: 6, count: 79 },
    ],
  },
  {
    bin: 39,
    bins: [
      { bin: 0, count: 85 },
      { bin: 1, count: 45 },
      { bin: 2, count: 80 },
      { bin: 3, count: 61 },
      { bin: 4, count: 92 },
      { bin: 5, count: 72 },
      { bin: 6, count: 95 },
    ],
  },
  {
    bin: 40,
    bins: [
      { bin: 0, count: 80 },
      { bin: 1, count: 64 },
      { bin: 2, count: 49 },
      { bin: 3, count: 45 },
      { bin: 4, count: 31 },
      { bin: 5, count: 74 },
      { bin: 6, count: 51 },
    ],
  },
  {
    bin: 41,
    bins: [
      { bin: 0, count: 61 },
      { bin: 1, count: 9 },
      { bin: 2, count: 16 },
      { bin: 3, count: 60 },
      { bin: 4, count: 20 },
      { bin: 5, count: 23 },
      { bin: 6, count: 84 },
    ],
  },
  {
    bin: 42,
    bins: [
      { bin: 0, count: 42 },
      { bin: 1, count: 87 },
      { bin: 2, count: 69 },
      { bin: 3, count: 59 },
      { bin: 4, count: 89 },
      { bin: 5, count: 37 },
      { bin: 6, count: 4 },
    ],
  },
  {
    bin: 43,
    bins: [
      { bin: 0, count: 71 },
      { bin: 1, count: 97 },
      { bin: 2, count: 85 },
      { bin: 3, count: 21 },
      { bin: 4, count: 99 },
      { bin: 5, count: 77 },
      { bin: 6, count: 62 },
    ],
  },
  {
    bin: 44,
    bins: [
      { bin: 0, count: 12 },
      { bin: 1, count: 28 },
      { bin: 2, count: 6 },
      { bin: 3, count: 89 },
      { bin: 4, count: 74 },
      { bin: 5, count: 62 },
      { bin: 6, count: 89 },
    ],
  },
  {
    bin: 45,
    bins: [
      { bin: 0, count: 53 },
      { bin: 1, count: 2 },
      { bin: 2, count: 79 },
      { bin: 3, count: 73 },
      { bin: 4, count: 90 },
      { bin: 5, count: 50 },
      { bin: 6, count: 75 },
    ],
  },
  {
    bin: 46,
    bins: [
      { bin: 0, count: 32 },
      { bin: 1, count: 14 },
      { bin: 2, count: 83 },
      { bin: 3, count: 16 },
      { bin: 4, count: 30 },
      { bin: 5, count: 65 },
      { bin: 6, count: 34 },
    ],
  },
  {
    bin: 47,
    bins: [
      { bin: 0, count: 15 },
      { bin: 1, count: 8 },
      { bin: 2, count: 54 },
      { bin: 3, count: 34 },
      { bin: 4, count: 96 },
      { bin: 5, count: 76 },
      { bin: 6, count: 23 },
    ],
  },
  {
    bin: 48,
    bins: [
      { bin: 0, count: 5 },
      { bin: 1, count: 5 },
      { bin: 2, count: 91 },
      { bin: 3, count: 64 },
      { bin: 4, count: 99 },
      { bin: 5, count: 91 },
      { bin: 6, count: 51 },
    ],
  },
  {
    bin: 49,
    bins: [
      { bin: 0, count: 50 },
      { bin: 1, count: 49 },
      { bin: 2, count: 64 },
      { bin: 3, count: 46 },
      { bin: 4, count: 84 },
      { bin: 5, count: 61 },
      { bin: 6, count: 96 },
    ],
  },
  {
    bin: 50,
    bins: [
      { bin: 0, count: 40 },
      { bin: 1, count: 60 },
      { bin: 2, count: 50 },
      { bin: 3, count: 28 },
      { bin: 4, count: 73 },
      { bin: 5, count: 90 },
      { bin: 6, count: 9 },
    ],
  },
  {
    bin: 51,
    bins: [
      { bin: 0, count: 98 },
      { bin: 1, count: 9 },
      { bin: 2, count: 57 },
      { bin: 3, count: 67 },
      { bin: 4, count: 8 },
      { bin: 5, count: 78 },
      { bin: 6, count: 79 },
    ],
  },
  {
    bin: 52,
    bins: [
      { bin: 0, count: 71 },
      { bin: 1, count: 87 },
      { bin: 2, count: 69 },
      { bin: 3, count: 2 },
      { bin: 4, count: 89 },
      { bin: 5, count: 18 },
      { bin: 6, count: 86 },
    ],
  },
];
