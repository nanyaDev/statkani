import Navbar from '@/components/Navbar';
import HeatMap from '@/components/Heatmap';
import LevelUp from '@/components/LevelUp';

const Graphs = () => {
  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="flex-grow flex flex-col justify-around items-center px-20 py-10">
        <HeatMap />
        <LevelUp />
      </div>
    </div>
  );
};

export default Graphs;
