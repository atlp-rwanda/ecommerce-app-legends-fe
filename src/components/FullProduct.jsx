import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './formControlscomponents/formInput/FormInput';
import imgInputController from './formControlscomponents/formInput/imgInputController';
import {
  fetchSellerProducts,
  updateSellerProducts,
} from '../redux/reducers/seller/SellerProductSlice';

const FullProduct = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sellerProducts } = useSelector((state) => state.sellerProducts);
  const [productImg, setProductImg] = useState(product.image);
  const [newProductImg, setNewProductImg] = useState(null);
  const [productFormValue, setProductFormValue] = useState(product);

  const handleTyping = (event) => {
    setProductFormValue((prevFormValue) => ({
      ...prevFormValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (newProductImg) {
      formData.set('image', event.target[0].files[0]);
    }

    const formDataObject = Object.fromEntries(formData.entries());
    setProductFormValue(formDataObject);

    try {
      await dispatch(
        updateSellerProducts({ id: formDataObject.id, body: formData })
      );
      await dispatch(fetchSellerProducts());
    } catch (err) {
      // Handle error if necessary
    }
  };

  const imgDisplay = (e) => {
    setProductImg(window.URL.createObjectURL(e.target.files[0]));
    setNewProductImg(window.URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (Array.isArray(sellerProducts.products?.data)) {
      const foundProduct = sellerProducts.products.data.find(
        (elem) => elem.id === product.id
      );
      if (foundProduct) {
        setProductFormValue(foundProduct);
      }
    }
    setProductImg(product.image);
  }, [dispatch, product.id, sellerProducts.products]);

  const [updateProductbtn, setUpdateProdutbtn] = useState({
    text: 'Update',
    loading: 'hidden',
    disabled: false,
  });

  const renderFormInput = (label, name, type = 'text', options = []) => (
    <div className="sm:px-3 p-2 mx-2">
      <label htmlFor={name} className="text-[#2b2b2b] text-sm block">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={productFormValue?.[name] || ''}
          onChange={handleTyping}
          className="mt-2 border-[1px] border-gray-400 w-full rounded-md p-2"
          rows={4}
        />
      ) : (
        <>
          <FormInput
            id={name}
            onChange={handleTyping}
            name={name}
            value={productFormValue?.[name] || ''}
            type={type}
            required
            className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
          />
          {options.length > 0 && (
            <select
              id={name}
              name={name}
              value={productFormValue?.[name] || ''}
              onChange={handleTyping}
              className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
            >
              <option value="" selected={!productFormValue}>
                -- Select --
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="product z-[99] mb-4 border-2 rounded p-3">
      <h1 className="z-[9999] font-mono text-lg">{t('product')}</h1>
      <hr />
      <form
        className="flex justify-evenly flex-wrap flex-row-reverse"
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
        <div className="w-[100%] min-w-[20em] flex flex-wrap">
          {renderFormInput(t('name'), 'name')}
          {renderFormInput(t('model'), 'model')}
          {renderFormInput(t('keyword'), 'keyword')}
          {renderFormInput(t('expiration_date'), 'expiredAt', 'date')}
          {renderFormInput(t('availability'), 'status', 'select', [
            'AVAILABLE',
            'UNAVAILABLE',
          ])}
          {renderFormInput(t('description'), 'description', 'textarea')}
          <FormInput
            type="hidden"
            name="id"
            value={productFormValue?.id || ''}
            onChange={handleTyping}
          />
          <button
            type="submit"
            className="mt-2 w-full py-2 text-xl bg-[#f97316] font-semibold text-white rounded-md active:bg-white active:border-[#f97316] active:text-[#f97316] active:border-[1px]"
          >
            <span
              id="spin"
              className={`${
                updateProductbtn && updateProductbtn.loading
              } h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3`}
              role="status"
              disabled={updateProductbtn?.disabled}
            />
            {updateProductbtn?.text}
          </button>
        </div>
      </form>
      <div />
    </div>
  );
};

export default FullProduct;
