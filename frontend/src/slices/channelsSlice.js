import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannels: channelsAdapter.addMany,
        addChannel:channelsAdapter.addOne
    }
})

export default channelsSlice.reducer;
export const { addChannels, addChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors(state =>state.channelsReducer)