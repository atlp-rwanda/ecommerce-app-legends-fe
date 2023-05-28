/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import moment from 'moment';
import OrderList from '../../components/table/orderList';

const OrderInfo = ({ OrderInf, closebtn, HandleRemoveClientBox }) => {
  const getTimeAgo = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div>
      <div className="flex flex-row justify-around">
        <h1 className="uppercase text-lg font-normal my-[4vh] ml-[1vw]">
          Order key information
        </h1>
        <div
          className="-ml-[10vw] shadow-slate-100 shadow-md bg-gray-200 h-6 p-1 rounded-sm hover:bg-red-300 hover:cursor-pointer hover:text-white"
          onClick={HandleRemoveClientBox}
        >
          {closebtn}
        </div>
      </div>
      <table className="w-5/6">
        <thead>
          <tr className=" mx-auto bg-gray-200 shadow-sm border-2 border-gray-100">
            <th className="leading-wide text-sm py-4 text-gray-600 md:text-xs uppercase -pl-[4vw] ffont-semibold">
              tracking Number
            </th>
            <th className="leading-wide font-semibold text-sm py-4 text-gray-600 md:text-xs uppercase">
              status
            </th>
            <th className="leading-wide font-semibold text-sm py-4 text-gray-600 md:text-xs uppercase">
              location
            </th>
            <th className="leading-wide font-semibold text-sm py-4 text-gray-600 md:text-xs uppercase">
              amount
            </th>
            <th className="leading-wide font-semibold text-sm py-4 text-gray-600 md:text-xs uppercase">
              date
            </th>
          </tr>
        </thead>
        <tbody>
          {OrderInfo &&
            OrderInf.map((order) => (
              <OrderList
                key={order.id}
                numbering={order.trackingNumber}
                amount={order?.amount}
                className="bg-white shadow-sm border-2 border-gray-100"
                fistName={order?.status}
                email={order?.location}
                gender={getTimeAgo(order?.createdAt)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderInfo;
