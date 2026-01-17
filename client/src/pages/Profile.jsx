import { User, Mail, Phone, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile({ setView }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setView('home');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.username || 'User Profile'}</h1>
                <p className="text-white/80">{user.role === 'admin' ? 'Administrator' : 'Regular User'}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.username || 'N/A'}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Role Badge */}
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {user.role === 'admin' ? '👑 Administrator' : '👤 Customer'}
                  </p>
                </div>
                {user.role === 'admin' && (
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    ADMIN
                  </div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {user.role === 'admin' && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Admin Capabilities
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>✓ Manage restaurants and menus</li>
              <li>✓ Add, edit, or delete food items</li>
              <li>✓ View and manage all orders</li>
              <li>✓ Manage user accounts</li>
              <li>✓ View system analytics</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
