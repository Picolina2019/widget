import React from 'react';
const amountOfElements = [
  { label: 'no filter', value: 300 },
  { label: '>10', value: 10 },
  { label: '>50', value: 50 },
  { label: '>100', value: 100 },
];
function Filters({ searchElement, handleChangeInput, handleFilterChange }) {
  return (
    <div>
      <span>
        <label>
          Search
          <input
            type='text'
            placeholder='Search'
            value={searchElement}
            onChange={handleChangeInput}
          />
        </label>
      </span>
      <span>
        <label>
          Filter
          <select onChange={handleFilterChange}>
            {amountOfElements.map((el) => (
              <option key={el.value} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
        </label>
      </span>
    </div>
  );
}

export default Filters;
