import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Elements from '../Elements';
import Filters from '../Filters';
import styles from './Dialog.module.css';

const amountOfElements = [
  { label: 'no filter', value: 300 },
  { label: '>10', value: 10 },
  { label: '>50', value: 50 },
  { label: '>100', value: 100 },
];

const Dialog = ({
  elements,
 onSave,
  onCancel,
  isSelected,
  selectedCount,
  setIsSelected,
  selectedElements,
  
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
        <Filters
          amountOfElements={amountOfElements}
          handleFilterChange={handleFilterChange}
          handleChangeInput={handleChangeInput}
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
