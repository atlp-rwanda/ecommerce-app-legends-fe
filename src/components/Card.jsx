import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = (props) => {
  return (
    <NavLink to={`/product/${props.prodId}`}>
      <div className="cursor-pointer lg:w-40 lg:mx-2 w-60 sm:w-[95%] md:w-40  relative sm:mx-auto sm:my-2 mx-4 my-4 bg-white border border-gray-250 rounded shadow hover:shadow-lg h-fit pb-2">
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
          {props.price
            ? props.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
            : ''}
        </h6>
      </div>
    </NavLink>
  );
};

export default Card;
