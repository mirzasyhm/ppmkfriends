import { User, Post, Conversation, Message } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Digital creator & photographer 📸 | Coffee enthusiast ☕ | Exploring the world one pixel at a time',
  followers: 2847,
  following: 892,
  posts: 156,
  verified: true
};

export const users: User[] = [
  {
    id: '2',
    name: 'Sarah Chen',
    username: 'sarahc',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'UX Designer | Tech enthusiast | Dog lover 🐕',
    followers: 1523,
    following: 445,
    posts: 89,
    verified: true
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    username: 'marcusr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Software Engineer | Open source contributor | Basketball fan 🏀',
    followers: 3421,
    following: 678,
    posts: 234,
    verified: false
  },
  {
    id: '4',
    name: 'Emma Thompson',
    username: 'emmat',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel blogger | Foodie | Adventure seeker ✈️',
    followers: 5672,
    following: 1234,
    posts: 445,
    verified: true
  },
  {
    id: '5',
    name: 'David Kim',
    username: 'davidk',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Startup founder | Tech investor | Mentor',
    followers: 8934,
    following: 567,
    posts: 123,
    verified: true
  }
];

export const posts: Post[] = [
  {
    id: '1',
    user: users[0],
    content: 'Just finished designing a new mobile app interface! The user experience is everything when it comes to creating meaningful digital products. What do you think makes a great UX? 🤔',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 234,
    comments: 45,
    shares: 12,
    liked: false,
    bookmarked: true
  },
  {
    id: '2',
    user: users[1],
    content: 'Working on a new open source project that could revolutionize how we handle state management in React applications. Excited to share more details soon! 🚀',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 567,
    comments: 89,
    shares: 34,
    liked: true,
    bookmarked: false
  },
  {
    id: '3',
    user: users[2],
    content: 'Amazing sunset from my recent trip to Santorini! Sometimes you need to disconnect from the digital world and appreciate the beauty around us. 🌅',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 892,
    comments: 156,
    shares: 67,
    liked: true,
    bookmarked: true
  },
  {
    id: '4',
    user: users[3],
    content: 'Excited to announce that our startup just closed Series A funding! Thank you to all our investors and supporters who believed in our vision. The journey continues! 💪',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 1234,
    comments: 234,
    shares: 89,
    liked: false,
    bookmarked: false
  },
  {
    id: '5',
    user: currentUser,
    content: 'Captured this incredible street art during my morning walk. There\'s so much creativity in our cities if you just take the time to look around! 📸',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 445,
    comments: 67,
    shares: 23,
    liked: false,
    bookmarked: false
  }
];

export const conversations: Conversation[] = [
  {
    id: '1',
    participants: [users[0]],
    lastMessage: {
      id: '1',
      senderId: '2',
      content: 'Hey! I saw your latest design work, it looks amazing! 🎨',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    unreadCount: 2,
    isGroup: false
  },
  {
    id: '2',
    participants: [users[1]],
    lastMessage: {
      id: '2',
      senderId: '3',
      content: 'Thanks for the code review! I\'ll implement those changes.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: '3',
    participants: [users[0], users[1], users[2]],
    lastMessage: {
      id: '3',
      senderId: '2',
      content: 'Should we meet tomorrow for the project discussion?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false
    },
    unreadCount: 1,
    isGroup: true,
    groupName: 'Design Team',
    groupAvatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop'
  },
  {
    id: '4',
    participants: [users[2]],
    lastMessage: {
      id: '4',
      senderId: '4',
      content: 'The photos from Santorini are incredible! 📸',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true
    },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: '5',
    participants: [users[1], users[2], users[3]],
    lastMessage: {
      id: '5',
      senderId: '5',
      content: 'Congratulations on the funding! 🎉',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      read: true
    },
    unreadCount: 0,
    isGroup: true,
    groupName: 'Startup Friends',
    groupAvatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&h=150&fit=crop'
  }
];
