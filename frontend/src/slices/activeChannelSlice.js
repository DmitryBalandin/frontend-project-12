import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id:'1',
    name:null,
}

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setIdActiveChannel: (state, { payload }) => {
      const { id, name } = payload
      state.id = id
      // state.name = name
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
export const {setIdActiveChannel, clearActiveChannel, updateNameActiveChannelName} = activeChannelSlice.actions
export const selectIdActiveChannel = state => state.activeChannelReducer.id
export const selectNameActiveChannel = state => state.activeChannelReducer.name

