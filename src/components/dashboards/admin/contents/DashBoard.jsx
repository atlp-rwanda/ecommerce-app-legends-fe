import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { viewAllSellersProduct } from '../../../../redux/reducers/seller/viewAllSellersProduct';
import Loading from '../../../Loading';
import ChatButton from '../../../ChatButton';

const ITEMS_PER_PAGE = 8;

const DashBoard = () => {
  const dispatch = useDispatch();
  const { sellersProduct, status } = useSelector((state) => state.seller);
  useEffect(() => {
    dispatch(viewAllSellersProduct());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    setCurrentPage(1);
  }, [sellersProduct]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredProducts = sellersProduct?.data?.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(
    (filteredProducts?.length ?? 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const isSmallScreen = useMediaQuery({ maxWidth: 460 });

  return (
    <div className="dashdash pt-16 h-fit bg-white md:w-full px-6">
      <ChatButton />
      <div className="flex justify-between mt-4">
        <div className="block w-1/5  md:w-fit md:px-2 md:h10 h-16 bg-slate-900 text-center">
          <p className="text-white  md:text-sm font-bold">
            {sellersProduct?.data?.products?.length}+
          </p>
          <p className="text-white  md:text-sm font-bold">
            {t('all_products')}
          </p>
        </div>
        <div className="block w-1/5  md:w-fit md:px-1 md:h10 h-16 bg-slate-900 text-center">
          <p className="text-white  md:text-sm font-bold">3+</p>
          <p className="text-white  md:text-sm font-bold">
            {t('all_customers')}
          </p>
        </div>
        <div className="block w-1/5  md:w-fit md:px-3 md:h10 h-16 bg-slate-900 text-center">
          <p className="text-white  md:text-sm font-bold">4+</p>
          <p className="text-white  md:text-sm font-bold">{t('all_ratings')}</p>
        </div>
      </div>

      <div className="search flex justify-end mt-4">
        <div className="relative">
          <input
            type="search"
            placeholder={t('search_product')}
            className="px-4 py-2 pr-10 rounded-md w-72 sm:w-80 focus:outline-none focus:ring-2 bg-slate-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>
      <div className="all-products mt-4 h-11/12">
        {status === 'loading' && (
          <div>
            <Loading />
          </div>
        )}
        {status === 'fail' && <div>Error</div>}
        {status === 'succeeded' && (
          <div>
            {currentProducts?.length > 0 ? (
              <div
                className={`grid grid-cols-4 gap-4 sm:grid-cols-2 ${
                  isSmallScreen ? 'md:grid-cols-1' : 'md:grid-cols-2'
                }`}
              >
                {currentProducts?.map((product) => (
                  <Link
                    to={`/dashboard/product/${product.id}`}
                    key={product.id}
                    className="bg-slate-200 p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <h3 className="text-xl font-bold mt-2">
                      {`${product.name.substring(0, 20)}...`}
                    </h3>
                    <p className="mt-1">
                      {`${product.description.substring(1, 100)}...`}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="block text-center mt-36 justify-center ">
                <div className="flex justify-center ml-60 text-center items-center self-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 60 60"
                    height="20rem"
                    width="20rem"
                  >
                    <path d="M22.61 16.95A5 5 0 0018 10h-1.26a8 8 0 00-7.05-6M5 5a8 8 0 004 15h9a5 5 0 001.7-.3M1 1l22 22" />
                  </svg>
                </div>

                <span className="text text-3xl">
                  No related search product found
                </span>
              </div>
            )}
            <div className="flex justify-center mt-12 ">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`mr-2 px-4 py-1 mb-4 rounded ${
                    currentPage === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-300'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
