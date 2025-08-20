import React, { useState } from 'react';
import { Search, Zap, MessageCircle, Users, TrendingUp, Award, Crown, Calendar, Target, Plus, Settings } from 'lucide-react';

const SocialSection = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const friends = [
    { id: 1, name: 'Sarah Chen', status: 'online', avatar: '👩‍💼', streak: 15, activity: 'Completed morning workout', lastSeen: 'Active now' },
    { id: 2, name: 'Mike Johnson', status: 'online', avatar: '👨‍💻', streak: 8, activity: 'Read for 30 minutes', lastSeen: 'Active now' },
    { id: 3, name: 'Emma Davis', status: 'away', avatar: '👩‍🎨', streak: 22, activity: 'Meditated for 15 mins', lastSeen: '15 min ago' },
    { id: 4, name: 'Alex Rivera', status: 'offline', avatar: '👨‍🔬', streak: 5, activity: 'Practiced guitar', lastSeen: '2 hours ago' },
    { id: 5, name: 'Lisa Wong', status: 'online', avatar: '👩‍🎓', streak: 31, activity: 'Morning yoga session', lastSeen: 'Active now' },
    { id: 6, name: 'David Kim', status: 'away', avatar: '👨‍🎨', streak: 12, activity: 'Journaling practice', lastSeen: '45 min ago' }
  ];

  const groups = [
    { 
      id: 1, 
      name: 'Morning Warriors', 
      members: 8, 
      avatar: '🌅', 
      activity: 'Daily morning routines',
      streak: 18,
      challenge: 'Early Bird Challenge',
      progress: 85
    },
    { 
      id: 2, 
      name: 'Fitness Fanatics', 
      members: 12, 
      avatar: '💪', 
      activity: 'Workout accountability',
      streak: 23,
      challenge: '30-Day Strength',
      progress: 67
    },
    { 
      id: 3, 
      name: 'Mindful Minds', 
      members: 6, 
      avatar: '🧘', 
      activity: 'Meditation & mindfulness',
      streak: 45,
      challenge: 'Meditation Marathon',
      progress: 92
    },
    { 
      id: 4, 
      name: 'Book Club', 
      members: 15, 
      avatar: '📚', 
      activity: 'Daily reading habits',
      streak: 12,
      challenge: 'Read 52 Books',
      progress: 43
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const FriendsView = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        {friends.map((friend) => (
          <div 
            key={friend.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
            onMouseEnter={() => setHoveredFriend(friend.id)}
            onMouseLeave={() => setHoveredFriend(null)}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                {friend.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`}></div>
            </div>     
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900 truncate">{friend.name}</p>
                {friend.streak > 20 && <Crown size={14} className="text-yellow-500" />}
                <div className="flex space-x-1 items-center ml-auto">
                  <Zap size={12} className="text-orange-500"/>
                  <span className="text-xs text-orange-600 font-medium">{friend.streak}</span>
                </div>
              </div>
              <div className="relative">
                <p className="text-sm text-gray-500 truncate">{friend.activity}</p>
                <p className="text-xs text-gray-400">{friend.lastSeen}</p>
                {hoveredFriend === friend.id && (
                  <div className="absolute top-0 left-0 right-0 z-10 bg-slate-900 text-white text-sm rounded-lg shadow-lg p-3 border border-slate-700">
                    <div className="font-medium">{friend.name}</div>
                    <div className="text-xs opacity-90">{friend.activity}</div>
                    <div className="text-xs opacity-75 mt-1">{friend.streak} day streak • {friend.lastSeen}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                <MessageCircle size={16} className="text-gray-400"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Friend Insights</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg text-white">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                <TrendingUp className="text-white" size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Group Momentum</h4>
                <p className="text-xs opacity-90">Your friend group's average streak is 15.5 days - you're all crushing it!</p>
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
                <p className="text-xs opacity-90">Emma Davis has similar wellness goals - great accountability partner!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GroupsView = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {groups.map((group) => (
          <div key={group.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg border-2 border-gray-200">
                {group.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{group.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Zap size={12} className="text-orange-500"/>
                    <span className="text-xs text-orange-600 font-medium">{group.streak}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{group.members} members • {group.activity}</p>
              </div>
              <button className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                <MessageCircle size={16} className="text-gray-400"/>
              </button>
            </div>
            
            <div className="bg-white rounded-md p-3 border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target size={14} className="text-blue-500"/>
                  <span className="text-sm font-medium text-gray-900">{group.challenge}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">{group.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${group.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors group">
        <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-gray-600">
          <Plus size={20} />
          <span className="font-medium">Create New Group</span>
        </div>
      </button>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Group Insights</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                <Award className="text-white" size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Top Performer</h4>
                <p className="text-xs opacity-90">You're leading in 2 out of 4 groups this week. Keep it up!</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-white">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-white/20 rounded-md flex-shrink-0">
                <Calendar className="text-white" size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Upcoming Events</h4>
                <p className="text-xs opacity-90">3 group challenges ending this week - time to push harder!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <aside className="fixed right-0 top-0 w-80 h-screen bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg">
              <Users className="text-white" size={24}/>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Social</h1>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-400"/>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings size={20} className="text-gray-400"/>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'friends' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'groups' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Groups ({groups.length})
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'friends' ? <FriendsView /> : <GroupsView />}
      </div>
    </aside>
  );
};

export default SocialSection;