import { configureStore } from '@reduxjs/toolkit';
import buttonReducer from './reducers/buttons';
import userReducer from './reducers/user';
import CurrentUserReducer from './reducers/AuthUser';

const store = configureStore({
  reducer: {
    ...buttonReducer,
    user: userReducer,
    currentUser: CurrentUserReducer,
  },
});

export default store;
