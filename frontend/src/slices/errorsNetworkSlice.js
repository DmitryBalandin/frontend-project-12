import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isError: false,
    error: null,
}

const errorNetworkSlice = createSlice({
    name: 'errorNetwork',
    initialState,
    reducers: {
        setErrorNetwork: (state, action) => {
            const { error } = action.payload
            state.isError = true
            state.error = error
            console.log(error)
        },
        clearErrorNetwork: (state) => {
            state.isError = false;
            state.error = null;
        }
    }
})

export default errorNetworkSlice.reducer
export const {setErrorNetwork, clearErrorNetwork } = errorNetworkSlice.actions
export const selectErrorNetworks = (state) => state.errorNetworkReducer