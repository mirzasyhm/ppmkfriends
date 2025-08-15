import React, { useState } from 'react';
import { Plus, Filter, Search, TrendingUp, DollarSign, Users, Clock, RefreshCw } from 'lucide-react';
import CreateExchangeRequest from './CreateExchangeRequest';
import ExchangeRequestCard from './ExchangeRequestCard';
import { ExchangeRequest } from '../../types';
import { users, currentUser } from '../../data/mockData';

const MoneyChangerPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([
    {
      id: '1',
      user: users[0],
      fromCurrency: 'KRW',
      toCurrency: 'MYR',
      fromAmount: 1000000,
      toAmount: 3400,
      exchangeRate: 0.0034,
      location: 'Kuala Lumpur City Center',
      description: 'Looking to exchange Korean Won to Malaysian Ringgit. Flexible with timing and can meet anywhere in KLCC area.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
      contactMethod: 'message',
      isUrgent: false,
      minAmount: 500000,
      maxAmount: 2000000
    },
    {
      id: '2',
      user: users[1],
      fromCurrency: 'MYR',
      toCurrency: 'KRW',
      fromAmount: 5000,
      toAmount: 1470600,
      exchangeRate: 294.12,
      location: 'Seoul Gangnam Station',
      description: 'Need Korean Won urgently for my trip. Can meet today evening.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'active',
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
      contactMethod: 'phone',
      isUrgent: true
    },
    {
      id: '3',
      user: users[2],
      fromCurrency: 'KRW',
      toCurrency: 'MYR',
      fromAmount: 2000000,
      toAmount: 6800,
      exchangeRate: 0.0034,
      location: 'Petaling Jaya',
      description: 'Regular exchange for business purposes. Looking for reliable exchange partner.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'active',
      expiresAt: new Date(Date.now() + 42 * 60 * 60 * 1000),
      contactMethod: 'email',
      isUrgent: false,
      maxAmount: 5000000
    },
    {
      id: '4',
      user: users[3],
      fromCurrency: 'MYR',
      toCurrency: 'KRW',
      fromAmount: 1500,
      toAmount: 441180,
      exchangeRate: 294.12,
      location: 'Seoul Myeongdong',
      description: 'Student exchange - need Korean Won for living expenses.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'completed',
      expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      contactMethod: 'message',
      isUrgent: false
    }
  ]);

  // Current market rates (mock data)
  const marketRates = {
    KRW_TO_MYR: 0.0034,
    MYR_TO_KRW: 294.12,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  };

  const handleCreateRequest = (newRequest: ExchangeRequest) => {
    setExchangeRequests([newRequest, ...exchangeRequests]);
  };

  const handleContact = (requestId: string) => {
    const request = exchangeRequests.find(r => r.id === requestId);
    if (request) {
      alert(`Contacting ${request.user.name} via ${request.contactMethod}. In a real app, this would open the appropriate contact method.`);
    }
  };

  const filterRequests = () => {
    let filtered = exchangeRequests;

    // Filter by currency direction
    if (selectedFilter === 'krw-to-myr') {
      filtered = filtered.filter(r => r.fromCurrency === 'KRW' && r.toCurrency === 'MYR');
    } else if (selectedFilter === 'myr-to-krw') {
      filtered = filtered.filter(r => r.fromCurrency === 'MYR' && r.toCurrency === 'KRW');
    } else if (selectedFilter === 'active') {
      filtered = filtered.filter(r => r.status === 'active');
    } else if (selectedFilter === 'urgent') {
      filtered = filtered.filter(r => r.isUrgent && r.status === 'active');
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else if (sortBy === 'expiring') {
      filtered.sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime());
    } else if (sortBy === 'amount-high') {
      filtered.sort((a, b) => b.fromAmount - a.fromAmount);
    } else if (sortBy === 'amount-low') {
      filtered.sort((a, b) => a.fromAmount - b.fromAmount);
    }

    return filtered;
  };

  const filteredRequests = filterRequests();

  const stats = {
    totalRequests: exchangeRequests.length,
    activeRequests: exchangeRequests.filter(r => r.status === 'active').length,
    urgentRequests: exchangeRequests.filter(r => r.isUrgent && r.status === 'active').length,
    completedToday: exchangeRequests.filter(r => {
      const today = new Date();
      const requestDate = new Date(r.timestamp);
      return r.status === 'completed' && 
             requestDate.toDateString() === today.toDateString();
    }).length
  };

  const filters = [
    { id: 'all', label: 'All Requests', count: exchangeRequests.length },
    { id: 'active', label: 'Active', count: stats.activeRequests },
    { id: 'krw-to-myr', label: 'KRW → MYR', count: exchangeRequests.filter(r => r.fromCurrency === 'KRW').length },
    { id: 'myr-to-krw', label: 'MYR → KRW', count: exchangeRequests.filter(r => r.fromCurrency === 'MYR').length },
    { id: 'urgent', label: 'Urgent', count: stats.urgentRequests }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <DollarSign className="text-yellow-400" size={32} />
              <span>Money Changer</span>
            </h1>
            <p className="text-gray-600 mt-2">Exchange KRW and MYR with trusted community members</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors font-medium flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create Request</span>
          </button>
        </div>

        {/* Market Rates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Current Market Rates</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw size={14} />
              <span>Updated {Math.floor((Date.now() - marketRates.lastUpdated.getTime()) / (1000 * 60))} min ago</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">🇰🇷 KRW → 🇲🇾 MYR</div>
                  <div className="text-2xl font-bold text-blue-600">{marketRates.KRW_TO_MYR.toFixed(4)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">1,000 KRW =</div>
                  <div className="text-lg font-semibold">RM {(1000 * marketRates.KRW_TO_MYR).toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">🇲🇾 MYR → 🇰🇷 KRW</div>
                  <div className="text-2xl font-bold text-green-600">{marketRates.MYR_TO_KRW.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">1 MYR =</div>
                  <div className="text-lg font-semibold">₩ {marketRates.MYR_TO_KRW.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalRequests}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeRequests}</div>
                <div className="text-sm text-gray-600">Active Now</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <Clock size={20} className="text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.urgentRequests}</div>
                <div className="text-sm text-gray-600">Urgent</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <TrendingUp size={20} className="text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completedToday}</div>
                <div className="text-sm text-gray-600">Completed Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-4">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="expiring">Expiring Soon</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>

          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, or description..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none w-full md:w-80"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Requests */}
      <div className="space-y-6">
        {filteredRequests.map(request => (
          <ExchangeRequestCard
            key={request.id}
            request={request}
            onContact={handleContact}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <DollarSign size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No exchange requests found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || selectedFilter !== 'all' 
              ? 'Try adjusting your filters or search terms'
              : 'Be the first to create an exchange request!'
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors font-medium"
          >
            Create Exchange Request
          </button>
        </div>
      )}

      {/* Create Exchange Request Modal */}
      {showCreateModal && (
        <CreateExchangeRequest
          onCreateRequest={handleCreateRequest}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default MoneyChangerPage;
