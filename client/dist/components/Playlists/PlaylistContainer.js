"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var react_redux_1 = require("react-redux");
var PlaylistFriend_1 = __importDefault(require("./PlaylistFriend"));
var Suggestion_1 = __importDefault(require("./Suggestion"));
function PlaylistContainer(props) {
    var playlist = props.playlist, playlistId = props.playlistId;
    var _a = (0, react_redux_1.useSelector)(function (store) { return store.playlist; }), playlistFriends = _a.playlistFriends, playlistSuggestions = _a.playlistSuggestions;
    var suggestions = playlistSuggestions.map(function (suggestion) { return react_1["default"].createElement(Suggestion_1["default"], { key: suggestion.songId, suggestion: suggestion, playlistId: playlistId }); });
    var friendIcons = playlistFriends.map(function (friend) { return react_1["default"].createElement(PlaylistFriend_1["default"], { key: friend.user_id, friend: friend }); });
    return (react_1["default"].createElement(framer_motion_1.motion.div, { drag: true, dragSnapToOrigin: true, className: "playContainer" },
        react_1["default"].createElement("div", { className: "leftPlayContainer" },
            react_1["default"].createElement(framer_motion_1.motion.img, { whileHover: { scale: 1.1 }, src: playlist.images.length === 0 ? require('../../assets/defaults/defaultCover.png') : playlist.images[0].url, className: "playlistPageCover" }),
            react_1["default"].createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.1 }, className: "playlistTitle" }, playlist.name),
            react_1["default"].createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.1 }, className: "playlistDescription" }, playlist.description),
            react_1["default"].createElement("div", { className: "playlistFriendsContainer" }, friendIcons.length !== 0
                ? friendIcons
                : react_1["default"].createElement("div", { className: "emptyMessage" }, "No Friends"))),
        react_1["default"].createElement("div", { className: "rightPlayContainer" },
            react_1["default"].createElement("div", { className: "suggestContainer" }, suggestions.length !== 0
                ? suggestions
                : react_1["default"].createElement("div", { className: "emptyMessage" }, "No Suggestions")))));
}
exports["default"] = PlaylistContainer;
