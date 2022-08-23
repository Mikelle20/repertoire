"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
function FriendResult(props) {
    var friend = props.friend, addFriend = props.addFriend, deleteFriend = props.deleteFriend;
    return (react_1["default"].createElement("div", { tabIndex: 0, className: "friendResult" },
        react_1["default"].createElement("img", { alt: friend.display_name, src: friend.profile_image, className: "searchImg" }),
        react_1["default"].createElement("span", { className: "searchTitle" }, friend.display_name.length >= 15 ? "".concat(friend.display_name.split(' ').slice(0, 2).join(' '), "...") : friend.display_name),
        friend.status <= 1
            ? friend.status === 0
                ? react_1["default"].createElement(framer_motion_1.motion.img, { tabIndex: 0, src: require('../../assets/icons/add.png'), className: "searchAdd", whileTap: { scale: 0.9 }, onClick: function () { return addFriend(friend.user_id); } })
                : (react_1["default"].createElement("span", { className: "pendingButton" },
                    "Pending",
                    ' ',
                    react_1["default"].createElement("img", { alt: "pending icon", src: require('../../assets/icons/time.png'), className: "pendingPng" })))
            : friend.status === 2
                ? (react_1["default"].createElement("div", { className: "acceptDeclineContainer" },
                    react_1["default"].createElement(framer_motion_1.motion.span, { tabIndex: 0, className: "acceptButton", whileTap: { scale: 0.9 }, onClick: function () { return addFriend(friend.user_id); } },
                        "Accept",
                        react_1["default"].createElement("img", { alt: "accept icon", src: require('../../assets/icons/check.png'), className: "acceptPng" })),
                    react_1["default"].createElement(framer_motion_1.motion.span, { tabIndex: 0, className: "declineButton", whileTap: { scale: 0.9 }, onClick: function () { return deleteFriend(friend.user_id); } },
                        "Decline",
                        react_1["default"].createElement("img", { alt: "decline icon", src: require('../../assets/icons/x.png'), className: "declinePng" }))))
                : (react_1["default"].createElement("div", { className: "acceptDeclineContainer" },
                    react_1["default"].createElement("span", { className: "friendButton" }, "Friend"),
                    react_1["default"].createElement(framer_motion_1.motion.span, { tabIndex: 0, className: "declineButton", whileTap: { scale: 0.9 }, onClick: function () { return deleteFriend(friend.user_id); } },
                        "Remove",
                        react_1["default"].createElement("img", { alt: "decline icon", src: require('../../assets/icons/x.png'), className: "declinePng" }))))));
}
exports["default"] = FriendResult;
