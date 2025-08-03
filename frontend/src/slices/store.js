import { configureStore } from "@reduxjs/toolkit";
import authReducer from './autxSlice';

export default configureStore({
    reducer:{
        auth:authReducer
    }
})