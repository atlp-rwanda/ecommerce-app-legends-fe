import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdWifiOff } from 'react-icons/md';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/FrontFooter';
import Card from '../components/Card';
import '../i18n/i18n';
import { fetchProducts } from '../redux/reducers/fronUser/productsReducer';

const App = () => {
  const [params, setParams] = useState({ page: 1, limit: 20 });
  const dispatch = useDispatch();
  const { status, products, error } = useSelector(
    (state) => state.landingProducts.allProducts
  );
  const allProducts = [];
  const availableProducts = () => {
    products?.data?.products.forEach((item) => {
      if (item.ProductAttributes[0]) {
        allProducts.push(item);
      }
    });
  };
  availableProducts();
  const limit1 = 4;
  const limit2 = 9;
  const subset1 = allProducts.slice(0, limit1);
  const subset2 = allProducts.slice(4, limit2).reverse();

  useEffect(() => {
    dispatch(fetchProducts(params));
  }, [params]);

  const mappingPrices = (Allproducts) => {
    const prices = Allproducts.map(({ price }) => {
      return price;
    });
    return prices[0];
  };

  // loading animation and connection error message
  const { t } = useTranslation();
  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return (
      <div className="h-[100vh] w-[100vw] relative flex justify-center items-center flex-col">
        <MdWifiOff className="text-[10em] text-red-500" />
        <h1 className=" text-red-500 text-2xl text-center">
          please check your internet connection
        </h1>
      </div>
    );
  }

  return (
    <div className=" App">
      <header className="mb-14">
        <Navbar />
      </header>
      <main className="relative ">
        <div className=" w-11/12 mx-auto md:mx-auto relative  mb-20 md:mb-5 z-30 lg:mb-14">
          <div className="md:flex-col flex flex-wrap justify-between md:justify-center">
            <img
              className="md:w-3/4 w-2/5 mt-5 lg:w-2/5 "
              src="/homepage.PNG"
              alt=""
            />
            <div className="w-1/2 md:w-full  mt-20 md:mt-5 lg:mt-5">
              <p className="font-bold "> ATLP-ecommerce legends </p>
              <h2 className="text-blackColor font-bold text-[40px] md:text-[24px]  max-w-[500px] ">
                {t('browse_our_premium_product')}
              </h2>
              <p className=" max-w-[500px] text-blackColor">
                {t('legend_ecommerce_welcome_intro')}
              </p>
              <button
                type="button"
                className="my-6 md:text-center bg-transparent  hover:bg-denimBlue text-denimBlue font-semibold hover:text-white py-2 px-4 border border-denimBlue hover:border-transparent"
              >
                {t('browse')}
              </button>
            </div>
          </div>
          <div className="md:w-24 md:h-24 lg:w-36 lg:h-36 w-44 h-44 backdrop-blur-md bg-white/30  absolute shadow-lg rotate-[60deg] md:left-60 left-72 lg:top-64 lg:left-64 md:top-36 top-80 " />
          <div className="md:w-14 md:h-14 lg:w-28 lg:h-28 w-32 h-32 backdrop-blur-md bg-white/30  absolute shadow-lg rotate-45  md:left-5 lg:top-64 md:top-36 top-80" />
          <div className="md:w-14 md:h-14 lg:w-28 lg:h-28 w-32 h-32 backdrop-blur-md bg-white/30  absolute shadow-lg rotate-45  md:left-23 top-10" />
        </div>
        <div className="bg-cardContainer relative">
          <div className="w-11/12 mx-auto sm:w-full">
            {/* <Language/> */}
            <h1 className="pt-6 font-bold text-2xl">{t('top_products')}</h1>
            <div className="flex flex-wrap md: justify-between md:px-4 bg-cardContainer">
              {subset1 &&
                subset1.map((product) => {
                  return (
                    <Card
                      key={product.id}
                      prodId={product.id}
                      image={product.image}
                      description={product.description}
                      name={product.name}
                      price={product.ProductAttributes[0].price}
                    />
                  );
                })}
            </div>
          </div>
          <div
            id="default-carousel"
            className="absolute top-0 right-5 md:hidden lg:hidden sm:text-center"
            data-carousel="slide"
          >
            <div className="relative overflow-hidden w-72 h-96 rounded-lg md:h-96">
              <div className=" duration-700 ease-in-out" data-carousel-item>
                <img
                  src="/showe4.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src="/coat.gif"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src="/hat.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src="/coat2.jpg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto mb-8">
          <h1 className="py-6 font-bold text-2xl sm:text-center sm:mb-4">
            {t('latest_products')}
          </h1>
          <hr />
          <div className="sm:grid sm:grid-cols-2 flex flex-wrap sm:justify-center rounded-lg">
            {subset2 &&
              subset2.map((product) => {
                const price = mappingPrices(product.ProductAttributes);

                return (
                  <Card
                    key={product.id}
                    prodId={product.id}
                    image={product.image}
                    description={product.description}
                    name={product.name}
                    price={product.ProductAttributes[0].price}
                  />
                );
              })}
          </div>
          <h1 className="py-6 font-bold text-2xl sm:text-center sm:mb-4">
            {t('recommended')}
          </h1>
          <hr />
          <div className=" rounded-lg relative pb-20">
            <div className="flex flex-wrap justify-center">
              {allProducts &&
                allProducts.slice(9, 20).map((product) => {
                  return (
                    <Card
                      key={product.id}
                      prodId={product.id}
                      image={product.image}
                      description={product.description}
                      name={product.name}
                      price={product.ProductAttributes[0].price}
                    />
                  );
                })}
            </div>
            <button
              type="button"
              className="m-6 bg-transparent  hover:bg-denimBlue text-denimBlue font-semibold hover:text-white py-2 px-10 border border-denimBlue absolute hover:border-transparent rounded-full right-5"
            >
              <NavLink to="/shop">
                {t('see_all')} <FontAwesomeIcon icon={faArrowRight} />
              </NavLink>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
