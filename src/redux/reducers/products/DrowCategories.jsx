import { createSlice } from '@reduxjs/toolkit';

const selectCatSlice = createSlice({
  name: 'selector',
  initialState: {
    selector: null,
  },
  reducers: {
    select: (state, action) => {
      return { ...state, selector: action.payload };
    },
    diselect: (state, action) => {
      return { ...state, selector: action.payload };
    },
  },
});
export const { select, diselect } = selectCatSlice.actions;
export default selectCatSlice.reducer;
