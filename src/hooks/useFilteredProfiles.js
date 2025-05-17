import { useState, useEffect, useMemo } from 'react';

export const useFilteredProfiles = (profilesData) => {
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    nameFilter: '',
  });

  // Selection state
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // Reset selection when profiles data changes dramatically
  useEffect(() => {
    // Check if the selected profile still exists in the data
    if (selectedProfileId && !profilesData.some(p => p.id === selectedProfileId)) {
      setSelectedProfileId(null);
    }
  }, [profilesData, selectedProfileId]);

  // Filter profiles based on all active filters
  const filteredProfiles = useMemo(() => {
    return profilesData.filter(profile => {
      // Search filter (checks name, location, and intro)
      const matchesSearch = filters.search 
        ? (profile.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
           profile.location?.toLowerCase().includes(filters.search.toLowerCase()) ||
           profile.intro?.toLowerCase().includes(filters.search.toLowerCase()))
        : true;
      
      // Location filter
      const matchesLocation = filters.location
        ? profile.location?.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      
      // Name filter
      const matchesName = filters.nameFilter
        ? profile.name?.toLowerCase().includes(filters.nameFilter.toLowerCase())
        : true;
      
      return matchesSearch && matchesLocation && matchesName;
    });
  }, [profilesData, filters]);

  // Get selected profile object based on ID
  const selectedProfile = useMemo(() => {
    return profilesData.find(profile => profile.id === selectedProfileId) || null;
  }, [profilesData, selectedProfileId]);

  // Filter update handlers
  const updateSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const updateLocationFilter = (value) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const updateNameFilter = (value) => {
    setFilters(prev => ({ ...prev, nameFilter: value }));
  };

  // Profile selection handler
  const selectProfile = (id) => {
    setSelectedProfileId(id);
  };

  return {
    filters,
    filteredProfiles,
    selectedProfileId,
    selectedProfile,
    updateSearch,
    updateLocationFilter,
    updateNameFilter,
    selectProfile,
  };
};

