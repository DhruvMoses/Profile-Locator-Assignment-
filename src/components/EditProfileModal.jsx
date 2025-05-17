import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  // Local form state for editable profile fields
  const [formData, setFormData] = useState({ name: '', location: '', intro: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Populate form with current profile data when modal opens
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        location: profile.location || '',
        intro: profile.intro || '',
      });
    }
  }, [profile]);

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile data
  const handleSubmit = async () => {
    if (!profile) return;
    
    // Add validation
    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    
    if (!formData.location.trim()) {
      alert("Location is required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSave({ ...profile, ...formData });
      onClose();
    } catch (error) {
      // Error is handled in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">Edit Profile</Dialog.Title>

          {/* Editable form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full border rounded p-2"
                required
                title="Enter a valid location to be shown on the map"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid location that can be found on a map
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
              <textarea
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                placeholder="Brief introduction"
                className="w-full border rounded p-2 min-h-24"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
