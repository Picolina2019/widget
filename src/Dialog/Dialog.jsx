import React, { useEffect, useState } from 'react';
import styles from './Dialog.module.css';


const Dialog = ({
  elements,
  closeDialog,
  onCancel,
  selected,
  isSelected,
  selectedCount,
  setIsSelected,
}) => {
  const [searchElement, setSearchElement] = useState('');
  const [searchResult, setSearchResult] = useState(elements);
  const [filterAmount, setFilterAmount] = useState('');
  const disabled = selectedCount >= 3;

  const handleChange = (el) => {
    setIsSelected({
      ...isSelected,
      [el]: !isSelected[el],
    });
  };
  const handleChangeInput = (event) => {
    setSearchElement(event.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterAmount(e.target.value);
  };
  useEffect(() => {
    setSearchResult(
      elements.filter((element) =>
        element.toLowerCase().split(' ').join('').includes(searchElement.replace(/ /g,'').toLowerCase())
      )
    );
  }, [searchElement, elements]);

  return (
    <div className={styles.container}>
      <p>Select Items:</p>

      <div className={styles.filters}>
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
            <input
              type='text'
              placeholder='Filter'
              value={filterAmount}
              onChange={handleFilterChange}
            />
          </label>
        </span>
      </div>
      <div className={styles.scroll}>
        {searchResult.map((el, index) => (
          <div key={el}>
            <input
              type='checkbox'
              onChange={() => handleChange(el)}
              checked={isSelected[el] || false}
              disabled={!isSelected[el] && disabled}
            />

            {el}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>Current Selected items: </p>
        <div>{selected}</div>

        <div className={styles.buttons}>
          <button onClick={closeDialog}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
