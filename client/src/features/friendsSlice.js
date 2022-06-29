import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  friends: {

  }
}

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, { payload }) => {
      state.friends = payload
    }
  }
})

export const { setFriends } = friendSlice.actions
export default friendSlice.reducer
