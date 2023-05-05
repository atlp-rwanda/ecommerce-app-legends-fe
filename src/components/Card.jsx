import React from 'react';

const Card = (props) => {
  return (
    <div className="md:w-32 md:h-60 lg:h-64 cursor-pointer relative lg:w-40  w-52 mx-4 my-8 bg-white border border-gray-250 rounded-lg shadow hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      {/* <a href="#"> */}
      <img
        className="rounded-t-lg w-48 mx-auto h-48 md:w-32 lg:w-40 lg:h-40 md:h-36"
        src={props.image}
        alt=""
      />
      {/* </a> */}
      <div className="pl-2 pb-2">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-black dark:text-white">
          {props.name.substring(0, 20)}...
        </h5>

        <h4 className="text-xl font-bold text-denimBlue md:absolute lg:absolute md:bottom-2 lg:bottom-2">
          $ {props.price}
        </h4>
      </div>
    </div>
  );
};

export default Card;
