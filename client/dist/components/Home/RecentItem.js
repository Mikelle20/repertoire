"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var material_1 = require("@mui/material");
function RecentItem(props) {
    var listen = props.listen;
    return (react_1["default"].createElement(material_1.Tooltip, { title: "".concat(listen.friendName, " was listening to ").concat(listen.songName) },
        react_1["default"].createElement(framer_motion_1.motion.div, { tabIndex: 0, whileHover: { scale: 1.2 }, className: "sideItem" },
            react_1["default"].createElement("img", { className: "topArtist", src: listen.songImage, alt: listen.songName }),
            react_1["default"].createElement("img", { alt: listen.friendName, className: "homeSuggestionImage", src: listen.friendImage }))));
}
exports["default"] = RecentItem;
