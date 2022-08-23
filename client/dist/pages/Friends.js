"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var FriendSearchBar_1 = __importDefault(require("../components/Friend/FriendSearchBar"));
function Friends() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || '{}';
    var accessToken = JSON.parse(stringifiedToken);
    if (!accessToken)
        window.location.href = '/login';
    return (react_1["default"].createElement("div", { className: "landingContainer" },
        react_1["default"].createElement("div", { className: "pageContainer" }, accessToken && react_1["default"].createElement(FriendSearchBar_1["default"], null))));
}
exports["default"] = Friends;
