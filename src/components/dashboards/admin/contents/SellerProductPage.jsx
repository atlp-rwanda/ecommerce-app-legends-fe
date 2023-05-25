import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../Loading';
import { viewSingleSellersProduct } from '../../../../redux/reducers/seller/viewAllSellersProduct';

const SellerProductPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sellersProduct, status } = useSelector((state) => state.seller);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviews = sellersProduct?.reviews || [];
  const reversedReviews = [...reviews].reverse(); // Reverse the order of the reviews
  const visibleReviews = showAllReviews
    ? reversedReviews
    : reversedReviews.slice(0, 5);

  useEffect(() => {
    dispatch(viewSingleSellersProduct(id));
  }, [dispatch]);

  const handleImageClick = (attribute) => {
    setSelectedAttribute(attribute);
  };

  const handleToggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };
  return (
    <div className="pt-20 h-fit bg-white md:w-full px-6 flex flex-col">
      {status === 'loading' && (
        <div>
          <Loading />
        </div>
      )}
      <div className="flex basis-1/2 sm:w-full sm:flex-col justify-between">
        <div className="flex basis-1/2 sm:w-full flex-col p-4 sm:p-0 h-96">
          <div className="block">
            <img
              src={selectedAttribute?.attrImage || sellersProduct?.data?.image}
              alt={sellersProduct?.data?.name}
              className="h-96 w-full mb-3"
            />
          </div>
          <div className="grid grid-cols-4 bg-slate-100">
            {sellersProduct?.data?.ProductAttributes &&
              sellersProduct?.data?.ProductAttributes.map((attribute) => (
                <button
                  type="button"
                  className="attributes w-4/5"
                  key={attribute.id}
                  onClick={() => handleImageClick(attribute)}
                >
                  <img
                    src={attribute.attrImage}
                    alt={attribute.varitationName}
                    className="h-16 w-full cursor-pointer"
                  />
                </button>
              ))}
          </div>
        </div>
        <div className="block w-1/2 sm:w-full pt-3">
          <div className="pb-4">
            <h2>ATLP-ecommerce-Legends</h2>
          </div>
          <h2 className="text-xl font-bold mb-2">
            {sellersProduct?.data?.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="mr-2 flex">
              {Array.from(
                {
                  length: Math.max(
                    Math.floor(sellersProduct?.data?.avgRating),
                    0
                  ),
                },
                (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.3l-4.49 2.598a1 1 0 01-1.45-1.054l.902-5.55L.282 7.852A1 1 0 011.14 6.44l5.27-.766L8.438.905a1 1 0 011.824 0l2.746 5.77 5.27.766a1 1 0 01.858 1.413l-3.822 3.728.902 5.55a1 1 0 01-.716 1.12 1 1 0 01-.734-.067L10 15.301z"
                      clipRule="evenodd"
                    />
                  </svg>
                )
              )}
              {Array.from(
                {
                  length: Math.max(
                    5 - Math.floor(sellersProduct?.data?.avgRating),
                    0
                  ),
                },
                (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 fill-current"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.3l-4.49 2.598a1 1 0 01-1.45-1.054l.902-5.55L.282 7.852A1 1 0 011.14 6.44l5.27-.766L8.438.905a1 1 0 011.824 0l2.746 5.77 5.27.766a1 1 0 01.858 1.413l-3.822 3.728.902 5.55a1 1 0 01-.716 1.12 1 1 0 01-.734-.067L10 15.301z"
                      clipRule="evenodd"
                    />
                  </svg>
                )
              )}
            </div>
            <span className="text-gray-500">
              {sellersProduct?.data?.avgRating} (
              {sellersProduct?.reviews?.length} reviews)
            </span>
          </div>
          <p className="text-gray-500 mb-4">
            {sellersProduct?.data?.description}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">{t('model')}:</span>{' '}
            {sellersProduct?.data?.model}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">{t('status')}:</span>{' '}
            {sellersProduct?.data?.status}
          </p>
          {selectedAttribute && (
            <>
              <p className="text-gray-500">
                <span className="font-bold">{t('color')}:</span>{' '}
                {selectedAttribute.color}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">{t('size')}:</span>{' '}
                {selectedAttribute.size}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">{t('attr_name')}:</span>{' '}
                {selectedAttribute.varitationName}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">{t('quantity')}:</span>{' '}
                {selectedAttribute.quantity}
              </p>
              <h3 className="text-xl font-bold">
                <span className="price">{t('price')}: </span>$
                {selectedAttribute.price}
              </h3>
            </>
          )}
        </div>
      </div>

      <div className="w-10/12 mx-auto md:mx-auto mb-20 md:mb-5 lg:mb-14 border-2 rounded-md border-gray-300 mt-44">
        <h1 className="font-black text-2xl lg:text-3xl text-center my-4 md:text-xl">
          {t('top_reviewrs')}
        </h1>
        <div className="">
          {visibleReviews.map((rating) => (
            <div
              className="overflow-hidden hover:overflow-y-auto shadow-sm pl-16 h-fit py-3 md:pl-5"
              key={rating.id}
            >
              <h2 className="text-sm font-bold">{rating.userName}</h2>
              <p className="text-sm">{rating.comment}</p>
              <p className="texxting text-xs text-stone-500">
                {new Date(rating.createdAt).toLocaleString()}
              </p>
              <div className="flex">
                {Array.from(
                  { length: Math.max(Math.floor(rating.rating), 0) },
                  (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.3l-4.49 2.598a1 1 0 01-1.45-1.054l.902-5.55L.282 7.852A1 1 0 011.14 6.44l5.27-.766L8.438.905a1 1 0 011.824 0l2.746 5.77 5.27.766a1 1 0 01.858 1.413l-3.822 3.728.902 5.55a1 1 0 01-.716 1.12 1 1 0 01-.734-.067L10 15.301z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                )}
                {Array.from(
                  { length: Math.max(5 - Math.floor(rating.rating), 0) },
                  (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.3l-4.49 2.598a1 1 0 01-1.45-1.054l.902-5.55L.282 7.852A1 1 0 011.14 6.44l5.27-.766L8.438.905a1 1 0 011.824 0l2.746 5.77 5.27.766a1 1 0 01.858 1.413l-3.822 3.728.902 5.55a1 1 0 01-.716 1.12 1 1 0 01-.734-.067L10 15.301z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                )}
              </div>
            </div>
          ))}
          {reversedReviews.length > 5 && (
            <button
              type="button"
              className="flex m-auto py-4 text-2xl font-bold text-center items-center"
              onClick={handleToggleReviews}
            >
              {showAllReviews ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProductPage;
