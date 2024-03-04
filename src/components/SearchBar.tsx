// components/SearchBar.tsx

import React, { useState, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Lakukan sesuatu dengan searchQuery
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:border-blue-500"
      />
      <FaSearch className="absolute top-3 left-3 text-gray-400" />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
