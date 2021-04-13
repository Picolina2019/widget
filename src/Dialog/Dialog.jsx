import React, { useEffect, useState } from 'react';
import styles from './Dialog.module.css';
//how better store variables
const amountOfElements = [
  { label: 'no filter', value: 300 },
  { label: '>10', value: 10 },
  { label: '>50', value: 50 },
  { label: '>100', value: 100 },
];

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
  const [filterAmount, setFilterAmount] = useState(elements.length);
  const [result, setResult] = useState([]);

  const disabled = selectedCount >= 3;

  const handleChange = (el) => {
    setIsSelected({
      ...isSelected,
      [el]: !isSelected[el],
    });
  };
  const handleChangeInput = (e) => {
    setSearchElement(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterAmount(e.target.value);
  };
  
  useEffect(() => {
    setResult(
      elements
        .slice(0, filterAmount)
        .filter((element) =>
          element
            .toLowerCase()
            .split(' ')
            .join('')
            .includes(searchElement.replace(/ /g, '').toLowerCase())
        )
    );
  }, [searchElement, elements, filterAmount]);

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
      <div className={styles.scroll}>
        {result.map((el) => (
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
