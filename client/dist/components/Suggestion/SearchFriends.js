"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
function SearchFriends(props) {
    var friend = props.friend, handleClick = props.handleClick;
    return (react_1["default"].createElement("div", { tabIndex: 0, className: friend.checked ? 'clickedFriend' : 'friendContainer', onClick: function () { return handleClick(friend.user_id); } },
        react_1["default"].createElement("img", { alt: friend.display_name, src: friend.profile_image, className: "friendIcon" }),
        react_1["default"].createElement("div", { className: "friendName" }, friend.display_name.length >= 7 ? "".concat(friend.display_name.split(' ').slice(0, 3).join(' ')) : friend.display_name)));
}
exports["default"] = SearchFriends;
