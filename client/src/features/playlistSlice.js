import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:5000/playlist/getPlaylists'

const initialState = {
  playlists: [],
  playlist: {}
}

export const getPlaylists = createAsyncThunk('playlist/getPlaylists', async (user) => {
  try {
    const res = await (await axios({
      method: 'POST',
      url,
      withCredentials: true,
      data: { user }
    })).data

    return res
  } catch (error) {}
})

export const getPlaylist = createAsyncThunk('playlist/getPlaylist', async (creds) => {
  try {
    const res = await (await axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/getPlaylist',
      withCredentials: true,
      data: { user: creds.user, playlistId: creds.playlistId }
    })).data

    return res
  } catch (error) {}
})

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  extraReducers: {
    [getPlaylists.fulfilled]: (state, { payload }) => {
      state.playlists = payload
    },
    [getPlaylist.fulfilled]: (state, { payload }) => {
      state.playlist = payload
    }
  }

})

export default playlistSlice.reducer

// axios({
//   method: 'POST',
//   url,
//   withCredentials: true,
//   data: { user }
// }).then(res => {
//   console.log(res.data)
//   setPlaylists([...res.data])
// })
