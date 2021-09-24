import { useState, useMemo, useRef, useEffect } from 'react';
import { area, curveBasis, randomNormal } from 'd3';
import { times, uniqueId } from 'lodash';
import { animated, useSpring } from 'react-spring';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const gradients = [
  ['#f2f2f7', '#FF00AA', '#f2f2f7'],
  ['#f2f2f7', '#00AAFF', '#f2f2f7'],
  ['#f2f2f7', '#A100F1', '#f2f2f7'],
];
const numberOfWiggles = 20;
const heightOfBackground = 10;

const getPath = () =>
  area()
    .x(([x, y]) => x)
    .y0(([x, y]) => -y / 5)
    .y1(([x, y, y1]) => y1 / 5)
    .curve(curveBasis)(
    times(numberOfWiggles, (i) => [
      i, // x
      Math.max(
        0,
        (heightOfBackground / 2) *
          (1 / (Math.abs(i - numberOfWiggles / 2) || 1)) +
          randomNormal(0, 8)() +
          3
      ), // y0
      Math.min(
        0,
        (-heightOfBackground / 2) *
          (1 / (Math.abs(i - numberOfWiggles / 2) || 1)) +
          randomNormal(0, 8)() -
          3
      ), // y1
    ])
  );

const springConfig = {
  duration: 3000,
};

const Waves = () => {
  const gradientIds = useMemo(
    () => times(3, () => `HeaderBackground__gradient--id-${uniqueId()}`),
    []
  );

  const [path1, setPath1] = useState(getPath);
  const [path2, setPath2] = useState(getPath);
  const [path3, setPath3] = useState(getPath);

  useInterval(() => {
    setPath1(getPath());
    setPath2(getPath());
    setPath3(getPath());
  }, 3000);

  const spring1 = useSpring({ config: springConfig, d: path1 });
  const spring2 = useSpring({ config: springConfig, d: path2 });
  const spring3 = useSpring({ config: springConfig, d: path3 });

  return (
    <div className="HeaderBackground">
      <svg
        className="HeaderBackground__svg"
        viewBox={[
          0,
          -heightOfBackground / 2,
          numberOfWiggles - 1,
          heightOfBackground,
        ].join(' ')}
        preserveAspectRatio="none"
      >
        <defs>
          {gradients.map((colors, gradientIndex) => (
            <linearGradient id={gradientIds[gradientIndex]} key={gradientIndex}>
              {colors.map((color, colorIndex) => (
                <stop
                  key={[gradientIndex, colorIndex].join('-')}
                  stopColor={color}
                  offset={`${(colorIndex / (colors.length - 1)) * 100}%`}
                />
              ))}
            </linearGradient>
          ))}
        </defs>
        <animated.path
          className="HeaderBackground__path"
          {...spring1}
          fill={`url(#${gradientIds[0]})`}
        />
        <animated.path
          className="HeaderBackground__path"
          {...spring2}
          fill={`url(#${gradientIds[1]})`}
        />
        <animated.path
          className="HeaderBackground__path"
          {...spring3}
          fill={`url(#${gradientIds[2]})`}
        />
      </svg>
    </div>
  );
};

export default Waves;
