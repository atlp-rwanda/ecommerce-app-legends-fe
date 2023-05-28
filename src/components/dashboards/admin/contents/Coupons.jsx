import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import FormInput from '../../../formControlscomponents/formInput/FormInput';
import BreadCumb from '../../../BreadCumb';

const Coupons = () => {
  const { t } = useTranslation();
  const crumbs = [{ text: 'Coupons', path: '/dashboard/coupons' }];
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
    </div>
  );
};

export default Coupons;
