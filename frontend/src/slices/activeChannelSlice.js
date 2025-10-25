import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id:null,
    name:null,
}

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      const { id, name } = payload
      state.id = id
      state.name = name
    },
    clearActiveChannel: (state) => {
      state.id = null
      state.name = ''
    },
    updateNameActiveChannelName: (state, { payload }) => {
      state.name = payload
    },
  }
})

export default activeChannelSlice.reducer
export const {setActiveChannel, clearActiveChannel, updateNameActiveChannelName} = activeChannelSlice.actions
export const selectIdActiveChannel = state => state.activeChannelReducer.id
export const selectNameActiveChannel = state => state.activeChannelReducer.name

