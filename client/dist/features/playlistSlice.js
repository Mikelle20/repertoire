"use strict";
var _a;
exports.__esModule = true;
exports.setFriends = exports.setSuggestions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    playlists: [],
    playlist: {},
    playlistFriends: [],
    playlistSuggestions: []
};
var playlistSlice = (0, toolkit_1.createSlice)({
    name: 'playlists',
    initialState: initialState,
    reducers: {
        setSuggestions: function (state, _a) {
            var payload = _a.payload;
            state.playlistSuggestions = payload;
        },
        setFriends: function (state, _a) {
            var payload = _a.payload;
            state.playlistFriends = payload;
        }
    }
});
exports.setSuggestions = (_a = playlistSlice.actions, _a.setSuggestions), exports.setFriends = _a.setFriends;
exports["default"] = playlistSlice.reducer;
