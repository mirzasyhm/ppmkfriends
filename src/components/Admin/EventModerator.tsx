import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Check, X, Eye, MessageSquare, AlertTriangle } from 'lucide-react';

interface PendingEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  time: string;
  location: string;
  maxAttendees: number;
  image?: string;
  organizer: {
    name: string;
    username: string;
    avatar: string;
  };
  contactInfo?: string;
  additionalNotes?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

const EventModerator: React.FC = () => {
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([
    {
      id: '1',
      title: 'Photography Workshop for Beginners',
      description: 'Learn the basics of photography including composition, lighting, and camera settings. Perfect for beginners who want to improve their photography skills.',
      category: 'workshop',
      date: new Date('2024-03-25'),
      time: '14:00',
      location: 'Creative Studio, Jakarta',
      maxAttendees: 20,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=300&fit=crop',
      organizer: {
        name: 'Lisa Wong',
        username: 'lisawong',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      },
      contactInfo: 'lisa.wong@email.com',
      additionalNotes: 'I have professional photography equipment available for participants to use during the workshop.',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      title: 'PPMK Gaming Tournament',
      description: 'Join us for an exciting gaming tournament featuring popular games like Mobile Legends and PUBG. Prizes for winners!',
      category: 'sports',
      date: new Date('2024-03-30'),
      time: '10:00',
      location: 'Gaming Lounge, Central Jakarta',
      maxAttendees: 50,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
      organizer: {
        name: 'Ryan Pratama',
        username: 'ryanp',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      },
      contactInfo: 'ryan.pratama@email.com',
      additionalNotes: 'We have secured sponsorship for prizes. Need admin approval for prize distribution.',
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '3',
      title: 'Traditional Indonesian Cooking Class',
      description: 'Learn to cook authentic Indonesian dishes with traditional recipes passed down through generations.',
      category: 'cultural',
      date: new Date('2024-04-05'),
      time: '16:00',
      location: 'Community Kitchen, South Jakarta',
      maxAttendees: 15,
      organizer: {
        name: 'Sari Dewi',
        username: 'saridewi',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
      },
      contactInfo: 'sari.dewi@email.com',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<PendingEvent | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = (eventId: string) => {
    setPendingEvents(events => 
      events.map(event => 
        event.id === eventId 
          ? { ...event, status: 'approved' as const, adminNotes }
          : event
      )
    );
    setSelectedEvent(null);
    setAdminNotes('');
    alert('Event approved successfully!');
  };

  const handleReject = (eventId: string) => {
    if (!adminNotes.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setPendingEvents(events => 
      events.map(event => 
        event.id === eventId 
          ? { ...event, status: 'rejected' as const, adminNotes }
          : event
      )
    );
    setSelectedEvent(null);
    setAdminNotes('');
    setShowRejectModal(false);
    alert('Event rejected. User will be notified.');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = pendingEvents.filter(e => e.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Event Moderation</h2>
            <p className="text-gray-600">Review and moderate member-submitted events</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium">
              {pendingCount} Pending Review
            </div>
            <Calendar className="text-orange-600" size={24} />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {pendingEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                      {event.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">
                      by {event.organizer.name} (@{event.organizer.username})
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      Submitted {new Date(event.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{event.maxAttendees} attendees</span>
                    </div>
                  </div>
                </div>
                
                {event.image && (
                  <div className="ml-6">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              {event.status === 'pending' && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowRejectModal(true);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X size={16} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Check size={16} />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              )}
              
              {event.status !== 'pending' && event.adminNotes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MessageSquare size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Admin Notes:</p>
                      <p className="text-sm text-gray-600">{event.adminNotes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && !showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
                
                {selectedEvent.image && (
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Event Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{formatDate(selectedEvent.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{formatTime(selectedEvent.time)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={16} />
                        <span>{selectedEvent.maxAttendees} max attendees</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Organizer</h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={selectedEvent.organizer.avatar}
                        alt={selectedEvent.organizer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{selectedEvent.organizer.name}</p>
                        <p className="text-sm text-gray-600">@{selectedEvent.organizer.username}</p>
                      </div>
                    </div>
                    {selectedEvent.contactInfo && (
                      <p className="text-sm text-gray-600">Contact: {selectedEvent.contactInfo}</p>
                    )}
                  </div>
                </div>
                
                {selectedEvent.additionalNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedEvent.additionalNotes}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes (Optional)
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
                    placeholder="Add notes for the organizer..."
                  />
                </div>
                
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowRejectModal(true);
                    }}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <X size={16} />
                    <span>Reject Event</span>
                  </button>
                  <button
                    onClick={() => handleApprove(selectedEvent.id)}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Check size={16} />
                    <span>Approve Event</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Reject Event</h3>
                  <p className="text-gray-600">Please provide a reason for rejection</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none resize-none"
                  placeholder="Explain why this event cannot be approved..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setAdminNotes('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(selectedEvent.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {pendingEvents.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Events to Review</h3>
          <p className="text-gray-600">All member-submitted events have been reviewed.</p>
        </div>
      )}
    </div>
  );
};

export default EventModerator;
