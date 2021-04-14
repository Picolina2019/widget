import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Elements from '../Elements';
import Filters from '../Filters';
import styles from './Dialog.module.css';

const Dialog = ({
  elements,
  onSave,
  onCancel,
  isSelected,
  disabled,
  setIsSelected,
  selectedElements,
}) => {
  const [filterAmount, setFilterAmount] = useState(elements.length);
  const [result, setResult] = useState([]);
  const [searchElement, setSearchElement] = useState('');

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

  const handleChange = (el) => {
    setIsSelected({
      ...isSelected,
      [el]: !isSelected[el],
    });
  };
  const handleInputChange = (e) => {
    setSearchElement(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterAmount(e.target.value);
  };

  return (
    <div className={styles.container}>
      <p>Select Items:</p>
      <div className={styles.filters}>
        <Filters
          handleFilterChange={handleFilterChange}
          handleChangeInput={handleInputChange}
          searchElement={searchElement}
        />
      </div>
      <div className={styles.scroll}>
        <Elements
          result={result}
          isSelected={isSelected}
          disabled={disabled}
          handleChange={handleChange}
        />
      </div>
      <div className={styles.footer}>
        <p>Current Selected items: </p>
        <span>{selectedElements}</span>
        <div className={styles.buttons}>
          <Button handleClick={onSave} label='Save' />
          <Button handleClick={onCancel} label='Cancel' />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
