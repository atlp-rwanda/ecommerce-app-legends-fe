// create auths reducers
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('currentUser')),
    role: JSON.parse(localStorage.getItem('role')),
    token: JSON.parse(localStorage.getItem('token')),
  },
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    setRole: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.role = action.payload;
      localStorage.setItem('role', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    },
  },
});
export const { setUser, clearUser, setRole, setToken } = userSlice.actions;
export default userSlice.reducer;
