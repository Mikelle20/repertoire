"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
function FriendPlaylist(props) {
    var playlist = props.playlist, selectPlaylist = props.selectPlaylist;
    return (react_1["default"].createElement("div", { tabIndex: 0, onClick: function () { return selectPlaylist(playlist.playlistId); }, className: playlist.checked ? 'friendPlaylistClicked' : 'friendPlaylist' },
        react_1["default"].createElement("img", { alt: playlist.name, src: playlist.images.length !== 0 ? playlist.images[0].url : require('../../assets/defaults/defaultCover.png'), className: "searchImg" }),
        playlist.name));
}
exports["default"] = FriendPlaylist;
