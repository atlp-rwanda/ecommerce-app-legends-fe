import { createSlice } from '@reduxjs/toolkit';

const selectSearchKeySlice = createSlice({
  name: 'selector',
  initialState: {
    sortBy: null,
    searchParam: null,
    isSearcching: false,
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
    setIsSearching: (state, action) => {
      return { ...state, isSearcching: action.payload };
    },
  },
});
export const {
  setSortBy,
  setsearchParam,
  setSortAndSearchParam,
  setIsSearching,
} = selectSearchKeySlice.actions;
export default selectSearchKeySlice.reducer;
