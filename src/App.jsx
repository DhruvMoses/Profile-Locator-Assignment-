import { useState, useEffect } from 'react';
import { profiles as initialProfiles } from './data/profiles';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import AdminControls from './components/AdminControls';
import ProfileList from './components/ProfileList';
import MapView from './components/MapView';
import AddProfileModal from './components/AddProfileModal';
import EditProfileModal from './components/EditProfileModal';
import { useFilteredProfiles } from './hooks/useFilteredProfiles';

function App() {
  // Initialize state from localStorage if available, otherwise use default profiles
  const [profilesData, setProfilesData] = useState(() => {
    const savedProfiles = localStorage.getItem('profilesData');
    return savedProfiles ? JSON.parse(savedProfiles) : initialProfiles;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  // Persist profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profilesData', JSON.stringify(profilesData));
  }, [profilesData]);

  // Filter and selection state handled by custom hook
  const {
    filters,
    filteredProfiles,
    selectedProfileId,
    selectedProfile,
    updateSearch,
    updateLocationFilter,
    updateNameFilter,
    selectProfile,
  } = useFilteredProfiles(profilesData);

  // Utility function to geocode a location string to coordinates
  const geocodeLocation = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  // Delete a profile by ID
  const handleDeleteProfile = (id) => {
    setProfilesData(prevProfiles =>
      prevProfiles.filter(profile => profile.id !== id)
    );
    // If the deleted profile was selected, clear selection
    if (selectedProfileId === id) {
      selectProfile(null);
    }
  };

  // Add a new profile
  const handleAddProfile = async (newProfileData) => {
    try {
      // Get coordinates for the new location
      const coords = await geocodeLocation(newProfileData.location);
      
      if (!coords) {
        alert("Unable to find coordinates for the specified location.");
        return;
      }

      const newId = String(Date.now());
      const newProfile = {
        id: newId,
        ...newProfileData,
        coordinates: coords
      };
      
      setProfilesData(prevProfiles => [...prevProfiles, newProfile]);
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Error adding profile. Please try again.");
    }
  };

  // Edit an existing profile, updating coordinates based on new location
  const handleEditProfile = async (updatedProfile) => {
    try {
      // Only geocode if the location has changed
      let updatedWithCoords = { ...updatedProfile };
      
      const originalProfile = profilesData.find(p => p.id === updatedProfile.id);
      const locationChanged = originalProfile?.location !== updatedProfile.location;
      
      if (locationChanged) {
        const coords = await geocodeLocation(updatedProfile.location);
        
        if (!coords) {
          alert("Unable to find coordinates for the specified location.");
          return;
        }
        
        updatedWithCoords.coordinates = coords;
      }

      setProfilesData(prevProfiles =>
        prevProfiles.map(profile =>
          profile.id === updatedWithCoords.id ? updatedWithCoords : profile
        )
      );
      
      // If we're editing the selected profile, update the selection with new data
      if (selectedProfileId === updatedProfile.id) {
        selectProfile(updatedWithCoords.id);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <main className="h-full flex flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Search bar for filtering by text */}
        <section className="mb-4">
          <SearchBar 
            search={filters.search} 
            setSearch={updateSearch} 
          />
        </section>

        {/* Filters and admin controls */}
        <section className="flex justify-between items-start mb-4">
          <div className="w-1/3 pr-6">
            <FilterSection
              locationFilter={filters.location}
              setLocationFilter={updateLocationFilter}
              nameFilter={filters.nameFilter}
              setNameFilter={updateNameFilter}
            />
          </div>
          <div>
            <AdminControls
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              onAddProfile={() => setIsAddProfileModalOpen(true)}
            />
          </div>
        </section>

        {/* Profile list and map view */}
        <section className="flex flex-1 gap-8 overflow-hidden">
          {/* Left: Profile list */}
          <div className="w-1/2 h-full pr-4 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 shrink-0">Profiles</h2>
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
              <ProfileList
                profiles={filteredProfiles}
                isAdmin={isAdmin}
                onDeleteProfile={handleDeleteProfile}
                onSelectProfile={selectProfile}
                selectedProfileId={selectedProfileId}
                onEditProfile={(profile) => setEditingProfile(profile)}
              />
            </div>
          </div>

          {/* Right: Map view */}
          <div className="w-1/2 h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Map</h2>
            <div className="h-full">
              <MapView
                profiles={filteredProfiles}
                selectedProfile={selectedProfile}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Add profile modal */}
      <AddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setIsAddProfileModalOpen(false)}
        onAddProfile={handleAddProfile}
      />

      {/* Edit profile modal */}
      <EditProfileModal
        isOpen={!!editingProfile}
        onClose={() => setEditingProfile(null)}
        profile={editingProfile}
        onSave={handleEditProfile}
      />
    </div>
  );
}

export default App;
