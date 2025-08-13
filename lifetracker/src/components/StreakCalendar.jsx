import React, { useState, useRef, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Filter, ChevronDown } from 'lucide-react';

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentStreak = 12;

  const [activeFilter, setActiveFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef('null')

  const categories = [
  { id: 'all', name: 'All Categories', color: 'bg-purple-500' },
  { id: 'fitness', name: 'Fitness', color: 'bg-blue-500' },
  { id: 'education', name: 'Education', color: 'bg-green-500' },
  { id: 'social', name: 'Social', color: 'bg-amber-500' },
  { id: 'productivity', name: 'Productivity', color: 'bg-red-500' }
];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFilterSelect = (categoryId) => {
        setActiveFilter(categoryId);
        setIsFilterOpen(false);
    };

  const navigatePeriod = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  }

    const streakData = {
  '2025-06-02': { fitness: 3/3, education: 2/2, social: 1/1, productivity: 4/4 },
  '2025-06-03': { fitness: 2/3, education: 2/2, social: 1/1, productivity: 3/4 },
    }

  const getCellColor = (date) => {
    if (!streakData[date]) return { bgColor: '', opacity: '' };

    const totals = Object.values(streakData[date]);
    const completionRatio = totals.reduce((sum, val) => sum + val, 0) / totals.length;

    if (completionRatio == 0) return { bgColor: '', opacity: '' };
    if (completionRatio <= 0.25) return { bgColor: 'bg-purple-500', opacity: 'bg-opacity-20' };
    if (completionRatio <= 0.5) return { bgColor: 'bg-purple-500', opacity: 'bg-opacity-40' };
    if (completionRatio <= 0.75) return { bgColor: 'bg-purple-500', opacity: 'bg-opacity-60' };
    return { bgColor: 'bg-purple-500', opacity: 'bg-opacity-80' };
  };
  

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
            <div className="flex space-x-2">
            <div className="relative" ref={filterRef}>
                <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                <Filter size={16} />
                <span>{categories.find(c => c.id === activeFilter)?.name}</span>
                <ChevronDown size={14} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFilterOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterSelect(category.id)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                        activeFilter === category.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                    >
                        <span className={`w-2 h-2 rounded-full ${category.color} mr-2`}></span>
                        {category.name}
                    </button>
                    ))}
                </div>
                )}
            </div>
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
          const isToday = dayData.date === new Date().toISOString().split('T')[0];
          
          return (
            <div 
            key={dayData.date}
            className={`relative h-10 rounded-md flex items-center justify-center text-sm ${
                streakData[dayData.date] ? `bg-purple-500 ${getCellColor(dayData.date)} text-white` : 'bg-gray-50'
            } ${
                isToday ? 'ring-2 ring-offset-1 ring-blue-500' : ''
            }
            
            `}
            >
            {dayData.day}
            {streakData[dayData.date] && (
                <span className="absolute bottom-1 right-1 text-[10px]">
                {Object.values(streakData[dayData.date]).filter(v => v > 0).length}
                </span>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
