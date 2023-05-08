import { createSlice } from '@reduxjs/toolkit';

const toogleSearchFormSlice = createSlice({
  name: 'searchFocused',
  initialState: {
    isSearchOpen: false,
  },
  reducers: {
    toogleSearchForm: (state, action) => {
      return { ...state, isSearchOpen: action.payload };
    },
  },
});

export const { toogleSearchForm } = toogleSearchFormSlice.actions;
export default toogleSearchFormSlice.reducer;
