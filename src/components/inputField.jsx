import React from 'react';

function Input(props) {
  return (
    <div>
      <input
        label={props.label}
        type={props.text}
        id={props.id}
        placeholder={props.placeholder}
        className={props.className}
      />
    </div>
  );
}
export default Input;
