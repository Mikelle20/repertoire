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
var axios_1 = __importDefault(require("axios"));
var framer_motion_1 = require("framer-motion");
var react_1 = __importDefault(require("react"));
var errorSlice_1 = require("../../features/errorSlice");
function ResetEmailForm() {
    var _a = react_1["default"].useState({
        email: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1["default"].useState(false), toggle = _b[0], setToggle = _b[1];
    var handleChange = function (Event) {
        var target = Event.target;
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[target.name] = target.value, _a)));
        });
    };
    var handleSubmit = function (Event) {
        Event.preventDefault();
        axios_1["default"].post('/authorize/resetLink', { email: formData.email }).then(function () {
            setToggle(true);
        })["catch"](function () { return (0, errorSlice_1.setError)(true); });
    };
    return (react_1["default"].createElement(framer_motion_1.motion.div, { drag: true, dragSnapToOrigin: true, className: "authContainer" },
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "authForm" },
            react_1["default"].createElement("div", { className: "authHeader" },
                react_1["default"].createElement("img", { alt: "logo", className: "logoAuth", src: require('../../assets/logos/listening-music.png') }),
                "Repertoire"),
            react_1["default"].createElement("div", { className: "error" }, "Enter Your Email To Receive A Reset Link"),
            react_1["default"].createElement("div", { className: "inputContainer" },
                react_1["default"].createElement("input", { className: "authInput", name: "email", placeholder: "Email", value: formData.email, onChange: handleChange })),
            toggle && react_1["default"].createElement("div", { style: { marginTop: '10px' }, className: "error" }, "An email was sent to the entered account."),
            (toggle === false && formData.email.length !== 0) && react_1["default"].createElement(framer_motion_1.motion.button, { className: "btn", whileTap: { scale: 0.9 } }, "Send Email"))));
}
exports["default"] = ResetEmailForm;
