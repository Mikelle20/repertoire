import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlists: [],
  playlist: {},
  playlistFriends: [],
  playlistSuggestions: []
}

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setSuggestions: (state, { payload }) => {
      state.playlistSuggestions = payload
    },
    setFriends: (state, { payload }) => {
      state.playlistFriends = payload
    }
  }
})

export const { setSuggestions, setFriends } = playlistSlice.actions

export default playlistSlice.reducer
