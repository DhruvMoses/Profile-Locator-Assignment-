import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => {
  return (
    // Container for the search input, centered with max width
    <div className="relative w-full max-w-3xl mx-auto mb-6">
      
      {/* Search icon positioned inside the input field */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      {/* Search input field */}
      <input
        type="text"
        className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder="Search for profiles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
