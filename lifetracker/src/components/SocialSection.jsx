import React, { useState } from 'react'
import { Contact, Search, Zap, MessageCircle, Users, TrendingUp, Award} from 'lucide-react'

const SocialSection = () => {

    const [hoveredFriend, setHoveredFriend] = useState(null);
    
    const friends = [
        { id: 1, name: 'Sarah Chen', status: 'online', avatar: '👩‍💼', streak: 15, activity: 'Completed morning workout' },
        { id: 2, name: 'Mike Johnson', status: 'online', avatar: '👨‍💻', streak: 8, activity: 'Read for 30 minutes' },
        { id: 3, name: 'Emma Davis', status: 'away', avatar: '👩‍🎨', streak: 22, activity: 'Meditated for 15 mins' },
        { id: 4, name: 'Alex Rivera', status: 'offline', avatar: '👨‍🔬', streak: 5, activity: 'Practiced guitar' }
    ]

    const getStatusColor = (status) => {
    switch(status) {
        case 'online': return 'bg-green-400'
        case 'away': return 'bg-yellow-400'
        case 'offline': return 'bg-gray-400'
        default: return 'bg-gray-400'
    }
    }

    return (
        <aside className='fixed right-0 top-0 w-70 h-screen bg-white border-l border-gray-200 overflow-y-auto'>
            <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg'>
                            <Users className='text-white bg-purple' size={24}/>
                        </div>
                        <h1 className='text-xl font-bold text-gray-900'>Social</h1>
                    </div>
                    <button className='p-2 rounded-lg hover:bg-gray-100 transition-colors'>
                        <Search size={20}/>
                    </button>
                </div>
        
            </div>
            <div className='p-4'>
                <div>
                    {friends.map((friend) => (
                        <div 
                            key={friend.id}
                            className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
                            onMouseEnter={() => setHoveredFriend(friend.id)}
                            onMouseLeave={() => setHoveredFriend(null)}
                        >
                            <div className='relative'>
                                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg'>
                                    {friend.avatar}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`}></div>
                            </div>     
                            <div className='flex-1 min-w-0'>
                                <div className='flex items-center space-x-2'>
                                    <p className='font-medium text-gray-900 truncate'>{friend.name}</p>
                                    <div className='flex space-x-2 items-center'>
                                        <Zap size={12} className='text-orange-500'/>
                                        <span className='text-xs text-orange-600 font-medium'>{friend.streak}</span>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <p className='text-sm text-gray-500 truncate'>{friend.activity}</p>
                                    {hoveredFriend == friend.id && (
                                        <div className='absolute p-3 top-0 left-0 right-0 z-10 bg-slate-900 text-white text-sm rounded-lg shadow-lg border-slate-700'>
                                            <div className='relative'>
                                                {friend.activity}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className='p-1 rounded-full hover:bg-gray-200 transition-colors'>
                                <MessageCircle size={16} className='text-gray-400'/>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Social Insights</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg text-white">
                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                                    <TrendingUp className="text-white" size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium mb-1">Group Momentum</h4>
                                    <p className="text-xs opacity-90">Your friend group's average streak is 12.5 days - you're performing above average!</p>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-medium opacity-90">Confidence: 92%</span>
                                <div className="w-16 bg-white/30 rounded-full h-1.5">
                                    <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                                    <Users className="text-white" size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium mb-1">Perfect Partner</h4>
                                    <p className="text-xs opacity-90">Emma Davis has similar wellness goals - consider becoming accountability partners!</p>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-medium opacity-90">Confidence: 78%</span>
                                <div className="w-16 bg-white/30 rounded-full h-1.5">
                                    <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white">
                            <div className="flex items-start space-x-3">
                                <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                                    <Award className="text-white" size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium mb-1">Weekly Challenge</h4>
                                    <p className="text-xs opacity-90">Start a group challenge to boost everyone's motivation this week!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
};

export default SocialSection;