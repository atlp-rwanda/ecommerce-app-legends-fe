/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import Card from '../../components/Card';
import Rate from '../../components/Rating/Rate';
import Rating from '../../components/Rating/Rating';
import Review from '../../components/Rating/review';
import HandleRequests from './fectchSingleProduct';
import '../../i18n/i18n';
import { addToCart, viewCart } from '../../redux/reducers/CartSlice';
import {
  addToWishList,
  viewWishList,
} from '../../redux/reducers/WishListSlice';
import { postRating } from '../../redux/reducers/rateProduct';
import Loading from '../../components/Loading';
import ChatButton from '../../components/ChatButton';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const [passed, setPassed] = useState(false);
  const [allData, setAllData] = useState({});
  const [item, setItem] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [comment, setComment] = useState('');
  const { status } = useSelector((state) => state.rating);
  const { listStatus } = useSelector((state) => state.wishlist);
  const { cartStatus } = useSelector((state) => state.cart);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishList, setLoadingWishList] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    if (status === 'succeeded') {
      setLoadingReview(false);
      window.location.reload();
    } else if (status === 'failed') {
      setLoadingReview(false);
    } else if (listStatus === 'succeeded' || listStatus === 'failed') {
      setLoadingWishList(false);
    } else if (cartStatus === 'succeeded' || cartStatus === 'failed') {
      setLoadingCart(false);
    }
  }, [status, listStatus, cartStatus]);
  const handleRating = () => {
    if (rating > 0) {
      const revw = {
        id: allData.wholeProduct.id,
        comment,
        rating,
      };
      setLoadingReview(true);
      dispatch(postRating(revw));
    } else if (rating === 0) {
      toast.warning('Rate between 1-5');
    }
  };
  const { t } = useTranslation();
  if (status === 'loading') {
    return <Loading />;
  }
  const enableRating = () => {
    if (localStorage.getItem('token') === null && review === false) {
      toast.warning('Login first');
    } else {
      setReview(!review);
    }
  };
  if (!passed) {
    HandleRequests().then((data) => {
      if (data.variations) {
        setAllData(data);
        setItem(data.variations[0]);
        setAllReviews(data.reviews.reverse());
        setPassed(true);
      }
    });
  }
  const handleRefreshPage = () => {
    window.location.reload();
  };

  if (!passed) {
    return (
      <>
        <Navbar className="fixed" />
        <Loading />
      </>
    );
  }

  if (passed) {
    return (
      <div className="">
        <ChatButton />
        <header className="mb-14">
          <Navbar />
        </header>
        <div className=" w-10/12 mx-auto md:mx-auto relative  mb-20 md:mb-5  lg:mb-14">
          <div className="md:flex-col flex flex-wrap justify-between md:justify-center">
            <div className="flex flex-col w-2/5 mt-10 md:w-11/12 md:mx-auto">
              <img
                className="md:w-full h-96 object-contain mt-5 md:h-60"
                src={item?.attrImage}
                alt=""
              />
              <div className="flex flex-wrap md:w-full ">
                {allData?.variations?.map((product) => {
                  return (
                    <img
                      key={product?.id}
                      src={product?.attrImage}
                      alt=""
                      onClick={() => setItem(product)}
                      className="rounded object-contain w-20 h-24 m-2 lg:w-16 lg:h-24 md:h-36 cursor-pointer md:m-1 md:w-12"
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-1/2 md:w-full  mt-20 md:mt-3 lg:mt-5">
              <p>ATLP-ecommerce legends</p>
              <h1 className="font-black text-2xl md:text-3xl lg:text-3xl">
                {allData?.wholeProduct?.name}
              </h1>
              <Rating rating={allData?.wholeProduct?.avgRating} />
              <p className="text-lg md:text-base">
                {allData.wholeProduct.description}
              </p>
              <ul className="list-disc ml-5 mt-2">
                {item?.varitationName ? (
                  <li>
                    {t('singlePageDescription')} :{' '}
                    <span className="font-bold text-xl">
                      {item?.varitationName}
                    </span>
                  </li>
                ) : (
                  ''
                )}
                <li>
                  {t('singlePageModel')}:{' '}
                  <span className="font-bold">
                    {allData?.wholeProduct.model}
                  </span>
                </li>
                <li>
                  {t('singlePageColor')}:{' '}
                  <span className="font-bold">
                    {item?.color?.split(' ')[0]}
                  </span>
                </li>
                <li>
                  {t('singlePageInstock')}:
                  <span className="font-bold"> {item?.quantity} </span>
                  <span className="font-normal text-lightYellow">
                    {allData?.wholeProduct?.status}
                  </span>
                </li>
                {item?.size ? (
                  <li>
                    {t('singlePageSize')}:{' '}
                    <span className="font-bold">{item?.size}</span>
                  </li>
                ) : (
                  ''
                )}
                <li>
                  {t('singlePageSeller')}: <span className="font-bold" />
                </li>
              </ul>
              <div className="flex flex-wrap">
                {allData?.variations?.map((product) => {
                  const color = product.color.split(' ')[1];
                  return (
                    <div
                      key={product.id}
                      className="w-10 h-10 rounded-full m-4 cursor-pointer"
                      onClick={() => setItem(product)}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>

              <h6 className="font-bold text-2xl text-denimBlue md:text-3xl">
                {item?.price?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </h6>

              <div className="flex flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setLoadingCart(true);
                    dispatch(addToCart(item.id)).then(() =>
                      dispatch(viewCart())
                    );
                  }}
                  className="my-6  md:text-md  md:text-center bg-denimBlue hover:bg-transparent text-white font-semibold hover:text-denimBlue py-2 px-4 border border-denimBlue rounded-full"
                >
                  {loadingCart ? (
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
                  <span>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </span>{' '}
                  {t('singlePageAddToCart')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoadingWishList(true);
                    dispatch(addToWishList(allData.id)).then(() =>
                      dispatch(viewWishList())
                    );
                  }}
                  className="my-6 mx-4 md:text-md md:ml-2 md:mr-0 md:text-center bg-transparent  hover:bg-denimBlue text-denimBlue font-semibold hover:text-white py-2 px-4 border border-denimBlue hover:border-transparent rounded-full"
                >
                  {loadingWishList ? (
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
                  <span>{t('singlePageAddToWish')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-10/12 mx-auto md:mx-auto relative  mb-20 md:mb-5 lg:mb-14 border-2  rounded-md border-gray-300">
          <h1 className="font-black text-2xl lg:text-3xl text-center my-4 md:text-xl">
            {t('singlePageTopReviews')}
          </h1>
          <div className="">
            <div className="overflow-hidden  hover:overflow-y-auto shadow-lg pl-16 max-h-72 md:pl-5">
              {allReviews.map((rev) => {
                return (
                  <Review
                    key={rev.id}
                    rating={rev.rating}
                    comment={rev.comment}
                    date={rev.createdAt}
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => enableRating()}
              className="my-6 mx-4  md:text-md  md:text-center bg-denimBlue hover:bg-transparent text-white font-semibold hover:text-denimBlue py-2 px-4 border border-denimBlue  rounded-full"
            >
              {t('singlePageAddReview')}
            </button>
            {review ? (
              <div className="my-2 text-center ">
                <h2 className="font-medium">
                  {t('singlePageRateProduct')} (Rating - {rating})
                </h2>
                <Rate rating={rating} onRating={(rate) => setRating(rate)} />
                <h2 className="font-medium">{t('singlePageRateProduct')}</h2>
                <textarea
                  className=" w-6/12 block mx-auto md:mx-auto relative md:w-full md:mb-5 lg:mb-14 border rounded-md bg-gray-100"
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  onChange={(event) => setComment(event.target.value)}
                />
                <button
                  type="button"
                  className="  text-lg md:text-center bg-lightYellow my-2 hover:bg-black hover:text-white font-semibold  py-2 px-4 border  rounded"
                  onClick={() => handleRating()}
                >
                  {' '}
                  {loadingReview ? (
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
                  {t('singlePagePostReview')}
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="w-11/12 mx-auto mb-8 ">
          <h1 className="py-6 font-bold text-2xl">{t('singlePageRelated')}</h1>
          <hr />

          <div className="flex flex-wrap  md:justify-between rounded-lg">
            {allData.products.slice(0, 10).map((product) => {
              if (product.id === allData.id) {
                return;
              }
              return (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => handleRefreshPage()}
                >
                  <Card
                    prodId={product.id}
                    image={product.image}
                    description={product.description}
                    name={product.name}
                    price={product.price}
                  />
                </button>
              );
            })}
          </div>
          {/* </button> */}
        </div>

        <Footer />
      </div>
    );
  }
  return '';
};
// }

export default SingleProduct;
