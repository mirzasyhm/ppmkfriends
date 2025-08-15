import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus } from 'lucide-react';
import MemberEventCreator from './MemberEventCreator';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees: number;
  category: string;
  isAttending: boolean;
}

const EventsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'Academic' },
    { id: 'social', name: 'Social' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'sports', name: 'Sports' },
    { id: 'cultural', name: 'Cultural' }
  ];

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'PPMK Annual Tech Conference 2024',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.',
      date: new Date('2024-03-15'),
      time: '09:00 AM',
      location: 'Jakarta Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
      organizer: {
        name: 'PPMK Tech Committee',
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop'
      },
      attendees: 245,
      maxAttendees: 500,
      category: 'academic',
      isAttending: true
    },
    {
      id: '2',
      title: 'Community Networking Night',
      description: 'Connect with fellow PPMK members over dinner and drinks. Great opportunity to build professional relationships.',
      date: new Date('2024-02-28'),
      time: '07:00 PM',
      location: 'Sky Lounge, Jakarta',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=300&fit=crop',
      organizer: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      },
      attendees: 67,
      maxAttendees: 100,
      category: 'social',
      isAttending: false
    },
    {
      id: '3',
      title: 'Digital Marketing Workshop',
      description: 'Learn the latest digital marketing strategies and tools from industry experts. Hands-on sessions included.',
      date: new Date('2024-03-05'),
      time: '02:00 PM',
      location: 'PPMK Training Center',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop',
      organizer: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      },
      attendees: 34,
      maxAttendees: 50,
      category: 'workshop',
      isAttending: true
    },
    {
      id: '4',
      title: 'PPMK Football Tournament',
      description: 'Annual football tournament for PPMK members. Form your teams and compete for the championship trophy!',
      date: new Date('2024-03-20'),
      time: '08:00 AM',
      location: 'Gelora Bung Karno Stadium',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop',
      organizer: {
        name: 'Sports Committee',
        avatar: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=50&h=50&fit=crop'
      },
      attendees: 128,
      maxAttendees: 200,
      category: 'sports',
      isAttending: false
    },
    {
      id: '5',
      title: 'Cultural Heritage Exhibition',
      description: 'Explore Indonesian cultural heritage through art, music, and traditional performances by PPMK members.',
      date: new Date('2024-03-10'),
      time: '10:00 AM',
      location: 'National Museum',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop',
      organizer: {
        name: 'Cultural Committee',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face'
      },
      attendees: 89,
      maxAttendees: 150,
      category: 'cultural',
      isAttending: true
    }
  ]);

  const handleAttendance = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  const handleCreateEvent = (eventData: any) => {
    console.log('Member submitted event:', eventData);
    alert('Event submitted for admin review! You will be notified once it\'s approved.');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">PPMK Events</h1>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            <Plus size={20} />
            <span>Create Event</span>
          </button>
        </div>
        <p className="text-gray-600">Discover and join community events</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
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

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                        {event.category}
                      </span>
                      {event.isAttending && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Attending
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">by {event.organizer.name}</span>
                  </div>
                  
                  <button
                    onClick={() => handleAttendance(event.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      event.isAttending
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                  >
                    {event.isAttending ? 'Cancel' : 'Attend'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found matching your criteria</p>
        </div>
      )}

      {/* Member Event Creator Modal */}
      {showCreateEvent && (
        <MemberEventCreator
          onClose={() => setShowCreateEvent(false)}
          onSubmit={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default EventsList;
