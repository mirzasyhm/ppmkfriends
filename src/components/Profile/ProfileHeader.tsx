import React from 'react';
import { MapPin, Calendar, Link as LinkIcon, Verified } from 'lucide-react';
import { User } from '../../types';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isCurrentUser }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            {user.verified && (
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                <Verified size={16} className="text-black" />
              </div>
            )}
          </div>
          
          {isCurrentUser ? (
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium">
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors font-medium">
                Follow
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium">
                Message
              </button>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            {user.verified && (
              <Verified size={20} className="text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-gray-600">@{user.username}</p>
        </div>
        
        {user.bio && (
          <p className="text-gray-900 mb-4 leading-relaxed">{user.bio}</p>
        )}
        
        <div className="flex items-center space-x-6 text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin size={16} />
            <span className="text-sm">Jakarta, Indonesia</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span className="text-sm">Joined March 2023</span>
          </div>
          <div className="flex items-center space-x-1">
            <LinkIcon size={16} />
            <a href="#" className="text-sm text-yellow-600 hover:underline">ppmk.org</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{user.following.toLocaleString()}</span>
            <span className="text-gray-600">Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{user.followers.toLocaleString()}</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{user.posts}</span>
            <span className="text-gray-600">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
