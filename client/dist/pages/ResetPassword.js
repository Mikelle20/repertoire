"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var ResetForm_1 = __importDefault(require("../components/Reset/ResetForm"));
function ResetPassword() {
    var error = (0, react_redux_1.useSelector)(function (store) { return store.error; }).error;
    return (react_1["default"].createElement("div", { className: "landingContainer" },
        react_1["default"].createElement("div", { className: "pageContainer" }, error.isError ? react_1["default"].createElement("div", { className: "loadingScreen" }, error.error) : react_1["default"].createElement(ResetForm_1["default"], null))));
}
exports["default"] = ResetPassword;
