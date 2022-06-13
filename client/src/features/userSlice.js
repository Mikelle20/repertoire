/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {

  },
  isLoading: true
}

export const getUser = createAsyncThunk(
  async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:5000/authorize'
      }).data.user
      return res
    } catch (error) {}
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    }
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [getUser.rejected]: (state) => {
      state.loading = false
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
