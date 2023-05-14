import Navbar from '@/components/Navbar';
import HeatMap from '@/components/Heatmap';
import Bars from '@/components/Bars';

const Graphs = () => {
  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className="flex-grow flex flex-col justify-around items-center px-20 py-10">
        <Bars />
        <HeatMap />
      </div>
    </div>
  );
};

export default Graphs;
