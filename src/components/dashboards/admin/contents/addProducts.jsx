import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import imgInputController from '../../../formControlscomponents/formInput/imgInputController';
import { URL } from '../../../../views/auths/Login';

class ProductField {
  constructor(label, placeholder, type) {
    this.label = label;
    this.placeholder = placeholder;
    this.type = type;
  }
}

function AddProducts() {
  const navigate = useNavigate();
  const [productImg, setproductImg] = useState();
  const [addProductbtn, setaddProductbtn] = useState({
    text: 'add product',
    loading: 'hidden',
    disabled: false,
  });
  const imgDisplay = (e) => {
    setproductImg(window.URL.createObjectURL(e.target.files[0]));
  };
  const allFields = [
    new ProductField('product name', 'product title', 'text'),
    new ProductField(
      'keywords',
      'keywords for product easy seachability',
      'text'
    ),
    new ProductField('Model', 'Product Model', 'text'),
    new ProductField(
      'Expiration date',
      'Expiration date of the product',
      'date'
    ),
    new ProductField('description', 'Product description', 'text'),
  ];

  const handleAddproducts = async (event) => {
    const id = Number(window.location.search.split('?category=')[1]);
    event.preventDefault();
    setaddProductbtn((prev) => ({
      ...prev,
      text: 'LOADING...',
      loading: 'inline-block',
      disabled: true,
    }));
    const body = new FormData();
    body.append('name', event.target[1].value);
    body.append('image', event.target[0].files[0]);
    body.append('description', event.target[5].value);
    body.append('keyword', event.target[2].value);
    body.append('model', event.target[3].value);
    body.append('status', 'AVAILABLE');
    body.append('categoryId', id);
    body.append('expiryDate', event.target[4].value);
    const token = JSON.parse(localStorage.token);
    await fetch(`${URL}/api/v1/products/add`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status[0] === 's') {
          toast.success(data.message, { theme: 'colored' });
          navigate(`/dashboard/add/products/variation?id=${data.data.id}`);
        } else {
          toast.error(data.message, { theme: 'colored' });
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
    <div className="pt-16 min-h-[95vh] ml-0">
      <h1 className="text-center text-3xl font-regular text-[#112045]">
        products
      </h1>

      <form
        className=" flex justify-evenly flex-wrap flex-row-reverse"
        onSubmit={handleAddproducts}
      >
        {imgInputController(imgDisplay, productImg)}
        <div className="w-[50%] min-w-[20em]">
          {allFields.map(({ label, placeholder, type }) => {
            if (label === 'description') {
              return (
                <textarea
                  key={type}
                  placeholder={placeholder}
                  className=" mt-2 border-[1px] border-gray-400 w-full min-h-[20vh]"
                />
              );
            }
            return (
              <div key={label}>
                <label className=" text-[#2b2b2b] text-sm ">{label}</label>
                <input
                  placeholder={placeholder}
                  type={type}
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
    </div>
  );
}

export default AddProducts;
