import React from 'react';
import { MapPin, Clock, MessageCircle, Phone, Mail, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { ExchangeRequest } from '../../types';

interface ExchangeRequestCardProps {
  request: ExchangeRequest;
  onContact: (requestId: string) => void;
}

const ExchangeRequestCard: React.FC<ExchangeRequestCardProps> = ({ request, onContact }) => {
  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'KRW') {
      return new Intl.NumberFormat('ko-KR').format(amount) + ' ₩';
    } else {
      return 'RM ' + new Intl.NumberFormat('en-MY', { minimumFractionDigits: 2 }).format(amount);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  const getTimeUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m left`;
    } else if (hours < 24) {
      return `${hours}h left`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d left`;
    }
  };

  const isExpiringSoon = () => {
    const now = new Date();
    const diff = request.expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours <= 6;
  };

  const getContactIcon = () => {
    switch (request.contactMethod) {
      case 'phone':
        return <Phone size={16} />;
      case 'email':
        return <Mail size={16} />;
      default:
        return <MessageCircle size={16} />;
    }
  };

  const getCurrencyFlag = (currency: string) => {
    return currency === 'KRW' ? '🇰🇷' : '🇲🇾';
  };

  const getRateDirection = () => {
    // Mock comparison with market rate (in real app, this would be calculated)
    const isAboveMarket = Math.random() > 0.5;
    return isAboveMarket ? (
      <div className="flex items-center space-x-1 text-green-600">
        <TrendingUp size={14} />
        <span className="text-xs">Above market</span>
      </div>
    ) : (
      <div className="flex items-center space-x-1 text-red-600">
        <TrendingDown size={14} />
        <span className="text-xs">Below market</span>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all ${
      request.isUrgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
    } ${isExpiringSoon() ? 'ring-2 ring-yellow-400' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={request.user.avatar}
            alt={request.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <span>{request.user.name}</span>
              {request.user.verified && (
                <span className="text-yellow-400">✓</span>
              )}
            </h3>
            <p className="text-sm text-gray-500">@{request.user.username} · {formatTime(request.timestamp)}</p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          {request.isUrgent && (
            <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              <AlertCircle size={12} />
              <span>URGENT</span>
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            request.status === 'active' ? 'bg-green-100 text-green-800' :
            request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {request.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Exchange Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-2xl mb-1">{getCurrencyFlag(request.fromCurrency)}</div>
            <div className="font-bold text-lg text-gray-900">
              {formatAmount(request.fromAmount, request.fromCurrency)}
            </div>
            <div className="text-sm text-gray-500">{request.fromCurrency}</div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
              Rate: {request.exchangeRate.toFixed(4)}
            </div>
            <div className="text-2xl">→</div>
            {getRateDirection()}
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">{getCurrencyFlag(request.toCurrency)}</div>
            <div className="font-bold text-lg text-gray-900">
              {formatAmount(request.toAmount, request.toCurrency)}
            </div>
            <div className="text-sm text-gray-500">{request.toCurrency}</div>
          </div>
        </div>

        {/* Amount Range */}
        {(request.minAmount || request.maxAmount) && (
          <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-2">
            Range: {request.minAmount ? formatAmount(request.minAmount, request.fromCurrency) : 'No min'} - {request.maxAmount ? formatAmount(request.maxAmount, request.fromCurrency) : 'No max'}
          </div>
        )}
      </div>

      {/* Location and Description */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{request.location}</span>
        </div>

        {request.description && (
          <p className="text-gray-700 text-sm leading-relaxed">{request.description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span className={isExpiringSoon() ? 'text-red-600 font-medium' : ''}>
              {getTimeUntilExpiry(request.expiresAt)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {getContactIcon()}
            <span className="capitalize">{request.contactMethod}</span>
          </div>
        </div>

        <button
          onClick={() => onContact(request.id)}
          disabled={request.status !== 'active'}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            request.status === 'active'
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {request.status === 'active' ? 'Contact' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ExchangeRequestCard;
