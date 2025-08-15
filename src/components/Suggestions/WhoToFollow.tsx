import React from 'react';
import { UserPlus, Verified } from 'lucide-react';
import { users } from '../../data/mockData';

const WhoToFollow: React.FC = () => {
  const suggestions = users.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Who to follow</h2>
      
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  {user.verified && (
                    <Verified size={16} className="text-blue-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <p className="text-xs text-gray-400">{user.followers.toLocaleString()} followers</p>
              </div>
            </div>
            
            <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <UserPlus size={16} />
              <span className="text-sm font-medium">Follow</span>
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-blue-500 hover:text-blue-600 font-medium">
        Show more
      </button>
    </div>
  );
};

export default WhoToFollow;
