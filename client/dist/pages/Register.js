"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable no-unused-vars */
var react_1 = __importDefault(require("react"));
var react_router_1 = require("react-router");
var RegisterForm_1 = __importDefault(require("../components/LoginRegister/RegisterForm"));
function Register() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || null;
    var accessToken = JSON.parse(stringifiedToken);
    var navigate = (0, react_router_1.useNavigate)();
    if (accessToken)
        navigate('/home');
    return (react_1["default"].createElement("div", { className: "landingContainer" },
        react_1["default"].createElement("div", { className: "pageContainer" },
            react_1["default"].createElement(RegisterForm_1["default"], null))));
}
exports["default"] = Register;
