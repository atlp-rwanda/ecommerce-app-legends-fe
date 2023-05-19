import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { RiShoppingBasketFill, RiTruckFill } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs';
import { MdPaid } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import socket from '../../middlewares/socket';
import { URL } from '../../passwordreset/ResetPassword';
import '../../i18n/i18n';

const TrackingOrder = () => {
  const { t } = useTranslation();
  const [orders, setorders] = useState([]);
  const [statusUpdate, setstatusUpdate] = useState(false);

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.token);
  useEffect(() => {
    fetch(`${URL}/api/v1/orders`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate('/login');
        }
        return response.json();
      })
      .then((data) => {
        setstatusUpdate(data.order[0].status);
        setorders(data.order);
      });

    socket.on('status', (data) => {
      console.log(data);
      setstatusUpdate(data);
    });
    return () => {
      socket.off('status');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // helper function
  const styleChanger = (status) => {
    if (status.toLowerCase() === 'pending') {
      return {
        paid: 'orange-500',
        pending: 'gray-500',
        shipping: 'gray-500',
        paidanimation: 'none',
        pendinganimation: 'bounce',
        shippinganimation: 'none',
      };
    }
    if (status.toLowerCase() === 'paid') {
      return {
        pending: 'gray-500',
        shipping: 'gray-500',
        paidanimation: 'bounce',
        pendinganimation: 'none',
        shippinganimation: 'none',
      };
    }
    if (status.toLowerCase() === 'shipping') {
      return {
        paid: 'orange-500',
        paidanimation: 'none',
        pending: 'orange-500',
        shipping: 'gray-500',
        pendinganimation: 'none',
        shippinganimation: 'bounce',
      };
    }
    return {
      paid: 'orange-500',
      paidanimation: 'none',
      pending: 'orange-500',
      shipping: 'orange-500',
      pendinganimation: 'none',
      completedanimation: 'bounce',
    };
  };

  return (
    <div className=" flex justify-center items-center w-[100vw] h-[90vh]">
      <Navbar />
      {orders === undefined ? (
        <div className="grid justify-center">
          <h1 className="text-4xl font-light">No orders to track yet</h1>
          <NavLink
            to="/shop"
            className="mt-10 text-xl py-2 px-4 text-center rounded-md bg-orange-500 text-white"
          >
            shop
          </NavLink>
        </div>
      ) : (
        <div className="mt-20 border-[1px] border-gray-200 py-2 mx-3 w-[100vw]">
          <h1 className="ml-3 mt-2 mx-2">My orders / Tracking</h1>
          {orders.map(({ id, createdAt, location, status, trackingNumber }) => {
            const ExpiryDate = new Date(createdAt);
            // styleChanger(status);
            ExpiryDate.setDate(ExpiryDate.getDate() + 5);
            const style =
              typeof statusUpdate === 'object' && statusUpdate.id === id
                ? styleChanger(statusUpdate.status)
                : styleChanger(status);
            const display =
              typeof statusUpdate === 'object' && statusUpdate.id === id
                ? statusUpdate.status
                : status;

            return (
              <div key={id}>
                <div className="flex justify-between mx-2 flex-wrap ">
                  <h1 className="mt-3 ml-1">
                    {t('orders')} ID:
                    <span className="ml-2 font-semibold text-orange-800">
                      {id}
                    </span>
                  </h1>
                  <h1 className="mt-3 ml-1">
                    destination:
                    <span className="ml-3 font-semibold">{location}</span>
                  </h1>
                </div>

                <div className="flex justify-between flex-wrap border-[1px] border-gray-200 px-2 py-4 mt-1 mx-2">
                  <div className="grid">
                    <span>{t('DeliveryTime')}</span>
                    <span>{ExpiryDate.toDateString()}</span>
                  </div>
                  <div className="grid">
                    <span>{t('shippingCompany')}</span>
                    <span>UPS shipping</span>
                  </div>
                  <div className="grid">
                    <span>status:</span>
                    <span>{display}</span>
                  </div>
                  <div className="grid">
                    <span>{t('tracking')}</span>
                    <span>
                      {trackingNumber != null ? trackingNumber : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex w-full my-4 justify-around">
                  <div className="flex w-[75%] ">
                    <div className="w-[100%] ">
                      <p
                        className={` before:absolute before:w-[20%] before:bg-${style.paid}  before:h-1 before:mt-4 before:z-[-30] before:ml-4 `}
                      >
                        <MdPaid
                          className={` z-10 text-green-400 animate-${style.paidanimation}  text-3xl bg-white rounded-full mb-4 `}
                        />
                        {t('paid')}
                      </p>
                    </div>
                    <div className="w-[100%] ">
                      <p
                        className={` before:absolute before:w-[20%] before:bg-${style.pending}  before:h-1 before:mt-4 before:z-[-30] before:ml-4 `}
                      >
                        <RiShoppingBasketFill
                          className={` z-10 text-orange-400 animate-${style.pendinganimation}  text-3xl bg-white rounded-full mb-4 `}
                        />
                        {t('pending')}
                      </p>
                    </div>
                    <div className="w-[100%]">
                      <p
                        className={` before:absolute before:w-[20%]  before:bg-${style.shipping}      before:h-1 before:mt-4 before:z-[-30] before:ml-4 `}
                      >
                        <RiTruckFill
                          className={` text-orange-400 animate-${style.shippinganimation} z-10  text-3xl bg-white rounded-full mb-4 `}
                        />
                        {t('shipping')}
                      </p>
                    </div>
                    <div className="grid justify-end ">
                      <p className=" before:absolute  before:bg-orange-500  border-orange-400  before:h-1 before:z-[-30] before:ml-4">
                        <BsCheckCircle
                          className={`mx-auto text-green-500 z-10 animate-${style.completedanimation}  text-3xl bg-white rounded-full mb-4 `}
                        />
                        {t('completed')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackingOrder;
