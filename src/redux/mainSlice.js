import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    profile: {},
  },
  reducers: {
    profile: (state, action)  => {
      return {...action.payload}
    },
  },
})

export const { profile } = mainSlice.actions

export default mainSlice.reducer