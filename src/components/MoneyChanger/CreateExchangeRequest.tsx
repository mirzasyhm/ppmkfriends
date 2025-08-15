import React, { useState } from 'react';
import { X, ArrowRightLeft, MapPin, Clock, AlertCircle, Calculator } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface CreateExchangeRequestProps {
  onCreateRequest: (request: any) => void;
  onClose: () => void;
}

const CreateExchangeRequest: React.FC<CreateExchangeRequestProps> = ({ onCreateRequest, onClose }) => {
  const [fromCurrency, setFromCurrency] = useState<'KRW' | 'MYR'>('KRW');
  const [toCurrency, setToCurrency] = useState<'KRW' | 'MYR'>('MYR');
  const [fromAmount, setFromAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState<'message' | 'phone' | 'email'>('message');
  const [isUrgent, setIsUrgent] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [expiresIn, setExpiresIn] = useState('24'); // hours

  // Current exchange rates (in real app, this would come from an API)
  const currentRates = {
    KRW_TO_MYR: 0.0034,
    MYR_TO_KRW: 294.12
  };

  const suggestedRate = fromCurrency === 'KRW' ? currentRates.KRW_TO_MYR : currentRates.MYR_TO_KRW;

  const calculateToAmount = () => {
    if (fromAmount && exchangeRate) {
      return (parseFloat(fromAmount) * parseFloat(exchangeRate)).toFixed(2);
    }
    return '';
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount('');
    setExchangeRate('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAmount || !exchangeRate || !location) {
      alert('Please fill in all required fields');
      return;
    }

    const toAmount = calculateToAmount();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(expiresIn));

    const newRequest = {
      id: Date.now().toString(),
      user: currentUser,
      fromCurrency,
      toCurrency,
      fromAmount: parseFloat(fromAmount),
      toAmount: parseFloat(toAmount),
      exchangeRate: parseFloat(exchangeRate),
      location,
      description,
      timestamp: new Date(),
      status: 'active' as const,
      expiresAt,
      contactMethod,
      isUrgent,
      minAmount: minAmount ? parseFloat(minAmount) : undefined,
      maxAmount: maxAmount ? parseFloat(maxAmount) : undefined
    };

    onCreateRequest(newRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create Exchange Request</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">Post your currency exchange request to connect with other members</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Currency Exchange Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ArrowRightLeft size={20} />
              <span>Exchange Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value as 'KRW' | 'MYR')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                >
                  <option value="KRW">🇰🇷 Korean Won (KRW)</option>
                  <option value="MYR">🇲🇾 Malaysian Ringgit (MYR)</option>
                </select>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Currency</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value as 'KRW' | 'MYR')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                >
                  <option value="MYR">🇲🇾 Malaysian Ringgit (MYR)</option>
                  <option value="KRW">🇰🇷 Korean Won (KRW)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center my-4">
              <button
                type="button"
                onClick={handleSwapCurrencies}
                className="p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors"
              >
                <ArrowRightLeft size={20} />
              </button>
            </div>

            {/* Amount and Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ({fromCurrency}) *
                </label>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder={`Enter ${fromCurrency} amount`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Rate *
                  <span className="text-xs text-gray-500 ml-2">
                    (Current: {suggestedRate.toFixed(4)})
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.0001"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(e.target.value)}
                    placeholder={suggestedRate.toFixed(4)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setExchangeRate(suggestedRate.toString())}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Use Current
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Amount */}
            {fromAmount && exchangeRate && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <Calculator size={16} />
                  <span className="font-medium">
                    You will receive: {calculateToAmount()} {toCurrency}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Amount Range (Optional) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amount Range (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Amount ({fromCurrency})
                </label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Optional minimum"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Amount ({fromCurrency})
                </label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Optional maximum"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <MapPin size={16} />
              <span>Meeting Location *</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Kuala Lumpur City Center, Seoul Gangnam"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any additional information about your exchange request..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <select
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value as 'message' | 'phone' | 'email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              >
                <option value="message">PPMKFriends Message</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Expires In */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Clock size={16} />
                <span>Request Expires In</span>
              </label>
              <select
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              >
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
                <option value="168">1 week</option>
              </select>
            </div>
          </div>

          {/* Urgent Flag */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="urgent"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="urgent" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <AlertCircle size={16} className="text-red-500" />
              <span>Mark as urgent (will be highlighted)</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            >
              Post Exchange Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExchangeRequest;
