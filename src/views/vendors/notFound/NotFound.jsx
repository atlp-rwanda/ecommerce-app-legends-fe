import React from 'react';
import { CgSmileNone } from 'react-icons/cg';

const NotFound = () => {
  return (
    <div className="ml-[30vw] mt-[40vh] text-lg font-semibold text-gray-600">
      <div className="animate-bounce ml-[10vw] ">
        <CgSmileNone size={70} />
      </div>
      No customer has bought any product from you !
    </div>
  );
};
export default NotFound;
