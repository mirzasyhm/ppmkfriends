import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Image, Save, X } from 'lucide-react';

const EventCreator: React.FC = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: 'academic',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    image: '',
    organizer: 'PPMK Admin',
    isPublic: true,
    requiresApproval: false
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
    const { name, value, type } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', eventData);
    // Here you would typically send the data to your backend
    alert('Event created successfully!');
    
    // Reset form
    setEventData({
      title: '',
      description: '',
      category: 'academic',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      image: '',
      organizer: 'PPMK Admin',
      isPublic: true,
      requiresApproval: false
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
          <p className="text-gray-600">Schedule and manage community events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-green-600" size={24} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
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

          <div className="lg:col-span-2">
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
              placeholder="Describe your event..."
            />
          </div>

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
              Organizer
            </label>
            <input
              type="text"
              name="organizer"
              value={eventData.organizer}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              placeholder="Event organizer name"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Location and Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="Event location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-1" />
              Max Attendees
            </label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              placeholder="Maximum number of attendees"
            />
          </div>
        </div>

        {/* Event Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image size={16} className="inline mr-1" />
            Event Image URL
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

        {/* Event Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Event Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isPublic"
                checked={eventData.isPublic}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-gray-700">Make event public (visible to all users)</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="requiresApproval"
                checked={eventData.requiresApproval}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="text-gray-700">Require admin approval for attendance</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2 font-medium"
          >
            <Save size={16} />
            <span>Create Event</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreator;
