import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { viewCart } from '../../redux/reducers/CartSlice';

function DummyCartNavBar() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewCart());
  }, [dispatch]);
  const navigate = useNavigate();
  const handleNavigateToCart = () => {
    navigate('/cart');
  };
  const handleNavigateToHome = () => {
    navigate('/product-variation');
  };
  return (
    <div>
      <div className="navbar fixed  p-4 bg-slate-600 text-white text-2xl justify-between items-center w-full">
        <nav className="">
          <ul className="flex justify-between">
            <button type="button" onClick={handleNavigateToHome}>
              SHOPPING
            </button>
            {items.data && items.data.cart && (
              <button type="button" onClick={handleNavigateToCart}>
                Cart {items.data.cart.length}
              </button>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DummyCartNavBar;
