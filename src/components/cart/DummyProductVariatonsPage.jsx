import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import DummyCartNavBar from './DummyCartNavBar';
import { useGetAllProductQuery } from '../../redux/reducers/productApi';
import { addToCart } from '../../redux/reducers/CartSlice';

function DummyProductVariatonsPage() {
  const { data, isLoading } = useGetAllProductQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    navigate('/cart');
  };
  return (
    <>
      <DummyCartNavBar />
      <div className="">
        <div className="pt-20">
          <div className="mx-96  border-t-4">
            <h1 className="text-md font-bold mx-60">NEW ARIVALS</h1>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="">
              <div className="flex w-full h-96 border mt-4">
                <div className="w-1/2 h-full p-5">
                  <h3 className="mt-12">Product Name : {data.data.name}</h3>
                  <p className="mt-12">
                    Product Description: {data.data.description}
                  </p>
                  <p className="mt-12">Product Status: {data.data.status}</p>
                  <p className="mt-12">Product model : {data.data.model}</p>
                </div>
                <div className="w-1/2 h-full">
                  <img src={data.data.image} alt="" className="h-full" />
                </div>
              </div>
              {data &&
                data.data.ProductAttributes.map((product) => (
                  <div
                    key={product.id}
                    className="flex w-full justify-between text-center mt-2"
                  >
                    <div className="block w-1/6 h-1/6 bg-lime-600">
                      <img
                        src={product.attrImage}
                        className="h-2/6"
                        alt="Product"
                      />
                      <div className="v-names flex space-x-8 px-1 w-full">
                        <h3 className="name"> {product.varitationName}</h3>
                        <h3 className="color">{product.color}</h3>
                        <h3 className="color">{product.size}</h3>
                      </div>
                      <button
                        type="button"
                        className=" bg-gray-600 w-full h-1/6"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DummyProductVariatonsPage;
