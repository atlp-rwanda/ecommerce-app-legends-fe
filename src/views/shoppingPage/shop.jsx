import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShowCategories from '../../components/table/categories';
import ProductListings from '../../components/products/ProductListings';
import Loading from '../../components/Loading';
import ShowVendors from '../../components/table/vendors';
import Navbar from '../../components/Navbar';
import Footer from '../../components/FrontFooter';
import {
  fetchVendors,
  selectVendors,
} from '../../redux/reducers/seller/listOfVendors';
import {
  fetchShoppableProducts,
  fetchShoppableProductsStatus,
  selectProducts,
} from '../../redux/reducers/products/AvailbleProducts';
import {
  setSortBy,
  setsearchParam,
  setIsSearching,
} from '../../redux/reducers/products/DrowSearchkey';
import { select, diselect } from '../../redux/reducers/products/DrowCategories';
import ChatButton from '../../components/ChatButton';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { selector } = useSelector((state) => state.selector);
  const { sortBy } = useSelector((state) => state.searchKey);
  const { searchParam } = useSelector((state) => state.searchKey);
  const { isSearcching } = useSelector((state) => state.searchKey);
  const fetchStatus = useSelector(fetchShoppableProductsStatus);
  const products = useSelector(selectProducts);
  const vendors = useSelector(selectVendors);
  let detailedProducts = [];
  products?.forEach((product) => {
    product.ProductAttributes.forEach((attribute) => {
      detailedProducts.push({
        ...attribute,
        userId: product.userId,
        categoryId: product.categoryId,
        productId: product.id,
      });
    });
  });
  useEffect(() => {
    dispatch(fetchVendors()).unwrap();
    if (!isSearcching) {
      dispatch(fetchShoppableProducts()).unwrap();
    }
  }, [dispatch, isSearcching]);
  const handleFilterByseller = (id) => {
    dispatch(setsearchParam(null));
    dispatch(setIsSearching(false));
    dispatch(select(id));
  };
  const handleFilterByCategory = (id) => {
    dispatch(setsearchParam(null));
    dispatch(setIsSearching(false));
    dispatch(select(id));
  };
  const handleSearch = (e) => {
    dispatch(diselect(null));
    setSortBy(null);
    dispatch(setIsSearching(false));
    dispatch(setsearchParam(e.target.value));
  };
  const handleSort = (e) => {
    dispatch(diselect(null));
    dispatch(setIsSearching(false));
    dispatch(setsearchParam(null));
    dispatch(setSortBy(e.target.value));
  };
  if (selector !== null) {
    detailedProducts = detailedProducts.filter(
      (product) =>
        product.categoryId === selector || product.userId === selector
    );
  }
  if (searchParam !== null) {
    detailedProducts = detailedProducts.filter((product) => {
      const result = product.varitationName.includes(searchParam);
      if (result) {
        return result;
      }
      return false;
    });
  }
  if (sortBy !== null) {
    if (sortBy === 'price') {
      detailedProducts = detailedProducts.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'quantity') {
      detailedProducts = detailedProducts.sort(
        (a, b) => a.quantity - b.quantity
      );
    }
  }
  return (
    <div className="flex flex-col h-[100vh] overflow-scroll">
      <Navbar />
      <ChatButton />
      <div className={fetchStatus !== 'loading' ? 'hidden' : ''}>
        <Loading />
      </div>
      <div className="flex flex-row gap-[2vw]">
        <div
          className={
            fetchStatus === 'loading'
              ? 'hidden'
              : 'flex flex-col gap-[5vh] bg-gray-100 px-2 py-4 fixed md:hidden'
          }
        >
          <div className="ml-[1vw] w-[18vw] mt-[10vh]">
            <ShowCategories
              categories={categories.payload?.data}
              handleOnClick={handleFilterByCategory}
            />
          </div>
          <div className="ml-[1vw] w-[18vw]">
            <ShowVendors
              vendors={vendors}
              handleOnClick={handleFilterByseller}
            />
          </div>
        </div>
        <div className=" ml-[21vw] bg-white px-2 py-4 md:ml-1">
          <ProductListings
            products={detailedProducts}
            onSearch={handleSearch}
            handleSort={handleSort}
            fetchStatus={fetchStatus}
          />
          <footer className={detailedProducts.length < 1 ? 'hidden' : ''}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
