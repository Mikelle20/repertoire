"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable react/prop-types */
var framer_motion_1 = require("framer-motion");
var react_1 = __importDefault(require("react"));
function PlaylistFriend(props) {
    var friend = props.friend;
    return (react_1["default"].createElement(framer_motion_1.motion.div, { tabIndex: 0, whileHover: { scale: 1.1 }, className: "friendContainer" },
        react_1["default"].createElement("img", { alt: friend.display_name, src: friend.profile_image, className: "friendIcon" }),
        react_1["default"].createElement("div", { className: "playFriendName" }, friend.display_name.length >= 7 ? "".concat(friend.display_name.split(' ').slice(0, 3).join(' ')) : friend.display_name)));
}
exports["default"] = PlaylistFriend;
