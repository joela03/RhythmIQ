import React, { useState } from 'react';
import { Flame } from 'lucide-react';

const StreakCalendar = () => {
  const currentStreak = 12;
  
  return (
    <div className="w-90 bg-white rounded-xl border border-gray-200 p-4 shadow-xs hover:shadow-sm ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className="text-orange-500" />
          <h3 className="text-lg font-semibold">Streak Calendar</h3>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            {currentStreak} day streak
          </span>
        </div>
      </div>
      
      <div className="text-center text-gray-500">Calendar grid will go here</div>
    </div>
  );
};

export default StreakCalendar;