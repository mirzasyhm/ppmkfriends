import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import UnifiedFeed from './components/Feed/UnifiedFeed';
import ConversationList from './components/Messages/ConversationList';
import ChatWindow from './components/Messages/ChatWindow';
import ProfileHeader from './components/Profile/ProfileHeader';
import MarketplaceGrid from './components/Marketplace/MarketplaceGrid';
import EventsList from './components/Events/EventsList';
import BroadcastFeed from './components/Broadcast/BroadcastFeed';
import MoneyChangerPage from './components/MoneyChanger/MoneyChangerPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { posts as initialPosts, conversations, currentUser } from './data/mockData';
import { Post } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser,
      content,
      image,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      bookmarked: false
    };
    setPosts([newPost, ...posts]);
  };

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    // In a real app, this would send the message to the backend
  };

  // Admin access check (in real app, this would be based on user role)
  const isAdmin = currentUser.id === '1'; // Mock admin check

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <UnifiedFeed
            posts={posts}
            onCreatePost={handleCreatePost}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        );
      
      case 'marketplace':
        return <MarketplaceGrid />;
      
      case 'events':
        return <EventsList />;
      
      case 'broadcast':
        return <BroadcastFeed />;
      
      case 'money-changer':
        return <MoneyChangerPage />;
      
      case 'messages':
        const selectedConv = conversations.find(c => c.id === selectedConversation);
        return (
          <div className="flex h-full">
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
            <ChatWindow
              conversation={selectedConv || null}
              onSendMessage={handleSendMessage}
            />
          </div>
        );
      
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto">
            <ProfileHeader user={currentUser} isCurrentUser={true} />
            <div className="mt-6 space-y-6">
              {posts.filter(post => post.user.id === currentUser.id).map(post => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                      <p className="text-sm text-gray-500">@{post.user.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-900 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">New event: PPMK Tech Conference</p>
                      <p className="text-sm text-gray-600">Don't miss our biggest tech event of the year!</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Chen liked your post</p>
                      <p className="text-sm text-gray-600">Your photography post received a new like</p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">Account Settings</h3>
                  <p className="text-gray-600">Manage your PPMK account preferences</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">Privacy & Safety</h3>
                  <p className="text-gray-600">Control your privacy settings and safety preferences</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-gray-600">Customize your notification preferences</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">Community Guidelines</h3>
                  <p className="text-gray-600">Review PPMK community rules and guidelines</p>
                </div>
                {isAdmin && (
                  <div 
                    onClick={() => setShowAdminPanel(true)}
                    className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold text-yellow-900">Admin Panel</h3>
                    <p className="text-yellow-700">Access administrative features and controls</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <UnifiedFeed
            posts={posts}
            onCreatePost={handleCreatePost}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={`ml-64 ${activeTab === 'messages' ? 'h-screen' : 'min-h-screen p-6'}`}>
        {renderContent()}
      </main>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminDashboard onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}

export default App;
