import capitalize from '@/utils/capitalize';
import toPercentage from '@/utils/toPercentage';

const Loader = ({ progress }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center space-y-6 bg-bg">
      {Object.entries(progress).map(([endpoint, progress]) => (
        <ProgressBar key={endpoint} endpoint={endpoint} progress={progress} />
      ))}
    </div>
  );
};

// cf. https://tailwind-elements.com/docs/standard/components/progress/
const ProgressBar = ({ endpoint, progress }) => {
  return (
    <div className="max-w-sm w-full relative">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block pb-2 px-2 uppercase rounded-full text-white">
            {capitalize(endpoint)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block pb-2 px-2 text-white">
            {toPercentage(progress)}
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-1 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${progress * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
