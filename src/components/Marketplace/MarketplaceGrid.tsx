import React, { useState } from 'react';
import { Search, Filter, MapPin, Heart, Star } from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
  };
  location: string;
  category: string;
  condition: string;
  liked: boolean;
}

const MarketplaceGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'books', name: 'Books' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'sports', name: 'Sports' },
    { id: 'services', name: 'Services' }
  ];

  const [items, setItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      title: 'MacBook Pro 16" M2 - Excellent Condition',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      seller: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        rating: 4.9
      },
      location: 'Jakarta, Indonesia',
      category: 'electronics',
      condition: 'Like New',
      liked: false
    },
    {
      id: '2',
      title: 'Complete Data Science Textbook Collection',
      price: 150,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      seller: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        rating: 4.7
      },
      location: 'Bandung, Indonesia',
      category: 'books',
      condition: 'Good',
      liked: true
    },
    {
      id: '3',
      title: 'Modern Office Chair - Ergonomic Design',
      price: 300,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      seller: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 4.8
      },
      location: 'Surabaya, Indonesia',
      category: 'furniture',
      condition: 'Excellent',
      liked: false
    },
    {
      id: '4',
      title: 'Professional Photography Services',
      price: 500,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      seller: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        rating: 5.0
      },
      location: 'Jakarta, Indonesia',
      category: 'services',
      condition: 'Service',
      liked: false
    },
    {
      id: '5',
      title: 'Designer Jacket - Premium Brand',
      price: 200,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      seller: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
        rating: 4.6
      },
      location: 'Yogyakarta, Indonesia',
      category: 'clothing',
      condition: 'Like New',
      liked: true
    },
    {
      id: '6',
      title: 'Professional Tennis Racket Set',
      price: 120,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      seller: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        rating: 4.5
      },
      location: 'Medan, Indonesia',
      category: 'sports',
      condition: 'Good',
      liked: false
    }
  ]);

  const handleLike = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, liked: !item.liked }
        : item
    ));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PPMK Marketplace</h1>
        <p className="text-gray-600">Buy and sell within the PPMK community</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleLike(item.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  item.liked
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className={item.liked ? 'fill-current' : ''} />
              </button>
              <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium">
                {item.condition}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-3">
                Rp {item.price.toLocaleString()}
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.seller.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500">{item.seller.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-500 mb-4">
                <MapPin size={14} />
                <span className="text-sm">{item.location}</span>
              </div>
              
              <button className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceGrid;
