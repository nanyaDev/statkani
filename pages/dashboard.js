import Navbar from '@/components/Navbar';
import SRSBreakdown from '@/components/SRSBreakdown';

const Dashboard = () => {
  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <SRSBreakdown />
    </div>
  );
};

export default Dashboard;
