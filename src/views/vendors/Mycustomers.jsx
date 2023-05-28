/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiCloseFill } from 'react-icons/ri';
import OrderInfo from './OrderInfo';
import {
  fetchClients,
  selectClient,
  fetchClientsStatus,
} from '../../redux/reducers/vendor/mycustomerSlice';
import Loading from '../../components/Loading';
import CustomerListHeader from '../../components/table/customerListHeader';
import Customer from '../../components/table/customer';
import NotFound from './notFound/NotFound';

const MyCustomers = () => {
  const clientsData = useSelector(selectClient);
  const fetchStatus = useSelector(fetchClientsStatus);
  const [selcted, setSelected] = useState();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.currentUser);
  const users = {};

  const handleClientOnclick = (id) => {
    setLoader(true);
    // eslint-disable-next-line no-use-before-define
    const clientDetail = clients.filter((client) => client.id === id);
    setSelected(clientDetail[0].Orders);
  };
  const HandleRemoveClientBox = () => {
    setSelected(null);
    document.body.style.overflow = 'scroll';
    window.location.reload();
  };
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  for (const order of clientsData) {
    const { Order: orderDetails } = order;
    const { userId, user } = orderDetails;

    if (!users[userId]) {
      users[userId] = { ...user, Orders: [] };
    }

    const { id, amount, status, createdAt, location } = orderDetails;
    const orderSummary = { id, amount, status, createdAt, location };
    users[userId].Orders.push(orderSummary);
  }
  for (const user of Object.values(users)) {
    user.Orders = Object.values(user.Orders);
  }
  const userArray = Object.values(users);

  const clients = userArray;
  return (
    <div>
      {clients.length === 0 ? (
        <>
          <div className={fetchStatus !== 'loading' || loader ? 'hidden' : ''}>
            <Loading />
          </div>
          <NotFound />
        </>
      ) : (
        <div className="bg-gray-200 pt-20 ml-2 md:w-full md:overflow-scroll">
          <div className={fetchStatus !== 'loading' || loader ? 'hidden' : ''}>
            <Loading />
          </div>
          {selcted && (
            <div className="fixed top-1/4 ml-[2%] w-full md:left-0 mb-[15%]">
              <OrderInfo
                OrderInf={selcted}
                closebtn={<RiCloseFill />}
                HandleRemoveClientBox={HandleRemoveClientBox}
              />
            </div>
          )}
          <table
            className={
              selcted || loader || fetchStatus === 'loading'
                ? 'hidden mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
                : 'mx-auto pt-20 w-full  md:text-xs md:pl-3 md:overflow-scroll'
            }
          >
            <thead>
              <CustomerListHeader className="bg-gray-100 shadow-md mt-20" />
            </thead>
            <tbody>
              {clients &&
                clients.map((client, index) => (
                  <Customer
                    numbering={index + 1}
                    key={client?.id}
                    id={client?.id}
                    className=" mx-auto bg-white shadow-sm border-2 border-gray-100 y"
                    fistName={client?.firstname}
                    email={client?.email}
                    gender={client?.gender}
                    onUserClick={(id) => handleClientOnclick(id)}
                  />
                ))}
            </tbody>
          </table>
          <span
            className={
              selcted ? 'hidden' : 'font-light text-sm flex justify-end mx-8'
            }
          >
            Showing
            <span className="font-medium"> {clients?.length} </span>
            users
          </span>
        </div>
      )}
    </div>
  );
};
export default MyCustomers;
