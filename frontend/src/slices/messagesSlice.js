import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice";


const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers:{
        addMessage: messagesAdapter.addOne,
        addMessages:messagesAdapter.addMany,
    },
    extraReducers:(builder) =>{
        builder.addCase(removeChannel,(state,{payload})=>{
            const messages = Object.values(state.entities);
            messages.forEach(({channelId, username, id}) => console.log(channelId,username,id))
            console.log('extraReducer', payload)
        })
    }
})

export default messagesSlice.reducer;
export const { addMessage, addMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors(state =>state.messagesReducer)