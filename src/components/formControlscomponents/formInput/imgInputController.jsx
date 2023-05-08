import React from 'react';

const imgInputController = (onChange, Img, required, imageText) => {
  return (
    <div className="border-gray-600 border-2 border-dashed h-full overflow-hidden w-full justify-center">
      <img src={Img} alt="" className="h-[70%] w-full" />
      <label className="">
        <div className="flex flex-col items-center h-[30%] justify-center pt-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
            {imageText}
          </p>
        </div>

        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            onChange(e);
          }}
          required={required}
        />
      </label>
    </div>
  );
};
export default imgInputController;
