import React from 'react';

// eslint-disable-next-line react/function-component-definition
const FormInput = ({
  id,
  className,
  name,
  placeholder,
  type,
  value = '', // provide a default value
  onChange,
  required,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};

export default FormInput;
