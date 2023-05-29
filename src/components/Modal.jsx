import React from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ isModalOpen, handleCloseModal, children }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${
        isModalOpen ? 'fixed' : 'hidden'
      } fixed z-5 inset-0 overflow-y-auto pb-8 pt-32 bg-opacity-50 bg-black`}
    >
      <div className="relative z-[9999] max-h-screen overflow-y-auto top-1/2 transform -translate-y-1/2 w-11/12 mx-auto max-w-2xl">
        <div className="modal-content sticky bg-white z-[999] shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold">{t('edit_product')}</h2>
            <button
              onClick={() => {
                handleCloseModal();
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
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
