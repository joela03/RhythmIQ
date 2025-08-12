import React, { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentStreak = 12;

  const navigatePeriod = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  }
  
  const generateDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ date: dateStr, day });
    }
    
    return days;
  };

  return (
    <div className="w-90 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className='flex items-center justify-between mb-3'>
            <button
                onClick={() => navigatePeriod('prev')}
                className='p-1 rounded-full hover:bg-gray-100'
            >
                <ChevronLeft size={20}/>
            </button>
            <h4 className='font-medium'>
                {currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})}
            </h4>
            <button
                onClick={() => navigatePeriod('next')}
                className='p-1 rounded-full hover:bg-gray-100'
            >
                <ChevronRight size={20}/>
            </button>
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between space-x-2">
                <Flame className="text-orange-500" />
                <h3 className="text-lg font-semibold">Streak Calendar</h3>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {currentStreak} day streak
                </span>
            </div>
        </div>
      
          <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {generateDays().map((dayData, index) => {
          if (!dayData) return <div key={`empty-${index}`} className="h-10"></div>;
          
          return (
            <div 
              key={dayData.date}
              className="h-10 rounded-md flex items-center justify-center text-sm bg-gray-50"
            >
              {dayData.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
