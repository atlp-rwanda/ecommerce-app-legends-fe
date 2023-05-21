import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import imgInputController from '../../../formControlscomponents/formInput/imgInputController';
import { URL } from '../../../../views/auths/Login';

class VariationField {
  constructor(label, placeholder, type) {
    this.label = label;
    this.placeholder = placeholder;
    this.type = type;
  }
}

const ProductVariationAdd = () => {
  const { t } = useTranslation();
  const [productImg, setproductImg] = useState();
  const [addProductbtn, setaddProductbtn] = useState({
    text: 'add variation',
    loading: 'hidden',
    disabled: false,
  });

  const allFields = [
    new VariationField('product price', 'product price', 'number'),
    new VariationField('product variation name', 'varitation Name', 'text'),
    new VariationField('product size', 'size', 'text'),
    new VariationField('color', 'product color value', 'text'),
    new VariationField('quantity', 'product quantity', 'number'),
  ];
  const imgDisplay = (e) => {
    setproductImg(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleAddVariation = async (event) => {
    event.preventDefault();
    const id = window.location.search.split('id=')[1];
    setaddProductbtn((prev) => ({
      ...prev,
      text: 'LOADING...',
      loading: 'inline-block',
      disabled: true,
    }));
    const body = new FormData();

    body.append('attrImage', event.target[0].files[0]);
    body.append('price', event.target[1].value);
    body.append('varitationName', event.target[2].value);
    body.append('size', event.target[3].value);
    body.append('color', event.target[4].value);
    body.append('quantity', event.target[5].value);
    body.append('productId', id);
    const token = JSON.parse(localStorage.token);
    await fetch(`${URL}/api/v1/product/variation/add`, {
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
          event.target.reset();
          //   navigate(`/dashboard/add/products/variation?id=${data.data.id}`);
        } else {
          toast.error(data.message, { theme: 'colored' });
        }
      });
    setaddProductbtn((prev) => ({
      ...prev,
      text: 'add variation',
      loading: 'hidden',
      disabled: false,
    }));
    setproductImg('');
  };

  return (
    <div className="pt-20  min-h-[90vh]">
      <h1 className="text-center text-2xl font-regular text-[#112045]">
        Add Product Variation
      </h1>
      <form
        className=" flex justify-evenly flex-wrap flex-row-reverse"
        onSubmit={handleAddVariation}
      >
        <div className="w-[33%] md:w-[50%]  md:max-h-fit max-h-[500px] max-w-fit  relative">
          {imgInputController(
            imgDisplay,
            productImg,
            false,
            t('product_image')
          )}
        </div>

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
};

export default ProductVariationAdd;
