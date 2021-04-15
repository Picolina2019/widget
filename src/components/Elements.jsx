import PropTypes from 'prop-types';
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
Elements.propTypes = {
  isSelected: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Elements;
