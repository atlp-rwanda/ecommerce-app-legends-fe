/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../redux/reducers/CartSlice';

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <NavLink to={`/product/${product.productId}`}>
      <div className="flex-shrink-0 m-6 h-[30vh] rounded relative overflow-hidden bg-white rounded-sm w-[15vw] shadow-lg md:w-[47vw] md:m-2 hover:bg-slate-100 hover:cursor-pointer">
        <div className="relative pt-[1vh] mx-[1vw] mt-[1vh] flex items-center justify-center shadow-sm">
          <img
            className="relative w-30 h-[15vh]"
            src={product.attrImage}
            alt="product"
          />
        </div>
        <div className="relative text-gray-500 px-6 pb-[1vh] mt-[1vh] md:px-1">
          <span className="block text-gray-700  text-sm py-2">
            {product.varitationName}
          </span>
          <div className="flex justify-between gap-2 md:gap-1 md:justify-around">
            <span className="text-gray-900 font-semibold text-xs">
              {product.price} RWF
            </span>
            <div onClick={(e) => handleAddToClick(e)}>
              <button
                type="button"
                className="border border-gray-700 font-normal rounded-full text-xs px-2 dark:text-gray-800 bg-gray-300 hover:bg-slate-400 hover:text-white md:font-thin md:px-2"
                onClick={() => dispatch(addToCart(product.id))}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default SingleProduct;
