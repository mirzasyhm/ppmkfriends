import React, { useState } from 'react';
import { Radio, Users, Eye, Clock, Image, Save, X, Play } from 'lucide-react';

const BroadcastCreator: React.FC = () => {
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    description: '',
    category: 'education',
    scheduledTime: '',
    thumbnail: '',
    isLive: false,
    isScheduled: false,
    maxViewers: '',
    allowChat: true,
    recordSession: true,
    notifyUsers: true
  });

  const categories = [
    { id: 'education', name: 'Education' },
    { id: 'tech', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'announcement', name: 'Announcement' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setBroadcastData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating broadcast:', broadcastData);
    // Here you would typically send the data to your backend
    alert('Broadcast created successfully!');
    
    // Reset form
    setBroadcastData({
      title: '',
      description: '',
      category: 'education',
      scheduledTime: '',
      thumbnail: '',
      isLive: false,
      isScheduled: false,
      maxViewers: '',
      allowChat: true,
      recordSession: true,
      notifyUsers: true
    });
  };

  const handleGoLive = () => {
    if (!broadcastData.title || !broadcastData.description) {
      alert('Please fill in title and description before going live');
      return;
    }
    setBroadcastData(prev => ({ ...prev, isLive: true }));
    alert('Going live! Your broadcast is now active.');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Broadcast</h2>
          <p className="text-gray-600">Start live streams or schedule broadcasts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Radio className="text-red-600" size={24} />
          {broadcastData.isLive && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Broadcast Title *
            </label>
            <input
              type="text"
              name="title"
              value={broadcastData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              placeholder="Enter broadcast title"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={broadcastData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
              placeholder="Describe your broadcast content..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={broadcastData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-1" />
              Max Viewers (Optional)
            </label>
            <input
              type="number"
              name="maxViewers"
              value={broadcastData.maxViewers}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              placeholder="Maximum number of viewers"
            />
          </div>
        </div>

        {/* Scheduling */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              name="isScheduled"
              checked={broadcastData.isScheduled}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="font-medium text-blue-900">
              <Clock size={16} className="inline mr-1" />
              Schedule for later
            </label>
          </div>
          
          {broadcastData.isScheduled && (
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Scheduled Time
              </label>
              <input
                type="datetime-local"
                name="scheduledTime"
                value={broadcastData.scheduledTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image size={16} className="inline mr-1" />
            Thumbnail Image URL
          </label>
          <input
            type="url"
            name="thumbnail"
            value={broadcastData.thumbnail}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            placeholder="https://example.com/thumbnail.jpg"
          />
          {broadcastData.thumbnail && (
            <div className="mt-3">
              <img
                src={broadcastData.thumbnail}
                alt="Thumbnail preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Broadcast Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Broadcast Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="allowChat"
                checked={broadcastData.allowChat}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-gray-700">Enable live chat</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="recordSession"
                checked={broadcastData.recordSession}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-gray-700">Record broadcast</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="notifyUsers"
                checked={broadcastData.notifyUsers}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-gray-700">Notify all users</span>
            </label>
          </div>
        </div>

        {/* Live Stats (shown when live) */}
        {broadcastData.isLive && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-4 flex items-center space-x-2">
              <Radio className="text-red-600" size={20} />
              <span>Live Broadcast Stats</span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">247</div>
                <div className="text-sm text-red-700">Current Viewers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1,234</div>
                <div className="text-sm text-red-700">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">45m</div>
                <div className="text-sm text-red-700">Duration</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {!broadcastData.isLive && !broadcastData.isScheduled && (
              <button
                type="button"
                onClick={handleGoLive}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 font-medium"
              >
                <Play size={16} />
                <span>Go Live Now</span>
              </button>
            )}
            
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2 font-medium"
            >
              <Save size={16} />
              <span>{broadcastData.isScheduled ? 'Schedule Broadcast' : 'Save Broadcast'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BroadcastCreator;
