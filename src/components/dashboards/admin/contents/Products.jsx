import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import BreadCumb from '../../../BreadCumb';
import Loading from '../../../Loading';

import Modal from '../../../Modal';

/* eslint import/no-webpack-loader-syntax: off */
import {
  deleteSellerProducts,
  fetchSellerProducts,
} from '../../../../redux/reducers/seller/SellerProductSlice';
import FullProduct from '../../../FullProduct';
import FullProductAttribute from '../../../FullProductAttribute';

const Products = () => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const { sellerProducts } = useSelector((state) => state.sellerProducts);
  const { products, status, error } = sellerProducts;
  const data = products?.data;

  const { deleteStatus } = sellerProducts;

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteSellerProducts(product.id));
        if (status === 'succeeded' && deleteStatus) {
          toast.success(deleteStatus, { theme: 'colored' });
        } else toast.error(error, { theme: 'colored' });
        await dispatch(fetchSellerProducts());
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    handleOpenModal();
    setModalProduct(product);
  };

  // filtred products
  const filteredProducts = data?.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(
    (filteredProducts?.length ?? 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.modal-content')) {
        handleCloseModal();
      }
    };
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
  }, []);

  const crumbs = [{ text: 'Products', path: '/dashboard/products' }];

  if (status === 'loading') {
    return (
      <div className="h-[100vh]">
        <div className="">
          <Loading />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="h-[100vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
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
              {/* <FormInput
                type="text"
                value={searchTerm}
                className="px-3 py-2 rounded border"
                placeholder="Search product"
                onChange={(event) => handleSearchChange(event)}
              /> */}
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
                <th className="table-header"> Image </th>
                <th className="table-header">{t('pname')}</th>
                <th className="table-header">{t('model')}</th>
                <th className="table-header">{t('status')}</th>
                <th className="table-header">{t('option')}</th>
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
          <div className="flex justify-center mt-12">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                type="button"
                key={index}
                className={`mr-2 px-4 py-1 mb-4 rounded ${
                  currentPage === index + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-300'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>

      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        {modalProduct && <FullProduct product={modalProduct} />}
        {modalProduct && <FullProductAttribute product={modalProduct} />}
      </Modal>
    </div>
  );
};

export default Products;
