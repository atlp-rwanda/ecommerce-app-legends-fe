import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/function-component-definition
const OTPinput = ({
  className,
  handleChange,
  index,
  inputRef,
  active,
  value,
}) => {
  return (
    <input
      type="number"
      placeholder="*"
      className={className}
      onChange={(e) => handleChange(e, index)}
      ref={index === active ? inputRef : null}
      value={value[index]}
    />
  );
};

OTPinput.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  active: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default OTPinput;
