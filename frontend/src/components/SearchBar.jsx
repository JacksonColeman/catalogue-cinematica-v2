import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({onSearch}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    // Call the onSearch function with the new input value
    onSearch(newInputValue);
  };
  
  return (
    <div className='search-bar-container'>
      <input
        className='search-bar'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for movies..."
      />
    </div>
  );
};

export default SearchBar;