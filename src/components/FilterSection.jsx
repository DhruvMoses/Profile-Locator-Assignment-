import React from 'react';
import { locations } from '../data/profiles';

const FilterSection = ({ locationFilter, setLocationFilter, nameFilter, setNameFilter }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Container for filters and heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">

        {/* Section title */}
        <h3 className="text-lg font-medium text-gray-800 sm:mb-0">Filters</h3>

        {/* Dropdown filter for location */}
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Text input filter for name */}
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filter by name"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
