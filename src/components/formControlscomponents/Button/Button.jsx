import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

// eslint-disable-next-line react/function-component-definition
const Button = ({ className, btnName, handleSend, isClicked }) => {
  return (
    <button
      type="submit"
      className={className}
      onClick={handleSend}
      disabled={isClicked}
    >
      {btnName}
    </button>
  );
};

Button.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handleSend: PropTypes.func,
};

export default Button;
