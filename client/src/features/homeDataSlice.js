/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  homeData: {}
}

export const getHomeData = createAsyncThunk('homeData/getHomeData', async (user) => {
  try {
    const res = await (await axios({
      method: 'POST',
      url: 'http://localhost:5000/home/setHome',
      data: { user },
      withCredentials: true
    })).data
    return res
  } catch (error) {

  }
})

const homeDataSlice = createSlice({
  name: 'homeData',
  initialState,
  extraReducers: {
    [getHomeData.fulfilled]: (state, { payload }) => {
      state.homeData = payload
    }
  }
})

export default homeDataSlice.reducer
