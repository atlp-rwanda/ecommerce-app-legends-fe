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
import Vendor from '../components/vendorCard';
import '../i18n/i18n';
import { fetchProducts } from '../redux/reducers/fronUser/productsReducer';
import logo from '../assets/logo.svg';

const LandingPage = () => {
  // const parmas = { page: 1, limit: 10 };
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const dispatch = useDispatch();
  const { status, products, error } = useSelector(
    (state) => state.landingProducts.allProducts
  );

  const limit1 = 4;
  const limit2 = 5;
  const subset1 = products?.data?.products?.slice(0, limit1);
  const subset2 = products?.data?.products?.slice(0, limit2).reverse();
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
      <main className="relative overflow-x-hidden">
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
            <h1 className="pt-6 font-bold text-2xl sm:text-center sm:mb-4">
              {t('top_products')}
            </h1>
            <div className="flex">
              <div className="w-full flex flex-wrap sm:grid sm:grid-cols-2 sm:justify-center  bg-cardContainer">
                {subset1 &&
                  subset1.map((product) => {
                    const price = mappingPrices(product.ProductAttributes);
                    return (
                      <NavLink key={product.id} to={`product/${product.slug}`}>
                        <Card
                          image={product.image}
                          name={product.name}
                          description={product.description}
                          price={price}
                        />
                      </NavLink>
                    );
                  })}
              </div>
              <div className="w-[257px] md:hidden lg:hidden" />
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
                  <NavLink key={product.id} to={`product/${product.slug}`}>
                    <Card
                      image={product.image}
                      name={product.name}
                      description={product.description}
                      price={price}
                    />
                  </NavLink>
                );
              })}
          </div>
          <h1 className="py-6 font-bold text-2xl sm:text-center sm:mb-4">
            {t('recommended')}
          </h1>
          <hr />
          <div className=" rounded-lg relative pb-20">
            <div className="sm:grid sm:grid-cols-2 flex flex-wrap justify-center">
              {products?.data?.products &&
                products.data.products.map((product) => {
                  const price = mappingPrices(product.ProductAttributes);
                  return (
                    <NavLink key={product.id} to={`product/${product.slug}`}>
                      <Card
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={price}
                      />
                    </NavLink>
                  );
                })}
            </div>
            <button
              type="button"
              className="m-6 bg-transparent  hover:bg-denimBlue text-denimBlue font-semibold hover:text-white py-2 px-10 border border-denimBlue absolute hover:border-transparent rounded-full right-5"
            >
              {t('see_all')} <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <h1 className="py-6 font-bold text-2xl">{t('our_top_vendors')}</h1>
          <div className="flex flex-wrap bg-white justify-center">
            <Vendor name="Vendor V1" />
            <Vendor name="Vendor V1" />
            <Vendor name="Vendor V1" />
            <Vendor name="Vendor V1" />
            <Vendor name="Vendor V1" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
