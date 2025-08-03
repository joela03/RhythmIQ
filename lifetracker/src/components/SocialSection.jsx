import React from 'react'
import { Contact, Search, Zap, MessageCircle } from 'lucide-react'

const SocialSection = () => {
    
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
        <aside className='fixed right-0 top-0 w-80'>
            <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center justify-between mb-4'>
                    <Contact/>
                    <h1>Social</h1>
                </div>
                <button>
                    <Search size={20}/>
                </button>
            </div>
            <div className='p-4'>
                <div>
                    {friends.map((friend) => (
                        <div key={friend.id} className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'>
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
                                <p className='text-sm text-gray-500 truncate'>{friend.activity}</p>
                            </div>
                            <button className='p-1 rounded-full hover:bg-gray-200 transition-colors'>
                                <MessageCircle size={16} className='text-gray-400'/>
                            </button>
                        </div>
                    ))}
                </div>

            </div>

        </aside>
    )
};

export default SocialSection;