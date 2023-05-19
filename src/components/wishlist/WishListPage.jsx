import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  viewWishList,
  removeToWishList,
} from '../../redux/reducers/WishListSlice';
import Navbar from '../Navbar';
import FrontFooter from '../FrontFooter';
import Loading from '../Loading';

const WishListPage = () => {
  const { items, status, error } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRemoveToWishList = (id) => {
    dispatch(removeToWishList(id)).then(() => dispatch(viewWishList()));
  };
  useEffect(() => {
    dispatch(viewWishList());
  }, [dispatch]);

  const handleToStartShopping = () => {
    navigate('/product-variation');
  };

  return (
    <div className="">
      <Navbar />
      <div className="pt-8 mb-52">
        {status === 'loading' && <Loading />}
        {status === 'failed' && <div>{error}</div>}
        {status === 'succeeded' &&
          (items.data && items.data.length !== 0 ? (
            <>
              <h1 className="pl-4 pb-2 text-2xl">{t('my_wishlist')}</h1>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left ml-4"> </th>
                      <th className="px-4 py-2 text-left ml-4">Image</th>
                      <th className="px-4 py-2 text-center">{t('name')}</th>
                      <th className="px-4 py-2 text-center ">{t('status')}</th>
                      <th className="px-4 py-2 text-center">{t('option')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.data &&
                      Array.isArray(items.data) &&
                      items.data.map((item) => (
                        <tr key={item.id} className="bg-gray-100">
                          <td className="border-y px-4 md:px-2 md:text-sm py-2 text-center">
                            <button
                              type="button"
                              className=" hover:text-red-500"
                              onClick={() => handleRemoveToWishList(item.id)}
                            >
                              <FaTimes />
                            </button>
                          </td>
                          <td className="border-y px-4 md:px-2 md:text-sm py-2 text-center">
                            <img
                              className="h-20 w-20 object-contain"
                              src={item.image}
                              alt="Product"
                            />
                          </td>
                          <td className="border-y px-4 md:px-2 md:text-sm py-0 text-center">
                            {item.name}
                          </td>
                          <td className="border-y px-4 md:px-2 md:text-sm py-2 text-center">
                            {t(item.status)}
                          </td>
                          <td className="border-y px-4 md:px-2 md:text-sm py-2 text-center">
                            <button
                              onClick={handleToStartShopping}
                              type="button"
                              className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-1 px-2 md:text-sm md:px-1 rounded"
                            >
                              {t('view_variatios')}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
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
              </div>
            </>
          ) : (
            <>
              <div className="w-full self-center items-center, text-center mt-60">
                <h1 className="mt-1/2 text-5xl md:text-4xl sm:text-2xl text-center items-center">
                  {t('your_wishlist_is_empty')} 🍏
                </h1>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  type="button"
                  className=" hover:bg-slate-700 hover:rounded hover:text-white text-slate-700 font-bold py-2 px-4 md:text-sm md:px-2 md:py-1 flex space-x-4 md:space-x-2 justify-center text-center self-center mx-auto"
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

export default WishListPage;
