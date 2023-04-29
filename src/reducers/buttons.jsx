import { createSlice } from '@reduxjs/toolkit';

export const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    greet: 'I can greet',
  },
  reducers: {
    greet: (state) => {
      return { ...state, greet: 'hello devs' };
    },
    sayBye: (state) => {
      return { ...state, greet: 'bye bye happy coding' };
    },
  },
});

export const activeButtonSlice = createSlice({
  name: 'activeButton',
  initialState: 'dashboard',
  reducers: {
    setActiveButton: (state, action) => {
      return action.payload;
    },
  },
});

export const { greet, sayBye } = greetingSlice.actions;
export const { setActiveButton } = activeButtonSlice.actions;

export default {
  greeting: greetingSlice.reducer,
  activeButton: activeButtonSlice.reducer,
};
