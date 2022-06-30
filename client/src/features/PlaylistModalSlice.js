import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlistInfo: {

  },
  isOpen: false
}

const PlaylistModalSlice = createSlice({
  name: 'newPlaylist',
  initialState,
  reducers: {
    setPlaylistInfo: (state, { payload }) => {
      state.playlistInfo = payload
    },
    openModal: (state, { payload }) => {
      state.isOpen = true
    },
    closeModal: (state, { payload }) => {
      state.isOpen = false
    }
  }
})

export const { setPlaylistInfo, openModal, closeModal } = PlaylistModalSlice.actions
export default PlaylistModalSlice.reducer
