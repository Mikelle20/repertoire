import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:5000/friends/getFriends'

const initialState = {
  friends: []
}

export const getFriends = createAsyncThunk('friends/getFriends', async (user) => {
  try {
    const res = await (await axios({
      method: 'POST',
      url,
      withCredentials: true,
      data: { user }
    })).data

    const arr = res.map(element => {
      return {
        ...element,
        checked: false
      }
    })
    console.log(arr)
    return arr
  } catch (error) {}
})

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, { payload }) => {
      state.friends = payload
    }
  },
  extraReducers: {
    [getFriends.fulfilled]: (state, { payload }) => {
      state.friends = payload
    }
  }
})

export const { setFriends } = friendSlice.actions
export default friendSlice.reducer
