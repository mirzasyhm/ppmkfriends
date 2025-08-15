import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Image, Send, X, AlertCircle } from 'lucide-react';

interface MemberEventCreatorProps {
  onClose: () => void;
  onSubmit: (eventData: any) => void;
}

const MemberEventCreator: React.FC<MemberEventCreatorProps> = ({ onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: 'academic',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    image: '',
    contactInfo: '',
    additionalNotes: ''
  });

  const categories = [
    { id: 'academic', name: 'Academic' },
    { id: 'social', name: 'Social' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'sports', name: 'Sports' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'networking', name: 'Networking' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
              <p className="text-gray-600">Submit your event for admin review</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-medium text-yellow-900">Event Review Process</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Your event will be reviewed by our admin team before being published. 
                  You'll receive a notification once it's approved or if changes are needed.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
                  placeholder="Describe your event in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={eventData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users size={16} className="inline mr-1" />
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={eventData.maxAttendees}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    placeholder="Estimated number of attendees"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Event Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Event location or venue"
              />
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image size={16} className="inline mr-1" />
                Event Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                value={eventData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="https://example.com/event-image.jpg"
              />
              {eventData.image && (
                <div className="mt-3">
                  <img
                    src={eventData.image}
                    alt="Event preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <input
                type="text"
                name="contactInfo"
                value={eventData.contactInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Email or phone number for inquiries"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes for Admin
              </label>
              <textarea
                name="additionalNotes"
                value={eventData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
                placeholder="Any special requirements or additional information for the admin team..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2 font-medium"
              >
                <Send size={16} />
                <span>Submit for Review</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberEventCreator;
