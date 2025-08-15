import React, { useState } from 'react';
import { Users, Calendar, Radio, Plus, Settings, BarChart3, Shield, AlertTriangle } from 'lucide-react';
import EventCreator from './EventCreator';
import BroadcastCreator from './BroadcastCreator';
import UserRegistration from './UserRegistration';
import AdminStats from './AdminStats';
import EventModerator from './EventModerator';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview', color: 'text-blue-600' },
    { id: 'events', icon: Calendar, label: 'Create Event', color: 'text-green-600' },
    { id: 'moderate-events', icon: AlertTriangle, label: 'Moderate Events', color: 'text-orange-600', badge: 3 },
    { id: 'broadcast', icon: Radio, label: 'Create Broadcast', color: 'text-red-600' },
    { id: 'users', icon: Users, label: 'User Registration', color: 'text-purple-600' },
    { id: 'moderation', icon: Shield, label: 'Content Moderation', color: 'text-orange-600' },
    { id: 'settings', icon: Settings, label: 'Admin Settings', color: 'text-gray-600' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminStats />;
      case 'events':
        return <EventCreator />;
      case 'moderate-events':
        return <EventModerator />;
      case 'broadcast':
        return <BroadcastCreator />;
      case 'users':
        return <UserRegistration />;
      case 'moderation':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Moderation</h2>
            <div className="space-y-4">
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Reported Posts</h3>
                <p className="text-orange-700">3 posts pending review</p>
                <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Review Reports
                </button>
              </div>
              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">User Reports</h3>
                <p className="text-yellow-700">1 user account flagged for review</p>
                <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  Review Users
                </button>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Community Guidelines</h3>
                <p className="text-gray-600 mb-4">Manage community rules and posting guidelines</p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Edit Guidelines
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Platform Settings</h3>
                <p className="text-gray-600 mb-4">Configure platform-wide settings and features</p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Manage Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-black border-r border-gray-800 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-yellow-400">Admin Panel</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-400 text-sm">PPMKFriends Management</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={24} className={activeSection === item.id ? 'text-black' : item.color} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeSection === item.id 
                      ? 'bg-black text-yellow-400' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
