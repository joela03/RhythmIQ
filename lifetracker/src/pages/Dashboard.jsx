import Sidebar from '../components/Sidebar';
import SocialSection from '../components/SocialSection';
import AIInsights from '../components/AIInsights';
import StreakCalendar from '../components/StreakCalendar';
import TodaysFocusCard from '../components/TodaysFocusCard';
import QuickStats from '../components/QuickStats';
import { useState } from 'react';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      <Sidebar
      isCollapsed={isSidebarCollapsed}
      toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`flex-1 min-w-0 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mr-80 px-6 py-6`}>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Good morning, Alex! 👋
              </h1>
              <p className="text-gray-600">You're doing great this week. Keep up the momentum!</p>
            </div>
            <div className="flex items-center space-x-3 backdrop-blur-sm bg-white/70 rounded-xl px-4 py-2 border border-white/20">
              <div className="text-sm text-gray-600">
                Today: {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <QuickStats/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <AIInsights className="h-full"/>
          </div>
          <div className="xl:col-span-1">
            <TodaysFocusCard className="h-full"/>
          </div>
          <div className="xl:col-span-1">
            <StreakCalendar className="h-full"/>
          </div>
        </div>
        <div className="xl:col-span-1">  
          <SocialSection/>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;