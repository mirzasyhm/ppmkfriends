export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  verified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  bookmarked: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

export interface ExchangeRequest {
  id: string;
  user: User;
  fromCurrency: 'KRW' | 'MYR';
  toCurrency: 'KRW' | 'MYR';
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  location: string;
  description: string;
  timestamp: Date;
  status: 'active' | 'completed' | 'cancelled';
  expiresAt: Date;
  contactMethod: 'message' | 'phone' | 'email';
  isUrgent: boolean;
  minAmount?: number;
  maxAmount?: number;
}
