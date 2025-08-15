import React from 'react';
import { Search, Edit } from 'lucide-react';
import { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation
}) => {
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

  const getConversationName = (conversation: Conversation) => {
    if (conversation.isGroup) {
      return conversation.groupName || 'Group Chat';
    }
    return conversation.participants[0]?.name || 'Unknown';
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.isGroup) {
      return conversation.groupAvatar || conversation.participants[0]?.avatar;
    }
    return conversation.participants[0]?.avatar;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Edit size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
              selectedConversation === conversation.id ? 'bg-yellow-50 border-r-2 border-yellow-400' : ''
            }`}
          >
            <div className="relative">
              <img
                src={getConversationAvatar(conversation)}
                alt={getConversationName(conversation)}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.isGroup && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">
                    {conversation.participants.length}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {getConversationName(conversation)}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatTime(conversation.lastMessage.timestamp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage.content}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="bg-yellow-400 text-black text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
