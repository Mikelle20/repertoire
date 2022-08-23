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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var framer_motion_1 = require("framer-motion");
var PlaylistModalSlice_1 = require("../../features/PlaylistModalSlice");
var SearchFriends_1 = __importDefault(require("../Suggestion/SearchFriends"));
var errorSlice_1 = require("../../features/errorSlice");
function PlaylistModal(props) {
    var _this = this;
    var friends = props.friends, renderPlaylists = props.renderPlaylists;
    var dispatch = (0, react_redux_1.useDispatch)();
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var _a = react_1["default"].useState({
        title: '',
        description: '',
        isPrivate: false,
        accessList: []
    }), formData = _a[0], setFormData = _a[1];
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var _b = react_1["default"].useState(friends), searchFriends = _b[0], setSearchFriends = _b[1];
    react_1["default"].useEffect(function () {
        if (!formData.isPrivate) {
            setFormData(function (prevState) { return (__assign(__assign({}, prevState), { accessList: [] })); });
        }
    }, [formData.isPrivate]);
    var handleChange = function (Event) {
        setFormData(function (prevState) {
            var _a;
            var _b = Event.target, value = _b.value, name = _b.name, type = _b.type, checked = _b.checked;
            return __assign(__assign({}, prevState), (_a = {}, _a[name] = type === 'checkbox' ? checked : value, _a));
        });
    };
    var handleSubmit = function (Event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Event.preventDefault();
                    dispatch((0, PlaylistModalSlice_1.closeModal)());
                    return [4 /*yield*/, (0, axios_1["default"])({
                            method: 'POST',
                            url: '/playlist/createPlaylist',
                            withCredentials: true,
                            headers: headers,
                            data: { formData: formData }
                        }).then(function () {
                            renderPlaylists();
                        })["catch"](function () {
                            dispatch((0, errorSlice_1.setError)(true));
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClick = function (id) {
        var idExists = formData.accessList.includes(id);
        if (idExists) {
            setFormData(function (prevState) {
                var newList = prevState.accessList.filter(function (element) { return element !== id; });
                return __assign(__assign({}, prevState), { accessList: newList });
            });
        }
        else {
            setFormData(function (prevState) { return (__assign(__assign({}, prevState), { accessList: __spreadArray(__spreadArray([], formData.accessList, true), [id], false) })); });
        }
        setSearchFriends(function (prevState) { return prevState.map(function (friend) { return (friend.user_id === id ? __assign(__assign({}, friend), { checked: !friend.checked }) : friend); }); });
    };
    var friendIcons = searchFriends.map(function (friend) { return (react_1["default"].createElement(SearchFriends_1["default"], { key: friend.user_id, friend: friend, handleClick: handleClick })); });
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "playlistModal" },
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "playlistModalForm" },
            react_1["default"].createElement("div", { className: "inputModalContainer" },
                react_1["default"].createElement("input", { name: "title", placeholder: "Title", value: formData.title, onChange: handleChange, className: "authInput" })),
            react_1["default"].createElement("div", { className: "inputModalContainer" },
                react_1["default"].createElement("input", { name: "description", placeholder: "Description", value: formData.description, onChange: handleChange, className: "authInput" })),
            react_1["default"].createElement("div", { className: "isPrivateContainer" },
                react_1["default"].createElement("input", { type: "checkbox", id: "isPrivate", name: "isPrivate", checked: formData.isPrivate, onChange: handleChange }),
                react_1["default"].createElement("label", { htmlFor: "isPrivate" }, "Private?")),
            formData.isPrivate
                && (react_1["default"].createElement("div", { className: "modalFriends" }, friendIcons)),
            react_1["default"].createElement("div", { className: "modalButtonContainer" },
                react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, whileTap: { scale: 0.9 }, className: "modalBtn", onClick: function () { return dispatch((0, PlaylistModalSlice_1.closeModal)()); } }, "Close"),
                formData.title && (react_1["default"].createElement(framer_motion_1.motion.button, { whileTap: { scale: 0.9 }, tabIndex: 0, onSubmit: handleSubmit, id: "modalClose", className: "modalBtn" }, "Create"))))));
}
exports["default"] = PlaylistModal;
