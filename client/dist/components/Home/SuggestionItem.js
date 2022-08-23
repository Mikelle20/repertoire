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
function SuggestionItem(props) {
    var suggestion = props.suggestion;
    var navigate = (0, react_router_1.useNavigate)();
    var handleClick = function () {
        navigate("/playlist/".concat(suggestion.playlistId));
    };
    return (react_1["default"].createElement(material_1.Tooltip, { title: "".concat(suggestion.songName, " from ").concat(suggestion.senderName) },
        react_1["default"].createElement(framer_motion_1.motion.div, { onClick: handleClick, tabIndex: 0, whileHover: { scale: 1.2 }, className: "sideItem" },
            react_1["default"].createElement("img", { className: "topArtist", src: suggestion.songImage[0].url, alt: suggestion.songName }),
            react_1["default"].createElement("img", { alt: suggestion.senderName, className: "homeSuggestionImage", src: suggestion.senderImage }))));
}
exports["default"] = SuggestionItem;
