import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Verified } from 'lucide-react';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onBookmark }) => {
  const [showComments, setShowComments] = useState(false);

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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
              {post.user.verified && (
                <Verified size={16} className="text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500">@{post.user.username} · {formatTime(post.timestamp)}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
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

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
              post.liked
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Heart size={18} className={post.liked ? 'fill-current' : ''} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <Share size={18} />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
