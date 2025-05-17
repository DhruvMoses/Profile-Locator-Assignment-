import { useState } from 'react';
import { UserCog, UserPlus } from 'lucide-react';

const AdminControls = ({ isAdmin, setIsAdmin, onAddProfile }) => {
  // Local state for admin login modal and form inputs
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded admin credentials (for demo purposes only)
  const DEFAULT_ID = 'admin123';
  const DEFAULT_PASS = 'admin123';

  // Toggle admin mode or open login modal
  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowModal(true);
    }
  };

  // Validate credentials and enter admin mode
  const handleLogin = () => {
    if (userId === DEFAULT_ID && password === DEFAULT_PASS) {
      setIsAdmin(true);
      setShowModal(false);
      setUserId('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <>
      {/* Admin and Add buttons */}
      <div className="flex space-x-3 z-10 relative">
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            isAdmin ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={handleAdminClick}
        >
          <UserCog className="h-4 w-4 mr-2" />
          {isAdmin ? 'Exit Admin Mode' : 'Admin Mode'}
        </button>

        <button
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-all duration-200"
          onClick={onAddProfile}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Profile
        </button>
      </div>

      {/* Admin Login Modal */}
      {showModal && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">Admin Login</h2>

              {/* User ID input */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">User ID:</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              {/* Password input */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              {/* Error message */}
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              {/* Demo credentials and permissions info */}
              <div className="bg-red-100 border border-red-300 text-red-700 text-xs rounded p-2 mb-3">
                <p className="mb-1 font-semibold">*Note:-</p>
                <p>id: <span className="font-mono">admin123</span></p>
                <p>pass: <span className="font-mono">admin123</span></p>
                <p className="mt-2 font-semibold">*You can:-</p>
                <ul className="list-disc list-inside text-xs">
                  <li>edit profile</li>
                  <li>add profile</li>
                  <li>delete profile</li>
                </ul>
              </div>

              {/* Modal actions */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminControls;
