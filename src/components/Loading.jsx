import React from 'react';
import ECOMLOG from '../assets/ECOMLOG.png';

const Loading = () => {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="min-w-[12em] min-h-[12em] animate-spin w-[20vw] h-[20vw] border-blue-400 border-2 shadow-[3px_1px_10px_#f0d4c659]  absolute" />
      <div className="min-w-[12em] min-h-[12em] animate-[spin_1.3s_infinite_linear] w-[20vw] h-[20vw] border-orange-400 border-2 shadow-[2px_4px_10px_#c6d1f059]  absolute" />
      <div className="min-w-[12em] min-h-[12em] animate-[spin_1.4s_infinite_linear] w-[20vw] h-[20vw] border-red-700 border-2 shadow-[2px_1px_10px_#d5444459]  absolute" />
      <div>
        <img
          src={ECOMLOG}
          alt="logo img"
          className="animate-pulse md:w-[6em] w-[10em]"
        />
        <h1 className="animate-bounce text-blue-500 text-3xl md:text-2xl text-center">
          loading...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
