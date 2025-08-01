import React, {useState} from 'react'
import {Home, Target, Users, BarChart3, Menu, X, Goal} from 'lucide-react'

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home},
        { id: 'goals', label: 'My Goals', icon: Goal},
        { id: 'habits', label: 'Habits', icon: Target},
        { id: 'community', label: 'Community', icon: Users},
        { id: 'analytics', label: 'Analytics', icon: BarChart3},
    ]

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

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
            <nav className="p-4">
                <ul className="space-y-2">
                   {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <li key={item.id}>
                            <div className='flex items-center px-3 py-2.5 text-gray-700 rounded-lg'>
                                <Icon size={20} className={`text-gray-400 ${isCollapsed ? '' : 'mr-3'}`}/>
                                {!isCollapsed && <span>{item.label}</span>}
                            </div>
                        </li>
                    )
                   })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;