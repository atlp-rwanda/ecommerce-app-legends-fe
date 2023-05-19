import { createSlice } from '@reduxjs/toolkit';

const selectSearchKeySlice = createSlice({
  name: 'selector',
  initialState: {
    sortBy: null,
    searchParam: null,
  },
  reducers: {
    setSortBy: (state, action) => {
      return { ...state, sortBy: action.payload, searchParam: null };
    },
    setsearchParam: (state, action) => {
      return { ...state, searchParam: action.payload, sortBy: null };
    },
    setSortAndSearchParam: (state) => {
      return { ...state, sortBy: null, searchParam: null };
    },
  },
});
export const { setSortBy, setsearchParam, setSortAndSearchParam } =
  selectSearchKeySlice.actions;
export default selectSearchKeySlice.reducer;
