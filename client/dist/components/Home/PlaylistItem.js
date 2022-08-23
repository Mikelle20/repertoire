"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var react_router_1 = require("react-router");
var material_1 = require("@mui/material");
function PlaylistItem(props) {
    var playlist = props.playlist;
    var navigate = (0, react_router_1.useNavigate)();
    var handleClick = function () {
        navigate("/playlist/".concat(playlist.playlistId));
    };
    return (react_1["default"].createElement(material_1.Tooltip, { title: playlist.playlistName },
        react_1["default"].createElement(framer_motion_1.motion.div, { onClick: handleClick, tabIndex: 0, whileHover: { scale: 1.2 }, className: "sideItem" },
            react_1["default"].createElement("img", { className: "topArtist", src: playlist.playlistImage.length === 0 ? require('../../assets/defaults/defaultCover.png') : playlist.playlistImage[0].url, alt: playlist.playlistName }),
            react_1["default"].createElement("img", { alt: playlist.playlistName, className: "homeSuggestionImage", src: playlist.isPrivate ? require('../../assets/icons/lock.png') : require('../../assets/icons/public.png') }))));
}
exports["default"] = PlaylistItem;
