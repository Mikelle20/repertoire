"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
function SocialItem(props) {
    var social = props.social;
    return (react_1["default"].createElement("div", null, social.type
        ? (react_1["default"].createElement("div", { tabIndex: 0, className: "socialItem" },
            react_1["default"].createElement("img", { alt: social.senderName, className: "socialUserImg", src: social.senderImage }),
            react_1["default"].createElement("span", { className: "socialSong" }, "".concat(social.senderName, " gave ").concat(social.songName.length >= 1500 ? " ".concat(social.songName.split(' ').slice(0, 3).join(' '), "... ") : social.songName, " a ").concat((social.rating * 5).toFixed(0)))))
        : (react_1["default"].createElement("div", { tabIndex: 0, className: "socialItem" },
            react_1["default"].createElement("img", { alt: social.ownerName, className: "socialUserImg", src: social.ownerImage }),
            react_1["default"].createElement("span", { className: "socialSong" }, "".concat(social.ownerName, " added you to ").concat(social.playlistName.length >= 15 ? " ".concat(social.playlistName.split(' ').slice(0, 3).join(' '), "... ") : social.playlistName))))));
}
exports["default"] = SocialItem;
