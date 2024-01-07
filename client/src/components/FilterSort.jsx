import React, { useState } from "react";
import "./styles/FilterSort.css";

const FilterSort = ({ sortingOptions, selectedOption, onSortChange }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleOptionClick = (option) => {
    onSortChange(option);
    toggleOptions();
  };

  return (
    <div className="sort-filter">
      <div className="sort-header" onClick={toggleOptions}>
        <h2>Sort:</h2>
        <div className="selected-option">
          <strong>{selectedOption}</strong>
        </div>
      </div>
      <div className={`sort-options ${isOptionsVisible ? "visible" : ""}`}>
        {sortingOptions.map((option, index) => (
          <div
            key={index}
            className={`sort-option ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSort;
