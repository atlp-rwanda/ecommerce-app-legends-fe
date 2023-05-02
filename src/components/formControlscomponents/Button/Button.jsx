import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/function-component-definition
const Button = ({ className, btnName, handleSend, display }) => {
  return (
    <button type="submit" className={className} onClick={handleSend}>
      <span
        id="spin"
        className={`${display} h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3`}
        role="status"
      />
      {btnName}
    </button>
  );
};

Button.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  handleSend: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  display: PropTypes.string,
};

export default Button;
