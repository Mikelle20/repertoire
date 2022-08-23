"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.store = void 0;
/* eslint-disable import/prefer-default-export */
var toolkit_1 = require("@reduxjs/toolkit");
var searchModalSlice_1 = __importDefault(require("./features/searchModalSlice"));
var friendsSlice_1 = __importDefault(require("./features/friendsSlice"));
var PlaylistModalSlice_1 = __importDefault(require("./features/PlaylistModalSlice"));
var playlistSlice_1 = __importDefault(require("./features/playlistSlice"));
var errorSlice_1 = __importDefault(require("./features/errorSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        searchModal: searchModalSlice_1["default"],
        friends: friendsSlice_1["default"],
        playlistModal: PlaylistModalSlice_1["default"],
        playlist: playlistSlice_1["default"],
        error: errorSlice_1["default"]
    }
});
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
