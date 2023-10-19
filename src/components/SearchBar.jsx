import React, { useState } from 'react';

const SearchBar = ({onSearch}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    // Call the onSearch function with the new input value
    onSearch(newInputValue);
  };
  
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
};

export default SearchBar;