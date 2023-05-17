import React from 'react';

const StatusTracker = ({ fetchStatus }) => {
  return (
    <div
      className={
        fetchStatus === 'loading'
          ? 'sticky ml-[40%] top-[50%] mb-[35%]'
          : ' hidden'
      }
    >
      <div className="w-20 h-20 border-slate-400 border-2 rounded-full" />
      <div className="w-20 h-20 border-blue-700 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
    </div>
  );
};
export default StatusTracker;
