import { configureStore } from "@reduxjs/toolkit";
import authReducer from './autxSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice'

export default configureStore({
    reducer:{
        authReducer,
        channelsReducer,
        messagesReducer
    }
})