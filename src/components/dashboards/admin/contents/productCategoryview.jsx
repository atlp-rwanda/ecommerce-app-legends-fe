import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { URL } from '../../../../views/auths/Login';

function ProductCategoryPick() {
  const [categories, setcategories] = useState([]);
  const navigate = useNavigate();
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
  return (
    <div className=" pt-16 min-h-[95vh] ml-0 ">
      <h1 className="text-center text-2xl font-regular text-[#112045]">
        choose product categories
      </h1>
      <div className="mt-4">
        {categories.map(({ name, id }) => {
          return (
            <button
              key={id}
              id={id}
              className="mt-2 ml-6 border-[2px] bg-[#b0b0ee0f] px-4 py-2 pb-3 w-[90%] text-left hover:border-orangeSecondary hover:bg-[#ff9e533b] rounded-md"
              onClick={(e) => {
                navigate(`/dashboard/add/products?category=${e.target.id}`);
              }}
              type="submit"
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategoryPick;
