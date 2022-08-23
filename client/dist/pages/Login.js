"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var LoginForm_1 = __importDefault(require("../components/LoginRegister/LoginForm"));
function Login() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || null;
    var accessToken = JSON.parse(stringifiedToken);
    if (accessToken)
        window.location.href = '/home';
    return (react_1["default"].createElement("div", { className: "landingContainer" },
        react_1["default"].createElement("div", { className: "pageContainer" },
            react_1["default"].createElement(LoginForm_1["default"], null))));
}
exports["default"] = Login;
