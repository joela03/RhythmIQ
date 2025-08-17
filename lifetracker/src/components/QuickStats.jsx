import { ArrowUp, Target, Flame, TrendingUp, Trophy } from "lucide-react";

const QuickStats = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="backdrop-blur-sm bg-white/80 rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Progress</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUp size={12} className="text-green-500" />
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Target className="text-white" size={20} />
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-white/80 rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-orange-600 font-medium">days</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Flame className="text-white" size={20} />
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-white/80 rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Weekly Score</p>
              <p className="text-2xl font-bold text-gray-900">92</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUp size={12} className="text-green-500" />
                <span className="text-xs text-green-600 font-medium">+8 pts</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-white/80 rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rank</p>
              <p className="text-2xl font-bold text-gray-900">#3</p>
              <p className="text-xs text-purple-600 font-medium">in group</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
              <Trophy className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;