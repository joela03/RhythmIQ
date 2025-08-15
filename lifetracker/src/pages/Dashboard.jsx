import Sidebar from '../components/Sidebar';
import SocialSection from '../components/SocialSection';
import AIInsights from '../components/AIInsights';
import StreakCalendar from '../components/StreakCalendar';
import TodaysFocusCard from '../components/TodaysFocusCard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 px-6 py-4">
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-4 grid-widget">
            <AIInsights />
          </div>
          
          <div className="col-span-4 grid-widget">
            <StreakCalendar />
          </div>
        </div>
        
        <div className="flex items-start">
            <div>
                <TodaysFocusCard />
            </div>
        </div>
      </main>
      
      <SocialSection />
    </div>
  );
};

export default Dashboard;