import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import socket from 'socket.io-client';
import {
  adminChangeOrderStatus,
  fetchAdminOrders,
} from '../../../../redux/reducers/admin/AdminOrders';
import Loading from '../../../Loading';
import BreadCumb from '../../../BreadCumb';

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.adminOrders);
  const { orders, status, error } = adminOrders;

  // Handle select input change
  const handleSelectChange = async (event, order) => {
    const { value } = event.target;
    Swal.fire({
      title: t('are_you_sure'),
      // eslint-disable-next-line quotes
      text: `${t('update_this_order_to') + t(value)}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: t('cancel'),
      confirmButtonText: t('yes_update_it'),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(adminChangeOrderStatus({ id: order.id, status: value }));
        socket.emit('status', { id: order.id, status: value });
        await dispatch(fetchAdminOrders());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAdminOrders()); // Fetch admin orders on component mount
  }, [dispatch]);

  const crumbs = [{ text: 'Orders', path: '/dashboard/Orders' }];
  const possibleStatus = ['paid', 'pending', 'shipping', 'completed'];

  if (status === 'loading') {
    return (
      <div className="h-[100vh]">
        <div className="">
          <Loading />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="h-[100vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
          Error: {error}
        </div>
      </div>
    );
  }

  return orders?.order ? (
    <div className="p-5">
      <div className="pt-16 h-fit md:w-full overflow-x-auto">
        <div>
          <BreadCumb className="my-9" crumbs={crumbs} />
        </div>

        <table className="table-auto w-full">
          <thead className="text-darkBlueColor">
            <tr>
              {['amount', 'location', 'items', 'status'].map((head) => (
                <th className="border px-4 py-2" key={head}>
                  {t(head)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.order &&
              orders.order
                .filter((ele) => ele.detail.length > 0)
                .map((order) => (
                  <tr
                    className="border px-1 py-1 text-center hover:cursor-pointer hover:bg-slate-100 transition-shadow animate"
                    key={order.id}
                  >
                    <td className="border px-2 py-1">{order.amount}</td>
                    <td className="border px-2 py-1">{order.location}</td>
                    <td className="border px-2 py-1">
                      {`${order.detail.length} ${t('item')}`}{' '}
                    </td>
                    <td className="border px-2 py-1">
                      <div className="dropdown">
                        <select
                          value={
                            orders?.order &&
                            orders.order.find((elem) => order.id === elem.id)
                              .status
                          }
                          onChange={(event) => handleSelectChange(event, order)}
                          className={`${
                            order.status === 'completed' ? 'bg-green-100' : ''
                          } block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-lightGrey`}
                          // onChange={handleOptionChange}
                        >
                          {possibleStatus.map((orderStatus) => {
                            const isStatusReached =
                              possibleStatus.indexOf(orderStatus) >=
                              possibleStatus.indexOf(order.status);
                            return (
                              <option
                                disabled={!isStatusReached}
                                key={orderStatus}
                              >
                                {t(orderStatus)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="m-32">Hatali jkfkgjfgkdfgdkfjgkdfgjdfkgjdkfgjdkfgjdkg</div>
  );
};
export default Orders;
