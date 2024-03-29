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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var framer_motion_1 = require("framer-motion");
var react_router_dom_1 = require("react-router-dom");
function LoginForm() {
    var _this = this;
    var _a = react_1["default"].useState({
        email: '',
        password: '',
        rememberMe: false
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1["default"].useState(false), togglePassword = _b[0], setTogglePassword = _b[1];
    var _c = react_1["default"].useState({
        isError: false,
        errorText: 'Incorrect username or password.'
    }), error = _c[0], setError = _c[1];
    var queryParams = window.location.search || null;
    var handleChange = function (Event) {
        setFormData(function (prevState) {
            var _a;
            var _b = Event.target, value = _b.value, name = _b.name, type = _b.type, checked = _b.checked;
            return __assign(__assign({}, prevState), (_a = {}, _a[name] = type === 'checkbox' ? checked : value, _a));
        });
    };
    var handleSubmit = function (Event) { return __awaiter(_this, void 0, void 0, function () {
        var accessCode, url, res, accountConnected, url, res, success, scopes, authorizeEndpoint, authObject, authQueryString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Event.preventDefault();
                    if (!queryParams) return [3 /*break*/, 7];
                    accessCode = queryParams.match('=(.*)')[1];
                    url = '/authorize/login';
                    return [4 /*yield*/, axios_1["default"].post(url, __assign(__assign({}, formData), { accessCode: accessCode }), {
                            withCredentials: true
                        })];
                case 1: return [4 /*yield*/, (_a.sent()).data];
                case 2:
                    res = _a.sent();
                    if (!(res.success === true)) return [3 /*break*/, 5];
                    return [4 /*yield*/, axios_1["default"].post('/authorize/accountConnected', { email: formData.email }, { withCredentials: true })];
                case 3: return [4 /*yield*/, (_a.sent()).data];
                case 4:
                    accountConnected = _a.sent();
                    if (accountConnected.success) {
                        window.sessionStorage.setItem('accessToken', JSON.stringify(res.accessToken));
                        // navigate('/home')
                        window.location.href = '/home';
                    }
                    return [3 /*break*/, 6];
                case 5:
                    setError({ isError: true, errorText: 'Incorrect email or password.' });
                    _a.label = 6;
                case 6: return [3 /*break*/, 13];
                case 7:
                    url = '/authorize/login';
                    return [4 /*yield*/, axios_1["default"].post(url, __assign({}, formData), {
                            withCredentials: true
                        })];
                case 8: return [4 /*yield*/, (_a.sent()).data];
                case 9:
                    res = _a.sent();
                    if (!res.success) return [3 /*break*/, 12];
                    return [4 /*yield*/, axios_1["default"].post('/authorize/accountConnected', { check: true, email: formData.email }, { withCredentials: true })];
                case 10: return [4 /*yield*/, (_a.sent()).data];
                case 11:
                    success = (_a.sent()).success;
                    if (success) {
                        window.sessionStorage.setItem('accessToken', JSON.stringify(res.accessToken));
                        // navigate('/home')
                        window.location.href = '/home';
                    }
                    else {
                        scopes = 'user-top-read user-read-recently-played playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private';
                        authorizeEndpoint = 'https://accounts.spotify.com/authorize?';
                        authObject = {
                            response_type: 'code',
                            client_id: process.env.REACT_APP_CLIENT_ID,
                            scope: scopes,
                            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
                            show_dialog: 'true'
                        };
                        authQueryString = new URLSearchParams(authObject).toString();
                        console.log(authQueryString);
                        // window.location.href = authorizeEndpoint + authQueryString;
                    }
                    return [3 /*break*/, 13];
                case 12:
                    setError({ isError: true, errorText: 'Incorrect email or password.' });
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "authContainer " },
        react_1["default"].createElement("form", { className: "authForm", onSubmit: handleSubmit },
            react_1["default"].createElement("div", { className: "authHeader" },
                react_1["default"].createElement("img", { alt: "logo", className: "logoAuth", src: require('../../assets/logos/listening-music.png') }),
                "Repertoire"),
            react_1["default"].createElement("div", { className: "signUpContainer" }, "Sign In"),
            react_1["default"].createElement("div", { className: "inputContainer" },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { alt: "email icon", src: require('../../assets/icons/email.png'), className: "inputIcon" })),
                react_1["default"].createElement("input", { className: "authInput", name: "email", placeholder: "Email", value: formData.email, onChange: handleChange })),
            react_1["default"].createElement("div", { className: "inputContainer" },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { alt: "password", src: require('../../assets/icons/password.png'), className: "inputIcon" })),
                react_1["default"].createElement("input", { className: "authInput", name: "password", placeholder: "Password", type: togglePassword ? '' : 'password', value: formData.password, onChange: handleChange }),
                react_1["default"].createElement("span", { onClick: function () {
                        setTogglePassword(!togglePassword);
                    } },
                    react_1["default"].createElement("img", { alt: "lock_open", src: togglePassword ? require('../../assets/icons/lock_open.png') : require('../../assets/icons/lock_closed.png'), className: "inputIcon" }))),
            error.isError && react_1["default"].createElement("div", { className: "errorMessage" }, error.errorText),
            react_1["default"].createElement(framer_motion_1.motion.button, { className: "btn", whileTap: { scale: 0.9 } }, "Sign In"),
            react_1["default"].createElement("div", { className: "authFooter" },
                react_1["default"].createElement(react_router_dom_1.Link, { className: "authLink", to: "/reset" }, "Reset Password"),
                react_1["default"].createElement(react_router_dom_1.Link, { className: "authLink", to: "/register" }, "Register")))));
}
exports["default"] = LoginForm;
