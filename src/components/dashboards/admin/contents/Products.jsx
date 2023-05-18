import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import BreadCumb from '../../../BreadCumb';
import FormInput from '../../../formControlscomponents/formInput/FormInput';
import imgInputController from '../../../formControlscomponents/formInput/imgInputController';

/* eslint import/no-webpack-loader-syntax: off */
import {
  deleteSellerProducts,
  fetchSellerProducts,
  updateSellerProducts,
  updateProductAttribute,
} from '../../../../redux/reducers/seller/SellerProductSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const { sellerProducts, searchedProducts } = useSelector(
    (state) => state.sellerProducts
  );

  const [productFormValue, setProductFormValue] = useState({});

  const [productImg, setproductImg] = useState('');
  const [newProductImg, setNewProductImg] = useState(null);
  const [productAttributeImgs, setproductAttributeImgs] = useState('');
  // const [newProductAttributeImg, setNewProductAttributeImg] = useState('');

  const [updateProductbtn, setUpdateProductbtn] = useState({
    text: 'Update',
    loading: 'hidden',
    disabled: false,
  });
  const { products, status, error } = sellerProducts;
  const data = products?.data;

  const handleChangePage = (page) => setCurrentPage(page);

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: t('are_you_sure'),
      // eslint-disable-next-line quotes
      text: t('you_will_not_be_able_to_revert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: t('cancel'),
      confirmButtonText: t('yes_delete_it'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSellerProducts(product.id));
        if (status === 'succeeded') {
          if (status === 'succeeded') {
            toast.success(products?.message, { theme: 'colored' });
          } else toast.error(error, { theme: 'colored' });
          dispatch(fetchSellerProducts());
        }
      }
    });
  };

  const handleEditProduct = (product) => {
    setIsModalOpen(true);
    setModalProduct(product);
    setproductImg(product.image);
    setProductFormValue(product);
  };

  const handleTyping = (event) => {
    setProductFormValue({
      ...productFormValue,
      [event.target.name]: event.target.value,
    });
  };

  // Handle product attribute
  const handleTypingAttribute = (event, productAttibuteId) => {
    const newAttributes = productFormValue.ProductAttributes.map(
      (attribute) => {
        if (attribute.id === productAttibuteId)
          return { ...attribute, [event.target.name]: event.target.value };
        return attribute;
      }
    );
    setProductFormValue({
      ...productFormValue,
      ProductAttributes: newAttributes,
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

    dispatch(
      updateSellerProducts({ id: formDataObject.id, body: fromData })
    ).the(() => {
      dispatch(fetchSellerProducts());
    });
  };

  // Handle product attribute update
  const handleUpdateProductAttribute = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (event.target?.[0]?.files.length) {
      formData.append('attrImage', event.target[0].files[0]);
    }
    const formDataObject = Object.fromEntries(formData.entries());
    dispatch(
      updateProductAttribute({ id: formDataObject.id, body: formData })
    ).then(() => {
      dispatch(fetchSellerProducts());
    });
  };

  // On product image  change
  const imgDisplay = (e) => {
    setproductImg(window.URL.createObjectURL(e.target.files[0]));
    setNewProductImg(window.URL.createObjectURL(e.target.files[0]));
  };

  // On product image attribute change
  const imgAttributeDisplay = (event) => {
    const formElement = event.target
      .closest('form')
      .querySelector('input[name="id"]');
    const newAttributes = productFormValue.ProductAttributes.map(
      (attribute) => {
        if (Number(attribute.id) === Number(formElement.value)) {
          return {
            ...attribute,
            attrImage: window.URL.createObjectURL(event.target.files[0]),
          };
        }
        return attribute;
      }
    );
    setProductFormValue({
      ...productFormValue,
      ProductAttributes: newAttributes,
    });
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest('.modal-content')) {
        setIsModalOpen(false);
        setModalProduct(null);
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [currentPage]);

  useEffect(() => {
    setProductFormValue(modalProduct);
  }, [modalProduct]);

  const crumbs = [{ text: 'Products', path: '/dashboard/products' }];

  if (status === 'loading') {
    return (
      <div className="h-[100vh]">
        <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
          {t('loaidng')}
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="h-[100vh]">
        <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
          Error: {error}
        </div>
      </div>
    );
  }
  return (
    <div className="p-5">
      <div className="pt-16 h-fit md:w-full">
        <div>
          <BreadCumb className="my-9" crumbs={crumbs} />
        </div>

        <div className="overflow-x-auto p-2">
          <div className="table-nav flex justify-between px-[5%] items-center p-2">
            {' '}
            <form action="">
              {' '}
              <FormInput
                type="text"
                className="px-3 py-2 rounded border"
                placeholder="search..."
              />{' '}
            </form>{' '}
            <div>
              {' '}
              <NavLink
                to="/dashboard/products/categories"
                className="add p-2 rounded bg-darkBlueColor text-whiteColor"
              >
                {' '}
                <button className="w-fit" type="button">
                  <Icon
                    className="inline"
                    icon="material-symbols:add text-whiteColor"
                  />{' '}
                  {t('add')}
                </button>
              </NavLink>{' '}
            </div>
          </div>
          <table className="table-auto w-full">
            <thead className="text-darkBlueColor">
              <tr>
                <th className="border px-4 py-2"> Image </th>
                <th className="border px-4 py-2">{t('pname')}</th>
                <th className="border px-4 py-2">{t('model')}</th>
                <th className="border px-4 py-2">{t('status')}</th>
                <th className="border px-4 py-2">{t('option')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.length ? (
                data.products.map((product) => (
                  <tr key={product.id}>
                    {' '}
                    <td className="border px-1 py-1 text-center">
                      {' '}
                      <img
                        src={product.image}
                        className="w-[80px] h-[80px] sm:w-[50px] m-auto"
                        alt=""
                      />{' '}
                    </td>{' '}
                    <td className="border px-2 py-1">{product.name}</td>
                    <td className="border px-4 py-2">{product.model}</td>
                    <td className="border px-4 py-2">{product.status}</td>
                    <td className="border cursor-pointer px-2 py-1">
                      <div className="flex justify-center items-center">
                        <Icon
                          onClick={() =>
                            handleEditProduct({
                              ...product,
                              expiredAt: new Date(
                                product.expiredAt
                              ).toLocaleDateString('en-CA'),
                            })
                          }
                          className="text-[26px] cursor-pointer text-blue-900 hover:bg-lightGrey mx-1 p-1 border"
                          icon="material-symbols:edit"
                        />
                        <Icon
                          onClick={() => handleDeleteProduct(product)}
                          className="text-[26px] cursor-pointer text-red-900 hover:bg-lightGrey mx-1 p-1 border"
                          icon="ic:baseline-delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center p-2" colSpan={5}>
                    {t('no_data_found')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data?.products?.length ? (
          <div className="flex justify-center mt-4 items-center">
            <Icon
              className="cursor-pointer text-[30px]"
              icon="material-symbols:keyboard-double-arrow-left-rounded"
            />
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {[...Array(data.totalPages)].map((_, i) => (
                <button
                  type="button"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`page_${i}`}
                  onClick={() => handleChangePage(i + 1)}
                  className={`relative inline-flex items-center px-3 py-1 border border-gray-300 bg-darkBlueColor text-sm font-medium text-whiteColor hover:bg-gray-50 hover:text-darkBlueColor ${
                    i + 1 === currentPage
                      ? 'z-10 bg-whiteColor text-darkBlueColor'
                      : ''
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
            <Icon
              className="cursor-pointer text-[30px]"
              icon="material-symbols:keyboard-double-arrow-right-rounded"
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div
        className={`${
          isModalOpen && modalProduct ? 'fixed' : 'hidden'
        } fixed z-5 inset-0 overflow-y-auto bg-opacity-50 bg-black`}
      >
        <div className="relative z-[9999] max-h-screen overflow-y-auto top-1/2 transform -translate-y-1/2 w-11/12 mx-auto max-w-2xl">
          <div className="modal-content sticky bg-white z-[9999] shadow-lg rounded-lg p-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold">{t('edit_product')}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalProduct(null);
                }}
                type="button"
                className="text-gray-900 hover:text-gray-600 focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 8.586L6.879 5.464 5.464 6.879 8.586 10l-2.122 2.121 1.415 1.415L10 11.414l3.121 3.122 1.415-1.415L11.414 10l2.122-2.121-1.415-1.415z"
                  />
                </svg>
              </button>
            </div>
            <div>
              {/* start Prodcut */}
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
                      <label
                        htmlFor="name"
                        className=" text-[#2b2b2b] text-sm block "
                      >
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
                      <label
                        htmlFor="model"
                        className=" text-[#2b2b2b] text-sm block "
                      >
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
                      <label
                        htmlFor="keyword"
                        className=" text-[#2b2b2b] text-sm block "
                      >
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
                        value={productFormValue && productFormValue.expiredAt}
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
                        onChange={(event) => handleTyping(event)}
                        className=" inputFormClass placeholder-shown:border-t-blue-gray-200 focus:border-1"
                      >
                        <option value="" selected={!productFormValue}>
                          {' '}
                          -- Select --{' '}
                        </option>
                        {['AVAILABLE', 'UNAVAILABLE'].map((statusElement) => (
                          <option
                            key={statusElement}
                            value={statusElement}
                            selected={
                              statusElement ===
                              (productFormValue && productFormValue.status)
                            }
                          >
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
              {/* End Product */}

              {/* Start Product Attributes */}
              <div className="product z-[99] border-2 rounded p-3">
                <h1 className="z-[9999] font-mono text-lg ">
                  {t('product_attribute')}{' '}
                </h1>
                <hr />
                {productFormValue?.ProductAttributes ? (
                  productFormValue?.ProductAttributes.map(
                    (productAttibute, index, array) => (
                      <form
                        key={productAttibute.id}
                        className=" flex justify-evenly flex-row md:flex-col sm:flex-col md:h-fit items-center sm:items-center py-3 mb-3 border rounded px-2 "
                        onSubmit={handleUpdateProductAttribute}
                      >
                        <div className="w-[33%] md:w-[80%] md:max-h-fit  md:mb-[2%] md md:h-fit relative">
                          {imgInputController(
                            imgAttributeDisplay,
                            productAttibute.attrImage,
                            false,
                            t('product_image')
                          )}
                        </div>
                        <div className="relative w-[100%] min-w-[20em flex md:flex-col  items-end md:items-center ">
                          <div className=" flex md:flex-col flex-wrap ">
                            <div className="p-2 w-1/2 sm:w-full relative">
                              <label
                                htmlFor="name"
                                className=" text-[#2b2b2b] text-sm block "
                              >
                                {t('attr_name')}
                              </label>
                              <FormInput
                                id="varitationName"
                                onChange={(event) =>
                                  handleTypingAttribute(
                                    event,
                                    productAttibute.id
                                  )
                                }
                                name="varitationName"
                                value={productAttibute.varitationName}
                                type="text"
                                required
                                className="inputFormClass sm:w-full px-1 placeholder-shown:border-t-blue-gray-200 focus:border-1"
                              />
                            </div>

                            <div className="p-2 w-1/2 md:w-full">
                              <label
                                htmlFor="quantity"
                                className=" text-[#2b2b2b] text-sm block "
                              >
                                {t('quantity')}
                              </label>
                              <FormInput
                                id="quantity"
                                onChange={(event) =>
                                  handleTypingAttribute(
                                    event,
                                    productAttibute.id
                                  )
                                }
                                name="quantity"
                                value={productAttibute.quantity}
                                type="text"
                                required
                                className="inputFormClass sm:w-full px-1 placeholder-shown:border-t-blue-gray-200 focus:border-1"
                              />
                            </div>

                            <div className="p-2  w-1/2 md:w-full">
                              <label
                                htmlFor="price"
                                className=" text-[#2b2b2b] text-sm block "
                              >
                                {t('price')}
                              </label>
                              <FormInput
                                id="price"
                                onChange={(event) =>
                                  handleTypingAttribute(
                                    event,
                                    productAttibute.id
                                  )
                                }
                                name="price"
                                value={productAttibute.price}
                                type="text"
                                required
                                className="inputFormClass sm:w-full px-1 placeholder-shown:border-t-blue-gray-200 focus:border-1"
                              />
                            </div>

                            <div className="p-2  w-1/2 md:w-full">
                              <label
                                htmlFor="size"
                                className=" text-[#2b2b2b] text-sm block "
                              >
                                {t('size')}
                              </label>
                              <FormInput
                                id="size"
                                onChange={(event) =>
                                  handleTypingAttribute(
                                    event,
                                    productAttibute.id
                                  )
                                }
                                name="size"
                                value={productAttibute.size}
                                type="text"
                                required
                                className="inputFormClass sm:w-full px-1 placeholder-shown:border-t-blue-gray-200 focus:border-1"
                              />
                            </div>
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
                              } h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3 `}
                              role="status"
                              disabled={updateProductbtn.disabled}
                            />
                            {updateProductbtn && updateProductbtn.text}
                          </button>
                        </div>
                      </form>
                    )
                  )
                ) : (
                  <div> {t('no_data_found')} </div>
                )}
                <div />
              </div>
              {/* End Product Attributes */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
