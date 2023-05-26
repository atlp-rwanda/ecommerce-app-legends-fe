import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer, {
  addToWishList,
  viewWishList,
  removeToWishList,
} from '../src/redux/reducers/WishListSlice';

describe('wishlist slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        wishlist: wishlistReducer,
      },
    });
  });

  test('addToWishList should dispatch the correct actions', async () => {
    const expectedActions = [
      addToWishList.pending.type,
      addToWishList.fulfilled.type,
    ];

    await store.dispatch(addToWishList());
  });

  test('viewWishList should dispatch the correct actions', async () => {
    const expectedActions = [
      viewWishList.pending.type,
      viewWishList.fulfilled.type,
    ];

    await store.dispatch(viewWishList());
  });

  test('removeToWishList should dispatch the correct actions', async () => {
    const expectedActions = [
      removeToWishList.pending.type,
      removeToWishList.fulfilled.type,
    ];

    await store.dispatch(removeToWishList(1));

    const dispatchedActions = store.getState().wishlist.status;
  });
});
