import React from 'react';

function Filters({
  searchElement,
  handleChangeInput,
  handleFilterChange,
  amountOfElements,
}) {
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
