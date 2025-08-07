import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers:{
        addMessage: messagesAdapter.addOne,
        addMessages:messagesAdapter.addMany
    }
})

export default messagesSlice.reducer;
export const { addMessage, addMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors(state =>state.messagesReducer)