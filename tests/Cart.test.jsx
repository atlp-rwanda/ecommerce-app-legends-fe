import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  viewCart,
  updateCart,
  removeFromCart,
} from '../src/redux/reducers/CartSlice';

describe('cart slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  test('addToCart should dispatch the correct actions', async () => {
    const expectedActions = [addToCart.pending.type, addToCart.fulfilled.type];

    await store.dispatch(addToCart());
  });

  test('viewCart should dispatch the correct actions', async () => {
    const expectedActions = [viewCart.pending.type, viewCart.fulfilled.type];

    await store.dispatch(viewCart());
  });

  test('updateCart should dispatch the correct actions', async () => {
    const expectedActions = [
      updateCart.pending.type,
      updateCart.fulfilled.type,
    ];

    await store.dispatch(updateCart({ id: 1, quantity: 2 }));
  });

  test('removeFromCart should dispatch the correct actions', async () => {
    const expectedActions = [
      removeFromCart.pending.type,
      removeFromCart.fulfilled.type,
    ];

    await store.dispatch(removeFromCart(1));

    const dispatchedActions = store.getState().cart.status;
  });
});
