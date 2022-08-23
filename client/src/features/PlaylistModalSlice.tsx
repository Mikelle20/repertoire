import { createSlice } from '@reduxjs/toolkit';

const initialState: {playlistInfo: object, isOpen: boolean} = {
  playlistInfo: {},
  isOpen: false,
};

const PlaylistModalSlice = createSlice({
  name: 'newPlaylist',
  initialState,
  reducers: {
    setPlaylistInfo: (state, { payload }): void => {
      state.playlistInfo = payload;
    },
    openModal: (state): void => {
      state.isOpen = true;
    },
    closeModal: (state): void => {
      state.isOpen = false;
    },
  },
});

export const { setPlaylistInfo, openModal, closeModal } = PlaylistModalSlice.actions;
export default PlaylistModalSlice.reducer;
