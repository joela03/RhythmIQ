import React, {useState} from 'react'
import {Home, Target, Users, BarChart3, Menu, X, Goal} from 'lucide-react'

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeItem, setActiveItem] = useState('dashboard')

    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-purple-500 to-violet-600' },
        { id: 'goals', label: 'My Goals', icon: Goal, gradient: 'from-blue-500 to-blue-600' },
        { id: 'habits', label: 'Habits', icon: Target, gradient: 'from-green-500 to-emerald-600' },
        { id: 'community', label: 'Community', icon: Users, gradient: 'from-amber-500 to-orange-600' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-red-500 to-rose-600' },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
    };

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-gray-200 shadow-xs transition-all duration-200`}>
            <div className="p-6 border-b border-gray-100">
                {!isCollapsed ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
                                <Target className="text-white" size={20} />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">RhythmIQ</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                            aria-label="Collapse sidebar"
                            title="Collapse sidebar"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg hover:shadow-md transition-all duration-200"
                            aria-label="Expand sidebar"
                            title="Expand sidebar"
                        >
                            <Target className="text-white" size={20} />
                        </button>
                    </div>
                )}
            </div>
            <nav className="p-3">
                <ul className="space-y-2">
                   {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeItem === item.id;

                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => handleItemClick(item.id)}
                                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                                    isActive 
                                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-sm`
                                        : 'text-gray-700 hover:bg-gray-50'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? item.label : ''}
                            >
                                <div className={`${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'} p-1.5 rounded-md transition-colors ${isCollapsed ? '' : 'mr-3'}`}>
                                    <Icon 
                                        size={16} 
                                        className={isActive ? 'text-white' : 'text-gray-600'} 
                                    />
                                </div>
                                {!isCollapsed && (
                                    <span className="font-medium">{item.label}</span>
                                )}
                            </button>
                        </li>

                    )
                   })}
                </ul>
                {!isCollapsed && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg text-white">
                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                                    <Target className="text-white" size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium mb-1">Pro Tip</h4>
                                    <p className="text-xs opacity-90">Track multiple habits to build stronger streaks!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;