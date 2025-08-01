import React from 'react'
import {Home, Target, Users, BarChart3, Settings, Goal, BarChart } from 'lucide-react'

const Sidebar = () => {
    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home},
        { id: 'goals', label: 'My Goals', icon: Goal},
        { id: 'habits', label: 'Habits', icon: Target},
        { id: 'community', label: 'Community', icon: Users},
        { id: 'analytics', label: 'Analytics', icon: BarChart3},
        { id: 'goals', label: 'My Goals', icon: Home}
    ]

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">RhythmIQ</h1>
            </div>
            <nav className="p-4">
                <ul>
                   {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <li key={item.id}>
                            <div>
                                <Icon size={20} />
                                <span>{item.label}</span>
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