import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingTopics: React.FC = () => {
  const trends = [
    { topic: '#ReactJS', posts: '125K posts', category: 'Technology' },
    { topic: '#DesignSystem', posts: '89K posts', category: 'Design' },
    { topic: '#WebDevelopment', posts: '234K posts', category: 'Technology' },
    { topic: '#UXDesign', posts: '156K posts', category: 'Design' },
    { topic: '#JavaScript', posts: '445K posts', category: 'Technology' },
    { topic: '#Startup', posts: '67K posts', category: 'Business' },
    { topic: '#AI', posts: '789K posts', category: 'Technology' },
    { topic: '#Photography', posts: '234K posts', category: 'Creative' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp size={24} className="text-blue-500" />
        <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
      </div>
      
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">#{index + 1} · {trend.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{trend.topic}</h3>
              <p className="text-sm text-gray-500">{trend.posts}</p>
            </div>
            <TrendingUp size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
