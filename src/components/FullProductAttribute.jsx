import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import imgInputController from './formControlscomponents/formInput/imgInputController';
/* eslint import/no-webpack-loader-syntax: off */
import {
  fetchSellerProducts,
  updateProductAttribute,
} from '../redux/reducers/seller/SellerProductSlice';
import FormInput from './formControlscomponents/formInput/FormInput';

const FullProductAttribute = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sellerProducts } = useSelector((state) => state.sellerProducts);
  const { error } = sellerProducts;
  const data = sellerProducts.products?.data;

  const [productFormValue, setProductFormValue] = useState(product);

  useEffect(() => {
    setProductFormValue(data?.products.find((elem) => elem.id === product.id));
  }, [product]);

  const handleUpdateProductAttribute = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (event.target?.[0]?.files.length) {
      formData.append('attrImage', event.target[0].files[0]);
    }
    const formDataObject = Object.fromEntries(formData.entries());
    await dispatch(
      updateProductAttribute({ id: formDataObject.id, body: formData })
    );
    await dispatch(fetchSellerProducts());
  };

  const handleTypingAttribute = (event, productAttributeId) => {
    const newAttributes = productFormValue.ProductAttributes.map((attribute) =>
      attribute.id === productAttributeId
        ? { ...attribute, [event.target.name]: event.target.value }
        : attribute
    );
    setProductFormValue({
      ...productFormValue,
      ProductAttributes: newAttributes,
    });
  };

  const imgAttributeDisplay = (event) => {
    const formElement = event.target
      .closest('form')
      .querySelector('input[name="id"]');
    const newAttributes = productFormValue.ProductAttributes.map((attribute) =>
      Number(attribute.id) === Number(formElement.value)
        ? {
            ...attribute,
            attrImage: window.URL.createObjectURL(event.target.files[0]),
          }
        : attribute
    );
    setProductFormValue({
      ...productFormValue,
      ProductAttributes: newAttributes,
    });
  };

  const [updateProductbtn, setUpdateProdutbtn] = useState({
    text: 'Update',
    loading: 'hidden',
    disabled: false,
  });

  const renderFormInput = (label, name, value) => (
    <div className="p-2 w-1/2 md:w-full">
      <label htmlFor={name} className="text-[#2b2b2b] text-sm block">
        {label}
      </label>
      <FormInput
        id={name}
        onChange={(event) => handleTypingAttribute(event, productAttibute.id)}
        name={name}
        value={value}
        type="text"
        required
        className="inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
      />
    </div>
  );

  return (
    <div className="product z-[99] border-2 rounded p-3">
      <h1 className="z-[9999] font-mono text-lg ">{t('product_attribute')} </h1>
      <hr />
      {productFormValue?.ProductAttributes ? (
        productFormValue?.ProductAttributes.map((productAttibute) => (
          <form
            key={productAttibute.id}
            className="flex justify-evenly flex-row md:flex-col sm:flex-col md:h-fit items-center sm:items-center py-3 mb-3 border rounded px-2"
            onSubmit={handleUpdateProductAttribute}
          >
            <div className="w-[33%] md:w-[80%] md:max-h-fit md:mb-[2%] md md:h-fit relative">
              {imgInputController(
                imgAttributeDisplay,
                productAttibute.attrImage,
                false,
                t('product_image')
              )}
            </div>
            <div className="relative w-[100%] min-w-[20em flex flex-col  items-end md:items-center ">
              <div className="flex sm:flex-col flex-wrap">
                {renderFormInput(
                  t('attr_name'),
                  'varitationName',
                  productAttibute.varitationName
                )}
                {renderFormInput(
                  t('quantity'),
                  'quantity',
                  productAttibute.quantity
                )}
                {renderFormInput(t('price'), 'price', productAttibute.price)}
                {renderFormInput(t('size'), 'size', productAttibute.size)}
                <FormInput
                  type="hidden"
                  name="id"
                  value={productAttibute.id}
                  onChange={(event) =>
                    handleTypingAttribute(event, productAttibute.id)
                  }
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-2/5 py-1 text-md float-left bg-[#f97316] font-semibold text-white rounded-md active:bg-white active:border-[#f97316] active:text-[#f97316] active:border-[1px]"
              >
                <span
                  id="spin"
                  className={`${
                    updateProductbtn && updateProductbtn.loading
                  } h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3`}
                  role="status"
                  disabled={updateProductbtn.disabled}
                />
                {updateProductbtn && updateProductbtn.text}
              </button>
            </div>
          </form>
        ))
      ) : (
        <div>{t('no_data_found')}</div>
      )}
      <div />
    </div>
  );
};

export default FullProductAttribute;
