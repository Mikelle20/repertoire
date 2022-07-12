/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: {},
  rating: 0
}

export const getUser = createAsyncThunk('user/getUser',
  async (email) => {
    try {
      const res = await (await axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/getUser',
        withCredentials: true,
        data: { email }
      })).data
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
      state.rating = payload.rating
    },
    [getUser.rejected]: (state) => {
      state.loading = false
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
