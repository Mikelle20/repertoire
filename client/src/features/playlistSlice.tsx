import { createSlice } from '@reduxjs/toolkit';

interface InitialInterface {
  playlists: []
  playlist: object
  playlistFriends: []
  playlistSuggestions: []
}

const initialState: InitialInterface = {
  playlists: [],
  playlist: {},
  playlistFriends: [],
  playlistSuggestions: [],
};

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setSuggestions: (state, { payload }): void => {
      state.playlistSuggestions = payload;
    },
    setFriends: (state, { payload }): void => {
      state.playlistFriends = payload;
    },
  },
});

export const { setSuggestions, setFriends } = playlistSlice.actions;

export default playlistSlice.reducer;
