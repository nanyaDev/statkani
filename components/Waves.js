import { useState } from 'react';
import { randomNormal } from 'd3-random';
import { area } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { motion } from 'framer-motion';

import useInterval from '@/lib/useInterval';

const background = '#050b20';
const colors = ['#FF00AA', '#00AAFF', '#A100F1'];
const nPoints = 20;
const height = 30;
const duration = 3;

const getPath = () => {
  const curveFunc = area()
    .x((d) => d.x)
    .y0((d) => height - d.y0)
    .y1((d) => height - d.y1)
    .curve(curveBasis);

  const data = Array.from({ length: nPoints }).map((_, i) => {
    const scaleFactor = (height / (Math.abs(i - nPoints / 2) || 1)) * 0.6; // 0.6 to reduce the peak a bit

    const x = i;
    let y0 = Math.max(0, scaleFactor + randomNormal(0, 8)());
    let y1 = Math.max(0, scaleFactor + randomNormal(0, 8)());

    return { x, y0, y1 };
  });

  return curveFunc(data);
};

const Waves = () => {
  const [path1, setPath1] = useState(getPath);
  const [path2, setPath2] = useState(getPath);
  const [path3, setPath3] = useState(getPath);

  useInterval(() => {
    setPath1(getPath());
    setPath2(getPath());
    setPath3(getPath());
  }, duration * 1000);

  return (
    <div>
      <svg
        className="absolute bottom-1/2 left-0 overflow-visible"
        height="13em"
        width="100%"
        viewBox={[0, 0, nPoints - 1, height].join(' ')}
        preserveAspectRatio="none"
      >
        <defs>
          {colors.map((color, i) => (
            <linearGradient id={`gradient-${i}`} key={i}>
              <stop stopColor={background} offset="0%" />
              <stop stopColor={color} offset="50%" />
              <stop stopColor={background} offset="100%" />
            </linearGradient>
          ))}
        </defs>
        <motion.path
          initial={{ d: getPath() }}
          animate={{ d: path1 }}
          transition={{ duration, type: 'tween', ease: 'linear' }}
          fill="url(#gradient-0)"
          className="mix-blend-screen"
        />
        <motion.path
          initial={{ d: getPath() }}
          animate={{ d: path2 }}
          transition={{ duration, type: 'tween', ease: 'linear' }}
          fill="url(#gradient-1)"
          className="mix-blend-screen"
        />
        <motion.path
          initial={{ d: getPath() }}
          animate={{ d: path3 }}
          transition={{ duration, type: 'tween', ease: 'linear' }}
          fill="url(#gradient-2)"
          className="mix-blend-screen"
        />
      </svg>
    </div>
  );
};

export default Waves;
