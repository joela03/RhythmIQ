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
        <aside>
            <div>
                <h1>RhythmIQ</h1>
            </div>
            <nav>
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
    )
}

export default Sidebar;