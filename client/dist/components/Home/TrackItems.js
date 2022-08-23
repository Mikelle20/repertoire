"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
function TrackItems(props) {
    var track = props.track;
    return (react_1["default"].createElement(material_1.Tooltip, { title: track.name },
        react_1["default"].createElement(framer_motion_1.motion.div, { tabIndex: 0, whileHover: { scale: 1.2 }, className: "sideItem" },
            react_1["default"].createElement("img", { className: "topArtist", src: track.album.images[0].url, alt: track.name }))));
}
exports["default"] = TrackItems;
