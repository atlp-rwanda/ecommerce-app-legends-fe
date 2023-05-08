import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { viewCart } from '../../redux/reducers/CartSlice';
import DummyCartNavBar from './DummyCartNavBar';

function CartPage() {
  const { items, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewCart());
  }, [dispatch]);
  return (
    <div className="">
      <DummyCartNavBar />
      <div className="pt-20">
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>{error}</div>}
        {status === 'succeeded' &&
          (items.data.cart ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left ml-4">Image</th>
                      <th className="px-4 py-2 text-center">Name</th>
                      <th className="px-4 py-2 text-center ">Quantity</th>
                      <th className="px-4 py-2 text-center">Total Price</th>
                      <th className="px-4 py-2 text-center">Options</th>
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
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100">
                      <td colSpan="3" className="border-y px-4 text-2xl py-2">
                        Total amount
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
                          <span>Checkout</span>
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
                  >
                    <AiOutlineArrowLeft className="mt-1" />
                    <span>continue shopping</span>
                  </button>
                </div>
                <div className="clear-cart">
                  <button
                    type="button"
                    className=" hover:text-slate-700 text-slate-700 hover:rounded hover:bg-red-500 font-bold py-2 px-4 md:px-1  flex space-x-4 justify-center text-center self-center mx-auto"
                  >
                    <IoIosRemoveCircleOutline className="mt-1" />
                    <span>clear cart</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>Cart is empty</div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className=" hover:text-slate-700 text-slate-700 font-bold py-2 px-4  flex space-x-4 justify-center text-center self-center mx-auto"
                >
                  <AiOutlineArrowLeft className="mt-1" />
                  <span>start shopping</span>
                </button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default CartPage;
