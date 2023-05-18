import React from 'react';

import SingleProduct from './singleProduct';
import ShopingHeader from '../../redux/reducers/products/shopingHeader';

const ProductListings = ({ products, onSearch, handleSort, fetchStatus }) => {
  return (
    <div className="bg-gray-50 mt-[10vh]">
      <ShopingHeader
        onSearch={onSearch}
        handleSort={handleSort}
        fetchStatus={fetchStatus}
        products={products}
      />
      <div className="p-4 grid grid-cols-4 md:grid-cols-2 md:p-1 md:-ml-4">
        {products &&
          products.map((product) => (
            <SingleProduct product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};
export default ProductListings;
