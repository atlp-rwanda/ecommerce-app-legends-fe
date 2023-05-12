import React from 'react';

const Card = (props) => {
  return (
    <div className="cursor-pointer sm:w-[95%] w-[30vw] max-w-[12em] relative sm:mx-auto sm:my-2 mx-4 my-4 bg-white border border-gray-250 rounded-lg shadow hover:shadow-lg h-fit pb-2">
      <img
        className="rounded-t-lg w-full sm:h-[9em] object-contain h-[12em]"
        src={props.image}
        alt=""
      />

      <div className="pl-2 pb-2 mt-1 min-h-[5em] line-clamp-2">
        <h5 className=" text-md leading-5 line-clamp-1 font-medium tracking-tight text-black  mx-2">
          {props.name}
        </h5>
        <p className="line-clamp-2 ml-2 font-light">{props.description}</p>
      </div>
      <h6 className="text-lg font-bold text-denimBlue  ml-4 ">
        {props.price}$
      </h6>
    </div>
  );
};

export default Card;
