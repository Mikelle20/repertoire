"use strict";
var _a;
exports.__esModule = true;
exports.closeModal = exports.openModal = exports.setPlaylistInfo = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    playlistInfo: {},
    isOpen: false
};
var PlaylistModalSlice = (0, toolkit_1.createSlice)({
    name: 'newPlaylist',
    initialState: initialState,
    reducers: {
        setPlaylistInfo: function (state, _a) {
            var payload = _a.payload;
            state.playlistInfo = payload;
        },
        openModal: function (state) {
            state.isOpen = true;
        },
        closeModal: function (state) {
            state.isOpen = false;
        }
    }
});
exports.setPlaylistInfo = (_a = PlaylistModalSlice.actions, _a.setPlaylistInfo), exports.openModal = _a.openModal, exports.closeModal = _a.closeModal;
exports["default"] = PlaylistModalSlice.reducer;
