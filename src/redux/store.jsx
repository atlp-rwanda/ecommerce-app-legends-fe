import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    ...buttonReducer,
    user: userReducer,
  },
});

export default store;
