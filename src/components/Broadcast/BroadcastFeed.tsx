import React, { useState } from 'react';
import { Radio, Users, Eye, MessageCircle, Share, Play, Pause } from 'lucide-react';

interface Broadcast {
  id: string;
  title: string;
  description: string;
  broadcaster: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  viewers: number;
  isLive: boolean;
  thumbnail: string;
  category: string;
  startTime: Date;
  duration?: number;
}

const BroadcastFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Broadcasts' },
    { id: 'education', name: 'Education' },
    { id: 'tech', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'entertainment', name: 'Entertainment' }
  ];

  const broadcasts: Broadcast[] = [
    {
      id: '1',
      title: 'Live: PPMK Career Development Workshop',
      description: 'Join our career experts as they discuss the latest trends in professional development and share tips for advancing your career in 2024.',
      broadcaster: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        verified: true
      },
      viewers: 1247,
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      category: 'education',
      startTime: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Tech Talk: Future of AI in Indonesia',
      description: 'Exploring how artificial intelligence is shaping the future of technology and business in Indonesia. Q&A session included.',
      broadcaster: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        verified: true
      },
      viewers: 892,
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop',
      category: 'tech',
      startTime: new Date(Date.now() - 20 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Startup Success Stories',
      description: 'Recorded session featuring successful PPMK entrepreneurs sharing their journey from idea to successful business.',
      broadcaster: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        verified: false
      },
      viewers: 2341,
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop',
      category: 'business',
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 3600
    },
    {
      id: '4',
      title: 'Live: Healthy Living Tips for Professionals',
      description: 'Join our wellness expert for practical tips on maintaining a healthy lifestyle while managing a busy professional career.',
      broadcaster: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        verified: true
      },
      viewers: 567,
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop',
      category: 'lifestyle',
      startTime: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '5',
      title: 'PPMK Talent Show Highlights',
      description: 'Best moments from our recent talent show featuring amazing performances by PPMK community members.',
      broadcaster: {
        name: 'PPMK Events',
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop',
        verified: true
      },
      viewers: 1834,
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
      category: 'entertainment',
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: 2700
    }
  ];

  const filteredBroadcasts = broadcasts.filter(broadcast => 
    selectedCategory === 'all' || broadcast.category === selectedCategory
  );

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PPMK Broadcast</h1>
        <p className="text-gray-600">Watch live streams and recorded content from the community</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Broadcasts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Radio className="text-red-500" size={24} />
          <span>Live Now</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBroadcasts.filter(b => b.isLive).map(broadcast => (
            <div key={broadcast.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={broadcast.thumbnail}
                  alt={broadcast.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{formatViewers(broadcast.viewers)}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-colors">
                    <Play size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{broadcast.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{broadcast.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={broadcast.broadcaster.avatar}
                    alt={broadcast.broadcaster.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900">{broadcast.broadcaster.name}</p>
                      {broadcast.broadcaster.verified && (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-black text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{formatViewers(broadcast.viewers)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>Chat</span>
                    </div>
                  </div>
                  <button className="hover:text-gray-700">
                    <Share size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recorded Broadcasts Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Recordings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBroadcasts.filter(b => !b.isLive).map(broadcast => (
            <div key={broadcast.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={broadcast.thumbnail}
                  alt={broadcast.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {broadcast.duration && formatDuration(broadcast.duration)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-colors">
                    <Play size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{broadcast.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{broadcast.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={broadcast.broadcaster.avatar}
                    alt={broadcast.broadcaster.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900">{broadcast.broadcaster.name}</p>
                      {broadcast.broadcaster.verified && (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-black text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{formatViewers(broadcast.viewers)}</span>
                    </div>
                  </div>
                  <button className="hover:text-gray-700">
                    <Share size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredBroadcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No broadcasts found in this category</p>
        </div>
      )}
    </div>
  );
};

export default BroadcastFeed;
