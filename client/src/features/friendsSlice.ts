import { createSlice } from '@reduxjs/toolkit';

const initialState: {friends: []} = {
  friends: [],
};
const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, { payload }): void => {
      state.friends = payload;
    },
  },
});

export const { setFriends } = friendSlice.actions;
export default friendSlice.reducer;
