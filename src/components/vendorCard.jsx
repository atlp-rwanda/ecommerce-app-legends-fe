import React from 'react';

const Vendor = (props) => {
  return (
    <div className="p-4 m-2 bg-vendorCard  border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:border-gray-700">
      <h4 className="text-xl font-bold text-denimBlue">{props.name}</h4>
    </div>
  );
};

export default Vendor;
