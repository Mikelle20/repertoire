"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var framer_motion_1 = require("framer-motion");
var searchModalSlice_1 = require("../../features/searchModalSlice");
function SearchResult(props) {
    var track = props.track;
    var dispatch = (0, react_redux_1.useDispatch)();
    return (react_1["default"].createElement("div", { tabIndex: 0, className: "searchResult" },
        react_1["default"].createElement("img", { alt: track.title, src: track.cover, className: "searchImg" }),
        react_1["default"].createElement("span", { className: "searchTitle" }, track.title.length >= 15 ? "".concat(track.title.split(' ').slice(0, 3).join(' '), "...  - ").concat(track.artist) : "".concat(track.title, " - ").concat(track.artist)),
        track.explicit && react_1["default"].createElement("img", { alt: "explicit", src: require('../../assets/icons/explicit.png'), className: "explicitIcon" }),
        react_1["default"].createElement(framer_motion_1.motion.img, { tabIndex: 0, whileTap: { scale: 0.8 }, src: require('../../assets/icons/add.png'), onClick: function () { return dispatch((0, searchModalSlice_1.openModal)(track)); }, className: "searchAdd" })));
}
exports["default"] = SearchResult;
