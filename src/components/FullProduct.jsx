import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormInput from './formControlscomponents/formInput/FormInput';
import imgInputController from './formControlscomponents/formInput/imgInputController';
import {
  fetchSellerProducts,
  updateSellerProducts,
} from '../redux/reducers/seller/SellerProductSlice';

const FullProduct = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [productImg, setproductImg] = useState(product.image);
  const [newProductImg, setNewProductImg] = useState(null);

  const [productFormValue, setProductFormValue] = useState(product);
  const { sellerProducts } = useSelector((state) => state.sellerProducts);
  const { status, error, updateProductStatus } = sellerProducts;
  const data = sellerProducts.products?.data;
  const handleTyping = (event) => {
    setProductFormValue({
      ...productFormValue,
      [event.target.name]: event.target.value,
    });
  };

  // Handle product Update event
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const fromData = new FormData(formElement);
    if (newProductImg) {
      fromData.append('image', event.target[0].files[0]);
    }
    const formDataObject = Object.fromEntries(fromData.entries());
    setProductFormValue(formDataObject);
    try {
      await dispatch(
        updateSellerProducts({ id: formDataObject.id, body: fromData })
      );
      await dispatch(fetchSellerProducts());
    } catch (errors) {
      // Handle error if necessary
    }
  };

  // On product image  change
  const imgDisplay = (e) => {
    setproductImg(window.URL.createObjectURL(e.target.files[0]));
    setNewProductImg(window.URL.createObjectURL(e.target.files[0]));
  };

  const [updateProductbtn, setUpdateProductbtn] = useState({
    text: 'Update',
    loading: 'hidden',
    disabled: false,
  });

  useEffect(() => {
    setProductFormValue(data?.products.find((elem) => elem.id === product.id));
    setproductImg(product.image);
  }, [dispatch]);

  // useEffect(() => {
  //   if (status === 'succeeded' && updateProductStatus !== '') {
  //     toast.success(sellerProducts.updateProductStatus, {
  //       theme: 'colored',
  //     });
  //   } else if (sellerProducts.status === 'failed' && sellerProducts.error) {
  //     toast.error(sellerProducts.error, { theme: 'colored' });
  //   }
  // }, [updateProductStatus]);

  return (
    <div className="product z-[99] mb-4 border-2 rounded p-3">
      <h1 className="z-[9999] font-mono text-lg ">{t('product')} </h1>
      <hr />
      <form
        className=" flex justify-evenly flex-wrap flex-row-reverse"
        onSubmit={handleUpdateProduct}
      >
        <div className="w-[60%] md:max-h-[300px] max-h-fit my-5 relative">
          {imgInputController(
            imgDisplay,
            productImg,
            false,
            t('product_image')
          )}
        </div>
        <div className="w-[100%] min-w-[20em] flex  flex-wrap  ">
          <div className="sm:px-3 p-2 m-2">
            <label htmlFor="name" className=" text-[#2b2b2b] text-sm block">
              {t('name')}
            </label>
            <FormInput
              id="name"
              onChange={(event) => handleTyping(event)}
              name="name"
              value={productFormValue && productFormValue.name}
              type="text"
              required
              className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            />
          </div>

          <div className="sm:px-3 p-2 mx-2">
            <label htmlFor="model" className=" text-[#2b2b2b] text-sm block ">
              {t('model')}
            </label>
            <FormInput
              id="model"
              onChange={(event) => handleTyping(event)}
              name="model"
              value={productFormValue && productFormValue.model}
              type="text"
              required
              className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            />
          </div>

          <div className="sm:px-3 p-2 mx-2">
            <label htmlFor="keyword" className=" text-[#2b2b2b] text-sm block ">
              {t('keyword')}
            </label>
            <FormInput
              id="keyword"
              onChange={(event) => handleTyping(event)}
              name="keyword"
              value={productFormValue && productFormValue.keyword}
              type="text"
              required
              className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            />
          </div>

          <div className="sm:px-3 p-2 mx-2">
            <label
              htmlFor="expiredAt"
              className=" text-[#2b2b2b] text-sm block "
            >
              {t('expiration_date')}
            </label>
            <FormInput
              id="expiredAt"
              onChange={(event) => handleTyping(event)}
              name="expiredAt"
              value={
                productFormValue &&
                new Date(productFormValue.expiredAt).toLocaleDateString('en-CA')
              }
              type="date"
              required
              className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            />
          </div>
          <div className="sm:px-3 p-2 mx-2">
            <label
              htmlFor="description"
              className=" text-[#2b2b2b] text-sm block "
            >
              {t('availability')}
            </label>
            <select
              id="status"
              name="status"
              value={productFormValue && productFormValue.status}
              onChange={(event) => handleTyping(event)}
              className=" inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            >
              <option value="" selected={!productFormValue}>
                {' '}
                -- Select --{' '}
              </option>
              {['AVAILABLE', 'UNAVAILABLE'].map((statusElement) => (
                <option key={statusElement} value={statusElement}>
                  {statusElement}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:px-3 w-full p-2 mx-2">
            <label
              htmlFor="description"
              className=" text-[#2b2b2b] text-sm block "
            >
              {t('description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={productFormValue && productFormValue.description}
              onChange={(event) => handleTyping(event)}
              className=" mt-2 border-[1px] border-gray-400 w-full rounded-md p-2"
              rows={4}
            />
          </div>
          <FormInput
            type="hidden"
            name="id"
            value={productFormValue && productFormValue.id}
            onChange={(event) => handleTyping(event)}
          />
          <button
            type="submit"
            className="mt-2 w-full py-2 text-xl bg-[#f97316] font-semibold text-white rounded-md active:bg-white active:border-[#f97316] active:text-[#f97316] active:border-[1px]"
          >
            <span
              id="spin"
              className={`${
                updateProductbtn && updateProductbtn.loading
              } h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3 `}
              role="status"
              disabled={updateProductbtn.disabled}
            />
            {updateProductbtn && updateProductbtn.text}
          </button>
        </div>
      </form>
      <div />
    </div>
  );
};

export default FullProduct;
