import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Filter, Grid, Calendar, ChevronDown } from 'lucide-react';

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); 
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  
  const streakData = {
    '2025-01-15': { fitness: 3/5, education: 1/2, social: 0/1, productivity: 4/4 },
    '2025-01-16': { fitness: 2/3, education: 2/2, social: 1/1, productivity: 3/4 },
    '2025-01-17': { fitness: 3/3, education: 1/2, social: 1/1, productivity: 2/4 },
    '2025-01-18': { fitness: 1/3, education: 2/2, social: 0/1, productivity: 4/4 },
    '2025-01-19': { fitness: 3/3, education: 2/2, social: 1/1, productivity: 3/4 },
    '2025-01-20': { fitness: 2/3, education: 1/2, social: 1/1, productivity: 4/4 },
  };

  const categories = [
    { id: 'all', name: 'All Categories', gradient: 'from-purple-500 to-violet-600' },
    { id: 'fitness', name: 'Fitness', gradient: 'from-blue-500 to-blue-600' },
    { id: 'education', name: 'Education', gradient: 'from-green-500 to-green-600' },
    { id: 'social', name: 'Social', gradient: 'from-amber-500 to-orange-600' },
    { id: 'productivity', name: 'Productivity', gradient: 'from-red-500 to-red-600' }
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

  const currentStreak = 12;

  const navigatePeriod = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const generateDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (viewMode === 'month') {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        days.push(dateStr);
      }
    } else {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        const dateStr = currentDay.toISOString().split('T')[0];
        days.push(dateStr);
      }
    }
    
    return days;
  };

  const getCellIntensity = (date) => {
    if (!streakData[date]) return 0;
    
    let completionRatio = 0;
    if (activeFilter === 'all') {
      const totals = Object.values(streakData[date]);
      completionRatio = totals.reduce((sum, val) => sum + val, 0) / totals.length;
    } else {
      completionRatio = streakData[date][activeFilter] || 0;
    }
    
    if (completionRatio === 0) return 0;
    if (completionRatio <= 0.25) return 1;
    if (completionRatio <= 0.5) return 2;
    if (completionRatio <= 0.75) return 3;
    return 4;
  };

  const getActiveCategory = () => categories.find(c => c.id === activeFilter);

  return (
    <div className="w-96 min-w-96 max-w-96 bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-200">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-r ${getActiveCategory().gradient} rounded-lg`}>
              <Flame className="text-white" size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">Streak Calendar</h3>
              <p className="text-xs text-gray-500 truncate">{currentStreak} day streak active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button 
              onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              title={`Switch to ${viewMode === 'month' ? 'week' : 'month'} view`}
            >
              {viewMode === 'month' ? <Grid size={16} /> : <Calendar size={16} />}
            </button>
            
            <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <Filter size={14} />
                <span className="truncate max-w-20">{getActiveCategory()?.name}</span>
                <ChevronDown size={12} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterSelect(category.id)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center ${
                        activeFilter === category.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg transition-colors`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient} mr-3 flex-shrink-0`}></div>
                      <span className="font-medium text-gray-900 truncate">{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigatePeriod('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex-shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="text-center min-w-0 flex-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h4>
            {viewMode === 'week' && (
              <span className="text-xs font-normal text-gray-500">(Week View)</span>
            )}
          </div>
          
          <button 
            onClick={() => navigatePeriod('next')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex-shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {generateDays().map((date, index) => {
            if (!date) return <div key={`empty-${index}`} className="h-10"></div>;
            
            const day = new Date(date).getDate();
            const isToday = date === new Date().toISOString().split('T')[0];
            const hasData = streakData[date];
            const intensity = getCellIntensity(date);
            const activeGradient = getActiveCategory().gradient;
            
            return (
              <div 
                key={date}
                className={`relative h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  hasData && intensity > 0
                    ? `bg-gradient-to-r ${activeGradient} text-white shadow-sm hover:shadow-md`
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                } ${
                  isToday ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                }`}
                style={{
                  opacity: hasData && intensity > 0 ? Math.max(0.3 + (intensity * 0.175), 1) : 1
                }}
              >
                {day}
                {hasData && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">
                        {activeFilter === 'all' 
                          ? Object.values(streakData[date]).filter(v => v > 0).length
                          : streakData[date][activeFilter] > 0 ? '✓' : ''
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <span className="font-semibold text-gray-700 flex-shrink-0">Intensity:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4].map(level => (
                  <div 
                    key={level}
                    className={`w-4 h-4 rounded-sm bg-gradient-to-r ${getActiveCategory().gradient}`}
                    style={{ opacity: Math.max(0.3 + (level * 0.175), 1) }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;