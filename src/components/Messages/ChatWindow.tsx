import React, { useState } from 'react';
import { Send, Phone, Video, Info, Smile, Paperclip } from 'lucide-react';
import { Conversation, Message } from '../../types';
import { currentUser } from '../../data/mockData';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onSendMessage }) => {
  const [message, setMessage] = useState('');

  // Mock messages for the selected conversation
  const messages: Message[] = [
    {
      id: '1',
      senderId: conversation?.participants[0]?.id || '2',
      content: 'Hey! I saw your latest design work, it looks amazing! 🎨',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    },
    {
      id: '2',
      senderId: currentUser.id,
      content: 'Thank you so much! I really appreciate the feedback. It took me quite a while to get the colors just right.',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      read: true
    },
    {
      id: '3',
      senderId: conversation?.participants[0]?.id || '2',
      content: 'The color palette is perfect! How did you decide on those specific shades?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      senderId: currentUser.id,
      content: 'I used a combination of color theory and user testing. The blacks and yellows convey professionalism while adding energy.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-600">Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  const getConversationName = () => {
    if (conversation.isGroup) {
      return conversation.groupName || 'Group Chat';
    }
    return conversation.participants[0]?.name || 'Unknown';
  };

  const getConversationAvatar = () => {
    if (conversation.isGroup) {
      return conversation.groupAvatar || conversation.participants[0]?.avatar;
    }
    return conversation.participants[0]?.avatar;
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={getConversationAvatar()}
            alt={getConversationName()}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{getConversationName()}</h3>
            <p className="text-sm text-gray-500">
              {conversation.isGroup 
                ? `${conversation.participants.length} members`
                : 'Active now'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Info size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === currentUser.id;
          const sender = isCurrentUser ? currentUser : conversation.participants.find(p => p.id === msg.senderId);
          
          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!isCurrentUser && (
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} className="text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full resize-none outline-none focus:bg-white focus:ring-2 focus:ring-yellow-400"
              rows={1}
            />
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile size={20} className="text-gray-600" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
