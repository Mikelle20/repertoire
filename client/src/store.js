import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import searchModalReducer from './features/searchModalSlice'
import friendsReducer from './features/friendsSlice'
import PlaylistModalReducer from './features/PlaylistModalSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchModal: searchModalReducer,
    friends: friendsReducer,
    playlistModal: PlaylistModalReducer
  }
})
