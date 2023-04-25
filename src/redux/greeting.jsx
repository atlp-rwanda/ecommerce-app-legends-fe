import { createSlice } from '@reduxjs/toolkit';

export const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    greet: 'I can greet',
  },
  // defining actions through reducer
  reducers: {
    greet: (state) => {
      state.greet = 'hello devs';
    },
    sayBye: (state) => {
      state.greet = 'bye bye happy coding';
    },
  },
});
// Action creators to begenerated for each case reducer function

export const { greet, sayBye } = greetingSlice.actions;
export default greetingSlice.reducer;
