import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, X, UserPlus, Shield } from 'lucide-react';

const UserRegistration: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    avatar: '',
    role: 'member',
    verified: false,
    sendWelcomeEmail: true,
    temporaryPassword: '',
    requirePasswordChange: true
  });

  const [registeredUsers, setRegisteredUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      role: 'member',
      verified: false,
      registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      role: 'moderator',
      verified: true,
      registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ]);

  const roles = [
    { id: 'member', name: 'Member', description: 'Regular community member' },
    { id: 'moderator', name: 'Moderator', description: 'Can moderate content and users' },
    { id: 'admin', name: 'Admin', description: 'Full administrative access' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateTemporaryPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    setUserData(prev => ({ ...prev, temporaryPassword: password }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering user:', userData);
    
    // Add to registered users list
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      verified: userData.verified,
      registeredAt: new Date()
    };
    
    setRegisteredUsers(prev => [newUser, ...prev]);
    alert('User registered successfully!');
    
    // Reset form
    setUserData({
      name: '',
      username: '',
      email: '',
      phone: '',
      bio: '',
      location: '',
      avatar: '',
      role: 'member',
      verified: false,
      sendWelcomeEmail: true,
      temporaryPassword: '',
      requirePasswordChange: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Registration Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Registration</h2>
            <p className="text-gray-600">Create new user accounts for PPMK community</p>
          </div>
          <div className="flex items-center space-x-2">
            <UserPlus className="text-purple-600" size={24} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield size={16} className="inline mr-1" />
                User Role *
              </label>
              <select
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name} - {role.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
              placeholder="Enter user bio..."
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="url"
              name="avatar"
              value={userData.avatar}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
              placeholder="https://example.com/avatar.jpg"
            />
            {userData.avatar && (
              <div className="mt-3">
                <img
                  src={userData.avatar}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Password Settings */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-4">Password Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yellow-700 mb-2">
                  Temporary Password
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="temporaryPassword"
                    value={userData.temporaryPassword}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    placeholder="Enter temporary password"
                  />
                  <button
                    type="button"
                    onClick={generateTemporaryPassword}
                    className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="requirePasswordChange"
                  checked={userData.requirePasswordChange}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-yellow-700">Require password change on first login</span>
              </label>
            </div>
          </div>

          {/* User Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">User Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="verified"
                  checked={userData.verified}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-gray-700">Mark as verified user</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="sendWelcomeEmail"
                  checked={userData.sendWelcomeEmail}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-gray-700">Send welcome email with login credentials</span>
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
              <span>Register User</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recently Registered Users */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recently Registered Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Username</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Registered</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">@{user.username}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(user.registeredAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
