import { createSlice } from '@reduxjs/toolkit';
// user state storage
export const userSlice = createSlice({
  name: 'userState',
  initialState: {},
  reducers: {
    login: (state, payload) => {
      return { ...payload };
    },
    getuser: (state) => {
      return state;
    },
    logout: () => {
      return {};
    },
  },
});
export const { login, getuser, logout } = userSlice.actions;
export default userSlice.reducer;
