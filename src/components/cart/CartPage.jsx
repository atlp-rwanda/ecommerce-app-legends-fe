import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { viewCart } from '../../redux/reducers/CartSlice';
import Navbar from '../Navbar';
import FrontFooter from '../FrontFooter';

const CartPage = () => {
  const { items, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(viewCart());
  }, [dispatch]);

  const handleToStartShopping = () => {
    navigate('/product-variation');
  };
  return (
    <div className="">
      <Navbar />
      <div className="pt-8 mb-52">
        {status === 'loading' && <div>{t('loading')}</div>}
        {status === 'failed' && <div>{error}</div>}
        {status === 'succeeded' &&
          (items.data &&
          items.data.totalAmount &&
          items.data.totalAmount !== 0 ? (
            <>
              <h1 className="pl-4 pb-2 text-2xl">{t('my_cart')}</h1>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left ml-4">Image</th>
                      <th className="px-4 py-2 text-center">{t('name')}</th>
                      <th className="px-4 py-2 text-center ">
                        {t('quantity')}
                      </th>
                      <th className="px-4 py-2 text-center">
                        {t('total_price')}
                      </th>
                      <th className="px-4 py-2 text-center">{t('option')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.data.cart.map((item) => (
                      <tr key={item.id} className="bg-gray-100">
                        <td className="border-y px-4 py-2 text-center">
                          <img
                            className="h-20 w-20 object-contain"
                            src={item.productImage}
                            alt="Product"
                          />
                        </td>
                        <td className="border-y px-4 py-0 text-center">
                          {item.productName}
                        </td>
                        <td className="border-y px-4 py-2">
                          <div className="flex space-x-3 justify-center">
                            <button
                              type="button"
                              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="border-y px-4 py-2 text-center">
                          {item.totalPrice}$
                        </td>
                        <td className="border-y px-4 py-2 text-center">
                          <button
                            type="button"
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                          >
                            {t('remove')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100">
                      <td colSpan="3" className="border-y px-4 text-2xl py-2">
                        {t('total_amount')}
                      </td>
                      <td className="border-y px-4 py-2 text-2xl text-center">
                        {items.data.totalAmount}$
                      </td>
                      <td colSpan="2" className="border px-4 py-2 text-center">
                        <button
                          type="button"
                          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded flex space-x-4 justify-center text-center self-center mx-auto"
                        >
                          <AiOutlineShoppingCart className="mt-1" />
                          <span>{t('checkout')}</span>
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex justify-between px-4 mt-10 md:justify-start md:space-x-12 md:px-0.5">
                <div className="continue-shopping">
                  <button
                    type="button"
                    className=" hover:bg-slate-700 hover:rounded hover:text-white text-slate-700 font-bold py-2 px-4 md:px-1  flex space-x-4 justify-center text-center self-center mx-auto"
                    onClick={handleToStartShopping}
                  >
                    <AiOutlineArrowLeft className="mt-1" />
                    <span>{t('continue_shopping')}</span>
                  </button>
                </div>
                <div className="clear-cart">
                  <button
                    type="button"
                    className=" hover:text-slate-700 text-slate-700 hover:rounded hover:bg-red-500 font-bold py-2 px-4 md:px-1  flex space-x-4 justify-center text-center self-center mx-auto"
                  >
                    <IoIosRemoveCircleOutline className="mt-1" />
                    <span>{t('clear_cart')}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full self-center items-center, text-center mt-60">
                <h1 className="mt-1/2 text-5xl md:text-4xl sm:text-2xl text-center items-center">
                  {t('your_cart_is_empty')} 🍏
                </h1>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  type="button"
                  className=" hover:bg-slate-700 hover:rounded hover:text-white text-slate-700 font-bold py-2 px-4  flex space-x-4 justify-center text-center self-center mx-auto"
                  onClick={handleToStartShopping}
                >
                  <AiOutlineArrowLeft className="mt-1" />
                  <span>{t('start_shopping')}</span>
                </button>
              </div>
            </>
          ))}
      </div>
      <FrontFooter />
    </div>
  );
};

export default CartPage;
