import { useState } from 'react';
import { X } from 'lucide-react';

const AddProfileModal = ({ isOpen, onClose, onAddProfile }) => {
  // Local state for form fields and loading indicator
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [intro, setIntro] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission and geocode the location input
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Geocode the location using Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();

      if (data.length === 0) {
        alert('Location not found. Please enter a valid state or city.');
        setIsLoading(false);
        return;
      }

      const { lat, lon } = data[0];

      // Build new profile object with geocoded coordinates
      const newProfile = {
        name,
        picture,
        location,
        coordinates: {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
        },
        intro,
      };

      onAddProfile(newProfile);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Failed to fetch location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields to initial state
  const resetForm = () => {
    setName('');
    setPicture('');
    setLocation('');
    setIntro('');
  };

  // Do not render modal if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile input form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full h-12 pl-3 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm text-sm"
            />
          </div>

          {/* Location input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g., California, New York"
              className="mt-1 block w-full h-12 pl-3 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm text-sm"
            />
          </div>

          {/* Intro input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Intro</label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full pl-3 py-2 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm text-sm"
            ></textarea>
          </div>

          {/* Picture URL input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Picture URL</label>
            <input
              type="url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="mt-1 block w-full h-12 pl-3 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm text-sm"
            />
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Adding...' : 'Add Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfileModal;
