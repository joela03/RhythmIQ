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
        <aside className={`${isCollapsed ? 'w-20' : 'w-50'} h-screen bg-white border-r border-gray-200`}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                {!isCollapsed && (
                    <h1 className="text-xl font-bold text-gray-900">RhythmIQ</h1>
                )}
                <button
                    onClick={toggleSidebar}
                    className='p-1 rounded-lg hover:bg-gray-100 transition-colors'
                    aria-label='Change sidebar'
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
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
            </nav>
        </aside>
    );
};

export default Sidebar;