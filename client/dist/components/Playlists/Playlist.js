"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var errorSlice_1 = require("../../features/errorSlice");
function Playlist(props) {
    var playlist = props.playlist, removePlaylist = props.removePlaylist;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var handleClick = function (Event) {
        Event.preventDefault();
        navigate("/playlist/".concat(playlist.id));
    };
    var handleDelete = function (id) {
        (0, axios_1["default"])({
            method: 'DELETE',
            url: '/playlist/deletePlaylist',
            headers: headers,
            data: {
                playlistId: playlist.id
            }
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
        removePlaylist(id);
    };
    return (react_1["default"].createElement(framer_motion_1.motion.div, { tabIndex: 0, title: playlist.title, whileHover: { scale: 1.1 }, className: "playlistCard" },
        react_1["default"].createElement("img", { alt: "", src: playlist.images.length !== 0 ? playlist.images[0].url : require('../../assets/defaults/defaultCover.png'), className: "cardImg" }),
        react_1["default"].createElement("div", { className: "cardTitle" },
            playlist.title.length >= 15 ? "".concat(playlist.title.split(' ').slice(0, 2).join(' '), "...") : playlist.title,
            react_1["default"].createElement("img", { alt: "", src: playlist.isPrivate ? require('../../assets/icons/lock.png') : require('../../assets/icons/public.png'), className: "cardPng" })),
        react_1["default"].createElement("div", { className: "cardButtonContainer" },
            react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, whileTap: { scale: 0.9 }, onClick: handleClick, className: "cardBtn" }, "View"),
            react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, whileTap: { scale: 0.9 }, onClick: function () { return handleDelete(playlist.id); }, className: "cardDeleteBtn" }, "Delete"))));
}
exports["default"] = Playlist;
