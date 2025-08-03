import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    token: null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUsersData:(state, action) =>{
            const {username, token} = action.payload
            state.token = token
            state.username = username 
        },
        clearUser:(state) =>{
            state.token = null;
            state.username = null;
        }
    }
})

export const {setUsersData, clearUser} = authSlice.actions;
export default authSlice.reducer;