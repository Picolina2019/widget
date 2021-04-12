import React from 'react';
import styles from './Dialog.module.css';
// const Dialog = React.memo(function Dialog({elements}) {
const Dialog = ({
  elements,
  closeDialog,
  onCancel,
  selected,
  isSelected,
  selectedCount,
  setIsSelected,
}) => {
  const disabled = selectedCount >= 3;

  const handleChange = (index) => {
    setIsSelected({
      ...isSelected,
      [index]: !isSelected[index],
    });
  };

  return (
    <div className={styles.container}>
      <p>Select Items:</p>

      <div className={styles.filters}>
        <span>
          <label>
            Search
            <input
              type='text'
              id='search'
              placeholder='Search'
              // value={searchTerm}
              onChange={handleChange}
            />
          </label>
        </span>
        <span>
          <label>
            Filter
            <input
              type='text'
              id='filter'
              placeholder='Filter'
              // value={searchTerm}
              onChange={handleChange}
            />
          </label>
        </span>
      </div>
      <div className={styles.scroll}>
        {elements.map((el, index) => (
          <div key={el}>
            <input
              type='checkbox'
              onChange={() => handleChange(index)}
              checked={isSelected[index] || false}
              disabled={!isSelected[index] && disabled}
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
