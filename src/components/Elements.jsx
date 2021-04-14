import React from 'react';

function Elements({ result, isSelected, disabled, handleChange }) {
  return (
    <>
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
    </>
  );
}

export default Elements;
