import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { Navigate, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import {
  viewCart,
  clearCart,
  updateCart,
  removeFromCart,
} from '../../redux/reducers/CartSlice';
import Navbar from '../Navbar';
import FrontFooter from '../FrontFooter';
import Button from '../formControlscomponents/Button/Button';
import FormInput from '../formControlscomponents/formInput/FormInput';
import Loading from '../Loading';

const CartPage = () => {
  const { items, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantities, setQuantities] = useState([]);
  const [isChanged, setIsChanged] = useState({});

  useEffect(() => {
    const initialQuantities =
      items?.data?.cart?.map((item) => item.quantity) || [];
    setQuantities(initialQuantities);
  }, [items]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
    setIsChanged((prevState) => ({
      ...prevState,
      [items.data.cart[index].cartId]: true,
    }));
  };

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    setIsChanged((prevState) => ({
      ...prevState,
      [items.data.cart[index].cartId]: true,
    }));
  };

  useEffect(() => {
    dispatch(viewCart());
  }, [dispatch]);

  const handleUpdateCart = (id, quantity) => {
    setIsChanged(false);
    return quantity <= 0
      ? dispatch(removeFromCart(id)).then(() => dispatch(viewCart()))
      : dispatch(updateCart({ id, quantity })).then(() => dispatch(viewCart()));
  };
  const handleremoveFromCart = (id) => {
    dispatch(removeFromCart(id)).then(() => dispatch(viewCart()));
  };
  const handleClearCart = () => {
    Swal.fire({
      title: t('are_you_sure_you_clear_cart'),
      // eslint-disable-next-line quotes
      text: t('you_will_not_be_able_to_revert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: t('cancel'),
      confirmButtonText: t('yes_clear_it'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart()).then(() => dispatch(viewCart()));
        toast.success(t('cart_cleared'), {
          theme: 'colored',
        });
      }
    });
  };

  const handleToStartShopping = () => {
    navigate('/');
  };

  return (
    <div className="test">
      <Navbar />
      <div className="pt-8 mb-52">
        {console.log(status)}
        {status === 'loading' && <Loading />}
        {status === 'failed' && <div>{error}</div>}
        {status === 'succeeded' &&
          (items && items.data && items.data.totalAmount !== 0 ? (
            <>
              <h1 className="pl-4 pb-2 text-2xl">{t('my_cart')}</h1>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left ml-4 md:text-sm">
                        Image
                      </th>
                      <th className="px-4 py-2 text-center md:text-sm">
                        {t('name')}
                      </th>
                      <th className="px-4 py-2 text-center md:text-sm">
                        {t('quantity')}
                      </th>
                      <th className="px-4 py-2 text-center md:text-sm">
                        {t('total_price')}
                      </th>
                      <th className="px-4 py-2 text-center md:text-sm">
                        {t('option')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.data &&
                      items?.data.cart &&
                      items?.data?.cart?.map((item, index) => (
                        <tr key={item.id} className="bg-gray-100">
                          <td className="border-y px-4 md:px-2 py-2 text-center">
                            <img
                              className="h-20 w-20 object-contain"
                              src={item.productImage}
                              alt="Product"
                            />
                          </td>
                          <td className="border-y px-4 md:px-2 py-0 text-center md:text-sm">
                            {item.productName}
                          </td>
                          <td className="border-y px-4 md:px-2 py-2">
                            <div className="flex space-x-3 justify-center">
                              <Button
                                btnName="-"
                                handleSend={() => handleDecrement(index)}
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold  px-2 rounded md:text-sm"
                              />
                              <FormInput
                                id={`quantity-${index}`}
                                className="w-10 text-center"
                                type="number"
                                name={`quantity-${index}`}
                                placeholder="Quantity"
                                required
                                value={quantities[index]}
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                              />

                              <Button
                                btnName="+"
                                handleSend={() => handleIncrement(index)}
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold px-2 rounded md:text-sm"
                              />
                            </div>
                            <div className="flex space-x-3 justify-center">
                              {isChanged[item.cartId] && (
                                <Button
                                  className="bg-slate-500 hover:bg-slate-700 rounded-sm mt-3 px-3 text-white md:text-sm md:px-1"
                                  btnName="updateCart"
                                  handleSend={() =>
                                    handleUpdateCart(
                                      item.cartId,
                                      quantities[index]
                                    )
                                  }
                                />
                              )}
                            </div>
                          </td>
                          <td className="border-y px-4 md:px-2 py-2 text-center">
                            {item.totalPrice}$
                          </td>
                          <td className="border-y px-4 md:px-2 py-2 text-center md:text-sm md:py-1">
                            <Button
                              btnName={t('remove')}
                              handleSend={() =>
                                handleremoveFromCart(item.cartId)
                              }
                              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100">
                      <td
                        colSpan="3"
                        className="border-y px-4 md:px-2 text-2xl py-2 md:text-xl"
                      >
                        {t('total_amount')}
                      </td>
                      <td className="border-y px-4 md:px-2 py-2 text-2xl md:text-xl text-center">
                        {items.data.totalAmount}$
                      </td>
                      <td colSpan="2" className="border px-4 py-2 text-center">
                        <NavLink
                          to="/checkout"
                          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 pr-2 pl-0 rounded flex space-x-4 justify-center text-center self-center mx-auto md:text-sm md:py-1"
                        >
                          <AiOutlineShoppingCart className="mt-1" />
                          <span>{t('checkout')}</span>
                        </NavLink>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex justify-between px-4 mt-10 md:space-x-12 md:px-0.5">
                <div className="continue-shopping">
                  <Button
                    className="hover:bg-slate-700 hover:rounded hover:text-white text-slate-700 font-bold py-2 px-4 md:px-1  flex space-x-4 justify-center text-center self-center mx-auto"
                    handleSend={handleToStartShopping}
                    btnName={
                      <>
                        <AiOutlineArrowLeft className="mt-1" />
                        <span>{t('continue_shopping')}</span>
                      </>
                    }
                  />
                </div>
                <div className="clear-cart">
                  <Button
                    btnName={t('clear_cart')}
                    className="hover:text-slate-700 text-slate-700 hover:rounded hover:bg-red-500 font-bold py-2 px-4 md:px-1 flex space-x-4 justify-center text-center self-center mx-auto"
                    handleSend={handleClearCart}
                  >
                    <IoIosRemoveCircleOutline className="mt-1" />
                  </Button>
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
                <Button
                  className="hover:bg-slate-700 hover:rounded hover:text-white text-slate-700 font-bold py-2 px-4 flex space-x-4 justify-center text-center self-center mx-auto"
                  handleSend={handleToStartShopping}
                  btnName={
                    <>
                      <AiOutlineArrowLeft className="mt-1" />
                      <span>{t('start_shopping')}</span>
                    </>
                  }
                />
              </div>
            </>
          ))}
      </div>
      <FrontFooter />
    </div>
  );
};

export default CartPage;
