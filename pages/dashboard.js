import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SRSBreakdown from '@/components/SRSBreakdown';
import StatsTable from '@/components/StatsTable';

import { setToken, fetchEndpoint } from '@/lib/api';
import { useAuth } from '@/lib/auth';

const Dashboard = () => {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState([]);

  const stagesArr = assignments.reduce((acc, curr) => {
    acc[curr.stage] += 1;
    return acc;
  }, Array(10).fill(0));

  const stages = [
    // prettier-ignore
    { stage: 'Apprentice', value: stagesArr.slice(1, 5).reduce((a, b) => a + b) },
    { stage: 'Guru', value: stagesArr.slice(5, 7).reduce((a, b) => a + b) },
    { stage: 'Master', value: stagesArr[7] },
    { stage: 'Enlightened', value: stagesArr[8] },
    { stage: 'Burned', value: stagesArr[9] },
  ];

  const fetchData = async () => {
    setToken(token);
    setAssignments(await fetchEndpoint('assignments'));
  };

  return (
    <div className="flex-grow flex flex-col bg-bg">
      <Navbar />
      <div className=" flex-grow flex justify-center items-center">
        <SRSBreakdown stages={stages} />
        <StatsTable />
      </div>
      <button
        className="border border-white text-white fixed bottom-8 right-8"
        onClick={fetchData}
      >
        Fetch Data
      </button>
    </div>
  );
};

export default Dashboard;
