import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import searchModalReducer from './features/searchModalSlice'
import friendsReducer from './features/friendsSlice'
import PlaylistModalReducer from './features/PlaylistModalSlice'
import playlistReducer from './features/playlistSlice'
import homeDataReducer from './features/homeDataSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchModal: searchModalReducer,
    friends: friendsReducer,
    playlistModal: PlaylistModalReducer,
    playlist: playlistReducer,
    homeData: homeDataReducer
  }
})

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
