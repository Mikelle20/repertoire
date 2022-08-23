"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable no-unused-vars */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var axios_1 = __importDefault(require("axios"));
// import { setError } from '../../features/errorSlice';
function ResetForm() {
    var queryParams = window.location.search || null;
    if (queryParams === null)
        window.location.href = '/login';
    var _a = react_1["default"].useState({
        password: '',
        confirmPassword: '',
        match: false
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1["default"].useState(false), toggle = _b[0], setToggle = _b[1];
    var _c = react_1["default"].useState({
        isError: false,
        msg: ''
    }), error = _c[0], setError = _c[1];
    var token = queryParams.match('=(.*)')[1];
    react_1["default"].useEffect(function () {
        if (formData.password === formData.confirmPassword) {
            setFormData(function (prevState) { return (__assign(__assign({}, prevState), { match: true })); });
        }
        else {
            setFormData(function (prevState) { return (__assign(__assign({}, prevState), { match: false })); });
        }
    }, [formData.confirmPassword]);
    var handleChange = function (Event) {
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[Event.target.name] = Event.target.value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        axios_1["default"].post('/authorize/resetPassword', { password: formData.password, token: token }).then(function (res) {
            if (!res.data.success) {
                var errorMsg = res.data.error;
                setError({ isError: true, msg: errorMsg });
            }
            setToggle(true);
            setFormData(function (prev) { return (__assign(__assign({}, prev), { match: false })); });
        })["catch"](function () { return setError(function (prev) { return (__assign(__assign({}, prev), { isError: true })); }); });
    };
    return (react_1["default"].createElement(framer_motion_1.motion.div, { drag: true, dragSnapToOrigin: true, className: "authContainer" },
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "authForm" },
            react_1["default"].createElement("div", { className: "authHeader" },
                react_1["default"].createElement("img", { alt: "logo", className: "logoAuth", src: require('../../assets/logos/listening-music.png') }),
                "Repertoire"),
            react_1["default"].createElement("div", { className: "error" }, "Enter Your Email To Receive A Reset Link"),
            react_1["default"].createElement("div", { className: "inputContainer" },
                react_1["default"].createElement("input", { className: "authInput", name: "password", placeholder: "Password", value: formData.password, onChange: handleChange })),
            react_1["default"].createElement("div", { className: "inputContainer" },
                react_1["default"].createElement("input", { className: "authInput", name: "confirmPassword", placeholder: "Confirm Password", value: formData.confirmPassword, onChange: handleChange })),
            toggle && react_1["default"].createElement("div", { style: { marginTop: '10px' }, className: "error" }, error.isError ? error.msg : 'Your password has been changed. Please login.'),
            (formData.match && formData.confirmPassword.length !== 0) && react_1["default"].createElement(framer_motion_1.motion.button, { className: "btn", whileTap: { scale: 0.9 } }, "Submit"))));
}
exports["default"] = ResetForm;
