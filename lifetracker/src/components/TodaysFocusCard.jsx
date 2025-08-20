import React, { useState } from 'react'
import { Calendar, Check, Plus, Zap, Clock, Target, ChevronRight, Flame, MoreHorizontal } from 'lucide-react'

const TodaysFocusCard = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Morning Meditation',
      completed: true,
      difficulty: 'easy',
      time: '7:00 AM',
      priority: 1,
      streak: 12,
      category: 'Mindfulness'
    },
    {
      id: 2,
      name: 'Workout Session',
      completed: true,
      difficulty: 'hard',
      time: '8:00 AM',
      priority: 2,
      streak: 8,
      category: 'Fitness'
    },
    {
      id: 3,
      name: 'Read for 30 minutes',
      completed: false,
      difficulty: 'medium',
      time: '9:00 AM',
      priority: 3,
      streak: 15,
      category: 'Learning'
    },
    {
      id: 4,
      name: 'Practice Guitar',
      completed: false,
      difficulty: 'medium',
      time: '7:00 PM',
      priority: 4,
      streak: 5,
      category: 'Hobbies'
    },
    {
      id: 5,
      name: 'Evening Journal',
      completed: false,
      difficulty: 'easy',
      time: '9:00 PM',
      priority: 5,
      streak: 22,
      category: 'Reflection'
    }
  ])

  const [showCompleted, setShowCompleted] = useState(true)

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const completedCount = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const completionPercentage = (completedCount / totalHabits) * 100

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    if (priority <= 2) return 'bg-red-500'
    if (priority <= 4) return 'bg-amber-500'
    return 'bg-green-500'
  }

  const now = new Date().getHours()
  const filteredHabits = showCompleted ? habits : habits.filter(h => !h.completed)

  return (
    <div className="h-[600px] bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <Calendar className="text-white" size={24}/>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Today's Focus
            </h3>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="currentColor"
              />
              <path
                className="text-blue-500"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="currentColor"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-800">
              {completedCount}/{totalHabits}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
        <div className="flex items-center space-x-2 mb-1">
          <Zap className="text-violet-600" size={16}/>
          <span className="text-sm font-medium text-violet-800">Power Hour Active</span>
          <div className="text-xs bg-violet-200 text-violet-700 px-2 py-0.5 rounded-full">
            {now}:00
          </div>
        </div>
        <p className="text-xs text-violet-600">Peak productivity window - great time for focused work!</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Today's Habits</h4>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
        >
          {showCompleted ? 'Hide completed' : 'Show all'}
        </button>
      </div>
      
      <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
        {filteredHabits.map((habit) => {
          const isCurrentTime = habit.time.includes(now.toString().padStart(2, '0'))
          
          return (
            <div 
              key={habit.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                habit.completed 
                  ? 'bg-emerald-50 border-emerald-200 opacity-75' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              } ${isCurrentTime ? 'ring-2 ring-blue-300 shadow-md' : ''}`}
              onClick={() => toggleHabit(habit.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  habit.completed 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : 'border-slate-300 group-hover:border-blue-400'
                }`}>
                  {habit.completed && (
                    <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5" strokeWidth={3}/>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className={`font-medium text-sm ${
                      habit.completed ? 'text-emerald-700 line-through' : 'text-slate-800'
                    }`}>
                      {habit.name}
                    </h5>
                    
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyColor(habit.difficulty)}`}>
                      {habit.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12}/>
                      <span>{habit.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="text-orange-500" size={12}/>
                      <span className="text-orange-600 font-medium">{habit.streak}</span>
                    </div>
                    <span className="text-slate-400">#{habit.priority}</span>
                    {isCurrentTime && (
                      <span className="text-blue-600 font-medium animate-pulse">Now</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(habit.priority)}`}></div>
                  <button 
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-slate-100 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <MoreHorizontal size={14} className="text-slate-400"/>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mb-4">
        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
          <Plus size={18}/>
          <span className="font-medium">Quick Add Habit</span>
        </button>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2">
          <Target size={16}/>
          <span>Focus Mode</span>
        </button>
        <button className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 flex items-center justify-center space-x-2">
          <Calendar size={16}/>
          <span>Schedule</span>
        </button>
      </div>
    </div>
  )
}

export default TodaysFocusCard