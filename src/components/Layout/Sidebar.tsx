import React from 'react';
import { Home, MessageCircle, User, Bell, Settings, ShoppingBag, Calendar, Radio, DollarSign } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'broadcast', icon: Radio, label: 'Broadcast' },
    { id: 'money-changer', icon: DollarSign, label: 'Money Changer' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-yellow-400">PPMKFriends</h1>
        <p className="text-gray-400 text-sm">Community Platform</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
              }`}
            >
              <Icon size={24} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-xs text-gray-500 text-center">
          © 2024 PPMKFriends
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
