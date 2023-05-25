import React from 'react';
import Rating from './Rating';

const Review = (props) => {
  const newDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  const ndate = newDate(props.date);
  return (
    <div className="flex w-11/12">
      <img src="/account.png" alt="" className="w-10 h-10 mr-5" />
      <div className="flex flex-col">
        <h1 className="font-bold">{props.userName}</h1>
        <Rating rating={props.rating} />
        <p className="font-medium text-gray-500">{ndate}</p>
        <p className="my-2 w-3/5">{props.comment}</p>
      </div>
    </div>
  );
};

export default Review;
