import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlists: [],
  playlist: {},
  playlistFriends: [],
  playlistSuggestions: [],
  error: {
    isError: false,
    error: 'Internal Server Error.'
  }
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
    },
    setError: (state, { payload }) => {
      state.error.isError = payload
    }
  }
})

export const { setSuggestions, setFriends, setError } = playlistSlice.actions

export default playlistSlice.reducer
