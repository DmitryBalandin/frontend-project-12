import { configureStore } from "@reduxjs/toolkit";
import authReducer from './autxSlice';
import channelsReducer from './channelsSlice';


export default configureStore({
    reducer:{
        authReducer,
        channelsReducer
    }
})