import React from 'react';

function Input(props) {
  return (
    <div>
      <input
        label={props.label}
        type={props.text}
        id={props.id}
        placeholder={props.placeholder}
        className="invalid:focus:border-red-400 valid:focus:border-green-400 h-full w-full rounded-[5px] border border-blue-gray-200 px-3 py-4 font-sans text-md font-extralight text-blue-gray-400 outline-none outline-[.2px] transition-all  placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:border-blue-500 focus:outline-0  "
      />
    </div>
  );
}
export default Input;
