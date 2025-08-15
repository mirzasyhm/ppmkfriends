import React, { useState } from 'react';
import { Filter, TrendingUp, Clock, Heart, MessageCircle, Share, ShoppingBag, Calendar, Radio, Users } from 'lucide-react';
import CreatePost from './CreatePost';
import { Post } from '../../types';

interface FeedItem {
  id: string;
  type: 'post' | 'marketplace' | 'event' | 'broadcast';
  timestamp: Date;
  data: any;
}

interface UnifiedFeedProps {
  posts: Post[];
  onCreatePost: (content: string, image?: string) => void;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

const UnifiedFeed: React.FC<UnifiedFeedProps> = ({ posts, onCreatePost, onLike, onBookmark }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data for other content types
  const marketplaceItems = [
    {
      id: 'mp1',
      title: 'MacBook Pro M3 - Like New',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      seller: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        rating: 4.8
      },
      category: 'Electronics',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 'mp2',
      title: 'Photography Course Bundle',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      seller: {
        name: 'Lisa Wong',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        rating: 4.9
      },
      category: 'Education',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
    }
  ];

  const events = [
    {
      id: 'ev1',
      title: 'PPMK Tech Conference 2024',
      date: new Date('2024-03-15'),
      time: '09:00 AM',
      location: 'Jakarta Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      attendees: 245,
      maxAttendees: 500,
      organizer: {
        name: 'PPMK Tech Committee',
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop'
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 'ev2',
      title: 'Digital Marketing Workshop',
      date: new Date('2024-03-05'),
      time: '02:00 PM',
      location: 'PPMK Training Center',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      attendees: 34,
      maxAttendees: 50,
      organizer: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000)
    }
  ];

  const broadcasts = [
    {
      id: 'br1',
      title: 'Live: PPMK Community Q&A Session',
      description: 'Join our monthly community discussion about upcoming initiatives and member feedback.',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      broadcaster: {
        name: 'PPMK Official',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
      },
      viewers: 234,
      isLive: true,
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 'br2',
      title: 'Startup Success Stories',
      description: 'Recorded session featuring successful PPMK entrepreneurs sharing their journey.',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      broadcaster: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
      },
      viewers: 1250,
      isLive: false,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  // Combine all content into unified feed
  const createFeedItems = (): FeedItem[] => {
    const feedItems: FeedItem[] = [];

    // Add posts
    posts.forEach(post => {
      feedItems.push({
        id: `post-${post.id}`,
        type: 'post',
        timestamp: post.timestamp,
        data: post
      });
    });

    // Add marketplace items
    marketplaceItems.forEach(item => {
      feedItems.push({
        id: `marketplace-${item.id}`,
        type: 'marketplace',
        timestamp: item.timestamp,
        data: item
      });
    });

    // Add events
    events.forEach(event => {
      feedItems.push({
        id: `event-${event.id}`,
        type: 'event',
        timestamp: event.timestamp,
        data: event
      });
    });

    // Add broadcasts
    broadcasts.forEach(broadcast => {
      feedItems.push({
        id: `broadcast-${broadcast.id}`,
        type: 'broadcast',
        timestamp: broadcast.timestamp,
        data: broadcast
      });
    });

    return feedItems;
  };

  const filterItems = (items: FeedItem[]) => {
    let filtered = items;

    if (selectedFilter !== 'all') {
      filtered = items.filter(item => item.type === selectedFilter);
    }

    // Sort items
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else if (sortBy === 'popular') {
      // Mock popularity sorting - in real app, this would be based on engagement metrics
      filtered.sort((a, b) => Math.random() - 0.5);
    }

    return filtered;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'post':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={item.data.user.avatar}
                  alt={item.data.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.data.user.name}</h3>
                  <p className="text-sm text-gray-500">@{item.data.user.username} · {formatTime(item.timestamp)}</p>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Community Post
              </span>
            </div>
            
            <p className="text-gray-900 leading-relaxed mb-4">{item.data.content}</p>
            
            {item.data.image && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <img
                  src={item.data.image}
                  alt="Post content"
                  className="w-full h-80 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => onLike(item.data.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
                  item.data.liked
                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className={item.data.liked ? 'fill-current' : ''} />
                <span className="text-sm font-medium">{item.data.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{item.data.comments}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <Share size={18} />
                <span className="text-sm font-medium">{item.data.shares}</span>
              </button>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <ShoppingBag size={12} />
                  <span>Marketplace</span>
                </span>
                <span className="text-sm text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-1/3">
                <img
                  src={item.data.image}
                  alt={item.data.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-bold text-gray-900 mb-2">{item.data.title}</h3>
                <p className="text-2xl font-bold text-green-600 mb-3">{formatPrice(item.data.price)}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.data.seller.avatar}
                      alt={item.data.seller.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{item.data.seller.name}</span>
                    <span className="text-xs text-yellow-600">★ {item.data.seller.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                    View Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>Event</span>
                </span>
                <span className="text-sm text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-1/3">
                <img
                  src={item.data.image}
                  alt={item.data.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-bold text-gray-900 mb-2">{item.data.title}</h3>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600">
                    📅 {item.data.date.toLocaleDateString()} at {item.data.time}
                  </p>
                  <p className="text-sm text-gray-600">📍 {item.data.location}</p>
                  <p className="text-sm text-gray-600">
                    👥 {item.data.attendees}/{item.data.maxAttendees} attending
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.data.organizer.avatar}
                      alt={item.data.organizer.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{item.data.organizer.name}</span>
                  </div>
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'broadcast':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                    item.data.isLive 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <Radio size={12} />
                    <span>{item.data.isLive ? 'Live' : 'Broadcast'}</span>
                  </span>
                  {item.data.isLive && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">LIVE</span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-1/3 relative">
                <img
                  src={item.data.thumbnail}
                  alt={item.data.title}
                  className="w-full h-32 object-cover"
                />
                {item.data.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    LIVE
                  </div>
                )}
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-bold text-gray-900 mb-2">{item.data.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.data.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.data.broadcaster.avatar}
                      alt={item.data.broadcaster.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{item.data.broadcaster.name}</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users size={14} />
                      <span className="text-xs">{item.data.viewers}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                    {item.data.isLive ? 'Watch Live' : 'Watch'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const feedItems = filterItems(createFeedItems());

  const filters = [
    { id: 'all', label: 'All Content', count: feedItems.length },
    { id: 'post', label: 'Posts', count: posts.length },
    { id: 'marketplace', label: 'Marketplace', count: marketplaceItems.length },
    { id: 'event', label: 'Events', count: events.length },
    { id: 'broadcast', label: 'Broadcasts', count: broadcasts.length }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Post */}
      <CreatePost onCreatePost={onCreatePost} />

      {/* Feed Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Community Feed</h2>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>
            <Filter size={16} className="text-gray-500" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-6">
        {feedItems.map(item => (
          <div key={item.id}>
            {renderFeedItem(item)}
          </div>
        ))}
      </div>

      {feedItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No content found for the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default UnifiedFeed;
