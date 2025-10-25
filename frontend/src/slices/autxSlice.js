import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  username: null,
  token: null,
  timeZona: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      const { username, token } = action.payload
      state.token = token
      state.username = username
    },
    setTimeZona: (state, action) => {
      const  timeZona = action.payload
      state.timeZona = timeZona
    },
    clearUser: (state) => {
      state.token = null
      state.username = null
      state.timeZona = null
    },
  },
})

export const { setUsersData, clearUser, setTimeZona } = authSlice.actions
export default authSlice.reducer
export const selectUserTimeZona = state => state.authReducer.timeZona
export const selectUsername = state => state.authReducer.username
export const selectToken = state => state.authReducer.token
