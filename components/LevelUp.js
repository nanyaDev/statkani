import { useMemo } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

import { barData } from '@/utils/mockData';

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
    <Flex
      direction="column"
      justify="flex-end"
      align="center"
      h="30%"
      bg="white"
      boxShadow="base"
      rounded="md"
      mb={8}
    >
      <Heading alignSelf="flex-start" size="sm" color="gray.600" pl={8} mb={3}>
        Review Forecast
      </Heading>
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
    </Flex>
  );
};

export default LevelUp;
