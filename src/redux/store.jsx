import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/buttons';

const store = configureStore({
  reducer: reducers,
});

export default store;
