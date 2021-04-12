import React from 'react';
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
    <div>
      <p>Select Items:</p>
      <span>Search:</span>
      <span>Filter:</span>
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
      <div>Current Selected items:{selected}</div>

      <button onClick={closeDialog}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default Dialog;
