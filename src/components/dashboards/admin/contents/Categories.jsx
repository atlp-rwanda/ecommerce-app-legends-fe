import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { URL } from '../../../../views/auths/Login';

class ProductField {
  constructor(label, placeholder, type) {
    this.label = label;
    this.placeholder = placeholder;
    this.type = type;
  }
}
const Categories = () => {
  const { t } = useTranslation();
  const [addProductbtn, setaddProductbtn] = useState({
    text: 'add category',
    loading: 'hidden',
    disabled: false,
  });
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    fetch(`${URL}/api/v1/category/all`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        setcategories(data.data);
      });
  }, []);
  const [categoryName, setCategoryName] = useState('');
  const allFields = [
    new ProductField('Category name', ' category title', 'text'),
  ];

  const handlehandleCategories = async (event) => {
    event.preventDefault();
    setaddProductbtn((prev) => ({
      ...prev,
      text: 'LOADING...',
      loading: 'inline-block',
      disabled: true,
    }));

    const token = JSON.parse(localStorage.token);
    await axios
      .post(
        `${URL}/api/v1/category/add`,
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.status === 'success') {
          toast.success('new category added', { theme: 'colored' });
        } else {
          toast.error('something went wrong while adding category', {
            theme: 'colored',
          });
        }
      });
    setaddProductbtn((prev) => ({
      ...prev,
      text: 'add product',
      loading: 'hidden',
      disabled: false,
    }));
  };

  return (
    <div className="pt-20 min-h-[95vh0 ml-0 mt-10 ">
      <form
        className=" flex justify-evenly flex-wrap flex-row-reverse"
        onSubmit={handlehandleCategories}
      >
        <div className="w-[50%] min-w-[20em]">
          {allFields.map(({ label, placeholder, type }) => {
            return (
              <div key={label}>
                <label className=" text-[#2b2b2b] text-sm">{label}</label>
                <input
                  placeholder={placeholder}
                  type={type}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  className=" invalid:focus:border-red-400 valid:focus:border-green-400 h-[2.5em] w-full rounded-[5px] border border-blue-gray-200 px-3 py-2 font-sans text-md font-extralight text-blue-gray-400 outline-none outline-[.2px] transition-all  placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:border-blue-500 focus:outline-0  "
                />
              </div>
            );
          })}
          <button
            type="submit"
            className="mt-2 w-full py-2 text-xl bg-[#f97316] font-semibold text-white rounded-md active:bg-white active:border-[#f97316] active:text-[#f97316] active:border-[1px]"
          >
            <span
              id="spin"
              className={`${addProductbtn.loading} h-5 w-5 animate-spin rounded-full border-white border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3 `}
              role="status"
              disabled={addProductbtn.disabled}
            />
            {addProductbtn.text}
          </button>
        </div>
      </form>
      <div className=" pt-16 min-h-[95vh] ml-0 ">
        <h1 className="text-center text-2xl font-regular text-[#112045] uppercase">
          available product categories
        </h1>
        <div className="mt-4">
          {categories.map(({ name, id }) => {
            return (
              <button
                key={id}
                id={id}
                className="mt-2 ml-6 border-[2px] bg-[#b0b0ee0f] px-4 py-2 pb-3 w-[90%] text-left rounded-md"
                type="submit"
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
