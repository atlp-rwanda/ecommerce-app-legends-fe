/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import { Checkout, ApplyCoupon } from '../../redux/reducers/checkout';
import Loading from '../../components/Loading';
import ChatButton from '../../components/ChatButton';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location, setlocation] = useState('');
  const { status, statusCoupon } = useSelector((state) => state.checkout);
  const { items } = useSelector((state) => state.cart);
  const [date, setDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  useEffect(() => {
    if (status === 'succeeded') {
      setLoadingPay(false);
      window.location.reload(navigate('/cart'));
    } else if (status === 'failed') {
      setLoadingPay(false);
    } else if (statusCoupon === 'succeeded' || statusCoupon === 'failed') {
      setLoadingCoupon(false);
    }
  }, [status, statusCoupon]);

  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    const groups = digitsOnly.match(/.{1,4}/g);
    const formattedNumber = groups ? groups.join('-') : '';
    setCardNumber(formattedNumber);
  };
  const handleChange = (event) => {
    const { value } = event.target;
    formatCardNumber(value);
  };
  const handleCheckout = () => {
    const array = cardNumber.split('-');
    const Cnumber = array[0] + array[1] + array[2] + array[3];

    if (
      Cnumber.length === 16 &&
      location !== '' &&
      date !== '' &&
      cvcNumber !== ''
    ) {
      const arr = date.split('/');
      const month = arr[0];
      const year = arr[1];
      const data = {
        location,
        cardNumber: Cnumber,
        exp_month: month,
        exp_year: year,
        cvcNumber,
      };
      setLoadingPay(true);
      dispatch(Checkout(data));
    } else if (location === '') {
      toast.warning('location can not be null');
    } else if (Cnumber !== 16 || date === '' || cvcNumber === '') {
      toast.warning('Card details not valid');
    }
  };
  if (!items?.data?.cart[0]) {
    return (
      <>
        <Navbar className="fixed" />
        <Loading />
      </>
    );
  }

  if (items?.data?.cart[0]) {
    return (
      <div className="relative">
        <header className="mb-14">
          <Navbar />
          <ChatButton />
        </header>

        <div className="bg-bgCheckout">
          <section className="w-10/12 mx-auto flex justify-between md:flex-col-reverse">
            <div className="w-5/12 ml-16 lg:ml-0 lg:w-6/12 mt-24 md:w-full md:ml-0">
              {/* <FontAwesomeIcon icon={faCircleArrowLeft} /> */}
              <h1 className="text-lg mx-auto"> Total Amount</h1>
              <h1 className="text-2xl font-bold mb-8 text-checkoutMoner">
                {items?.data?.totalAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </h1>
              <p className="text-lg mx-auto font-bold"> Items </p>
              {/* <div className="overflow-hidden  hover:overflow-y-auto shadow-lg pl-16 max-h-72 md:pl-5"> */}
              {items?.data?.cart.map((cart) => {
                return (
                  <div className="flex my-10 md:flex-col" key={cart.id}>
                    <img
                      src={cart.productImage}
                      className="w-44 h-32 lg:w-32 lg:h-24 rounded md:mx-auto md:mb-4"
                      alt=""
                    />
                    <div className="ml-10 md:ml-0 ">
                      <p className="text-md mx-auto ">
                        <span className="text-lg font-bold"> Name: </span>
                        {cart.productName}{' '}
                      </p>
                      <p className="text-md mx-auto ">
                        <span className="text-lg font-bold"> Quantity: </span>{' '}
                        {cart.quantity}
                      </p>
                      <p className="text-md mx-auto ">
                        <span className="text-lg font-bold"> Price: </span>
                        {cart.totalPrice}{' '}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* </div> */}
            </div>
            <div className="bg-whiteColor w-5/12 md:w-full shadow-lg">
              <div className="w-10/12 mx-auto mt-10 flex flex-col">
                <div className="bg-black p-1 shadow-md my-6 text-center rounded">
                  <h1 className="text-whiteColor font-bold text-xl">Pay</h1>
                </div>
                <p className="text-gray-700 mx-auto"> Pay with card </p>
                <hr className="text-gray-500" />
                <p className="text-gray-700  mt-6"> Card details </p>
                <div className="relative">
                  <img
                    src="/visa.png"
                    alt=""
                    className="w-13 h-10 right-1 absolute md:top-[-2rem] lg:top-[-2rem]"
                  />
                  <input
                    type="text"
                    className="text-xl bg-gray-50 border border-gray-300 pl-4 text-gray-900  rounded-t-lg block w-full p-1 "
                    placeholder="5555-5555-5555-5555"
                    value={cardNumber}
                    onChange={handleChange}
                  />
                  <div className="flex">
                    <input
                      type="text"
                      className="text-xl bg-gray-50 border border-gray-300 text-gray-900 pl-4 inline rounded-bl-lg w-6/12 p-1  "
                      placeholder="MM /YYYY"
                      onChange={(event) => setDate(event.target.value)}
                    />
                    <input
                      type="number"
                      className="text-xl bg-gray-50 border border-gray-300 text-gray-900 pl-4 inline rounded-br-lg w-6/12 p-1  "
                      placeholder="CVC"
                      onChange={(event) => setCvcNumber(event.target.value)}
                    />
                  </div>
                </div>
                <p className="text-gray-700  mt-6"> Coupon Code</p>
                <input
                  type="text"
                  className="text-xl bg-gray-50 border border-gray-300 text-gray-900  pl-4 rounded-lg  block w-full p-1 "
                  placeholder="Coupon Code"
                  // onChange={(event) => setCouponCode(event.target.value)}
                />
                <button
                  type="submit"
                  onClick={() => {
                    setLoadingCoupon(true);
                    dispatch(ApplyCoupon(couponCode));
                  }}
                  className="bg-lightYellow hover:bg-black shadow-md p-1 rounded text-lg hover:text-whiteColor mt-3  w-24"
                >
                  <span>Apply </span>
                  {loadingCoupon ? (
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 inline text-gray-200 animate-spin dark:text-gray-600 fill-denimBlue"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    ''
                  )}
                </button>
                <p className="text-gray-700 mt-6"> Country or region </p>
                <input
                  type="text"
                  className="text-xl bg-gray-50 border border-gray-300 text-gray-900 pl-4  rounded-lg  block w-full p-1 "
                  placeholder="Location"
                  onChange={(event) => setlocation(event.target.value)}
                />
                <hr className="text-gray-500 my-6" />
                <button
                  type="submit"
                  onClick={() => {
                    handleCheckout();
                  }}
                  className="bg-denimBlue hover:bg-black shadow-md p-1 rounded text-lg text-whiteColor mb-24"
                >
                  <span className="text-xl mr-2">Pay </span>
                  {items?.data?.totalAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  {loadingPay ? (
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 inline text-denimBlue animate-spin dark:text-gray-600 fill-gray-200 "
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    ''
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
  return '';
};
// }

export default CheckoutPage;
