import { configureStore } from '@reduxjs/toolkit';
import greetReducer from './greeting';
export default configureStore({
    //all our reducer functions will be placed right here
    reducer: {
        greeting: greetReducer
    }, 
});