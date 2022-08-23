"use strict";
/* eslint-disable react/prop-types */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var material_1 = require("@mui/material");
function SideItem(props) {
    var artist = props.artist;
    return (react_1["default"].createElement(material_1.Tooltip, { title: artist.name },
        react_1["default"].createElement(framer_motion_1.motion.div, { tabIndex: 0, whileHover: { scale: 1.2 }, className: "sideItem" },
            react_1["default"].createElement("img", { className: "topArtist", src: artist.images[0].url, alt: artist.name }))));
}
exports["default"] = SideItem;
