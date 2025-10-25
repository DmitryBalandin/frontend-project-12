import { configureStore } from '@reduxjs/toolkit'
import authReducer from './autxSlice'
import channelsReducer from './channelsSlice'
import messagesReducer from './messagesSlice'
import errorNetworkReducer from './errorsNetworkSlice'
import activeChannelReducer from './activeChannelSlice'

export default configureStore({
  reducer: {
    authReducer,
    channelsReducer,
    messagesReducer,
    errorNetworkReducer,
    activeChannelReducer,
  },
})
