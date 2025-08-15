import React, { useState } from 'react';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface CreatePostProps {
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex space-x-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's happening in PPMK community?"
            className="w-full resize-none border-none outline-none text-xl placeholder-gray-500"
            rows={isExpanded ? 4 : 1}
          />
          
          {isExpanded && (
            <>
              <div className="flex items-center space-x-4 mt-4 text-yellow-600">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-yellow-50 transition-colors">
                  <Image size={20} />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-yellow-50 transition-colors">
                  <Smile size={20} />
                  <span className="text-sm font-medium">Emoji</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-yellow-50 transition-colors">
                  <MapPin size={20} />
                  <span className="text-sm font-medium">Location</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-yellow-50 transition-colors">
                  <Calendar size={20} />
                  <span className="text-sm font-medium">Schedule</span>
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {280 - content.length} characters remaining
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setContent('');
                      setIsExpanded(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Post
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
