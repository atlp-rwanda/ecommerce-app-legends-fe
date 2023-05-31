import { configureStore } from '@reduxjs/toolkit';
import ShoppableProductSlice, {
  fetchShoppableProducts,
} from '../src/redux/reducers/products/AvailbleProducts';
import selectCatSlice, {
  diselect,
  select,
} from '../src/redux/reducers/products/DrowCategories';

describe('shop page product slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ShoppableProducts: ShoppableProductSlice,
        selector: selectCatSlice,
      },
    });
  });
  test('to fetch to the shop page should require the following actions', async () => {
    const expectedActions = [
      fetchShoppableProducts.pending.type,
      fetchShoppableProducts.fulfilled.type,
      fetchShoppableProducts.rejected.type,
    ];

    await store.dispatch(fetchShoppableProducts());
  });
  test('should pick category in which product from the shop page belongs to', async () => {
    await store.dispatch(select(2));
  });
  test('should leave category in which product from the shop page belongs to', async () => {
    await store.dispatch(diselect(null));
  });
});
