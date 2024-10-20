import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../css/schedule/searchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click and send a POST request
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    try {
      // Send a POST request
      const response = await fetch('https://example.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Search Results:', data);
      // Handle the search results (you can update state with the data)
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for Trains"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
