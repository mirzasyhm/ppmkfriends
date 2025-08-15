import React from 'react';
import { Users, Calendar, Radio, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Events',
      value: '23',
      change: '+5',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Live Broadcasts',
      value: '4',
      change: '+2',
      changeType: 'positive',
      icon: Radio,
      color: 'bg-red-500'
    },
    {
      title: 'Daily Messages',
      value: '1,234',
      change: '+8%',
      changeType: 'positive',
      icon: MessageCircle,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'New user registered: Sarah Johnson',
      time: '5 minutes ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      type: 'event',
      message: 'Event "Tech Workshop" created by Marcus Rodriguez',
      time: '15 minutes ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      type: 'broadcast',
      message: 'Live broadcast started: "Career Development"',
      time: '30 minutes ago',
      icon: Radio,
      color: 'text-red-600'
    },
    {
      type: 'report',
      message: 'Content reported by user for review',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in PPMKFriends today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <button className="text-yellow-600 hover:text-yellow-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <div className="font-medium text-yellow-900">Create New Event</div>
              <div className="text-yellow-700 text-sm">Schedule community events</div>
            </button>
            <button className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <div className="font-medium text-red-900">Start Broadcast</div>
              <div className="text-red-700 text-sm">Go live to the community</div>
            </button>
            <button className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-900">Register New User</div>
              <div className="text-blue-700 text-sm">Add community members</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Status</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Sessions</span>
              <span className="text-gray-900 font-medium">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="text-gray-900 font-medium">120ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-900">3 reports to review</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-900">5 events pending approval</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-900">2 user verifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
