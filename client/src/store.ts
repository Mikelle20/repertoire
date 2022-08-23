/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import searchModalReducer from './features/searchModalSlice';
import friendsReducer from './features/friendsSlice';
import PlaylistModalReducer from './features/PlaylistModalSlice';
import playlistReducer from './features/playlistSlice';
import errorReducer from './features/errorSlice';

export const store = configureStore({
  reducer: {
    searchModal: searchModalReducer,
    friends: friendsReducer,
    playlistModal: PlaylistModalReducer,
    playlist: playlistReducer,
    error: errorReducer,
  },
});

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
