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
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var material_1 = require("@mui/material");
var initStates_1 = require("../../ratingStates/initStates");
var errorSlice_1 = require("../../features/errorSlice");
function Suggestion(props) {
    var suggestion = props.suggestion, playlistId = props.playlistId;
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var rating = (suggestion.rating * 5).toFixed();
    var _a = react_1["default"].useState(initStates_1.initialState[rating]), fillHeart = _a[0], setFillHeart = _a[1];
    react_1["default"].useEffect(function () {
        setFillHeart(initStates_1.initialState[rating]);
    }, []);
    var handleClick = function (id) {
        setFillHeart(function (prevState) {
            var arr = [];
            if (prevState[id].filled)
                setFillHeart(initStates_1.initialState[0]);
            prevState.forEach(function (heart) {
                if (heart.id <= id) {
                    arr.push(__assign(__assign({}, heart), { filled: true }));
                }
                else {
                    arr.push(__assign({}, heart));
                }
            });
            if (prevState[id].filled === false) {
                (0, axios_1["default"])({
                    method: 'POST',
                    url: '/suggestion/rate',
                    withCredentials: true,
                    headers: headers,
                    data: {
                        receiverId: suggestion.senderId,
                        rating: (id / 5) + 0.20,
                        songId: suggestion.songId,
                        playlistId: playlistId
                    }
                })["catch"](function () {
                    dispatch((0, errorSlice_1.setError)(true));
                });
            }
            return arr;
        });
    };
    return (react_1["default"].createElement("div", { tabIndex: 0, className: "suggestion" },
        react_1["default"].createElement(material_1.Tooltip, { title: suggestion.senderName },
            react_1["default"].createElement("img", { alt: suggestion.senderName, src: suggestion.senderImage, className: "suggestionImage" })),
        react_1["default"].createElement(material_1.Tooltip, { title: (react_1["default"].createElement("img", { alt: suggestion.songName, className: "songImage", src: suggestion.songImage })) },
            react_1["default"].createElement("span", null, suggestion.songName.length >= 25 ? "".concat(suggestion.songName.split(' ').slice(0, 3).join(' '), "...") : suggestion.songName)),
        react_1["default"].createElement("span", { className: "rateContainer" },
            react_1["default"].createElement("img", { alt: "heart", src: fillHeart[0].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png'), className: "ratingHeart", onClick: function () { return handleClick(fillHeart[0].id); } }),
            react_1["default"].createElement("img", { alt: "heart", src: fillHeart[1].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png'), className: "ratingHeart", onClick: function () { return handleClick(fillHeart[1].id); } }),
            react_1["default"].createElement("img", { alt: "heart", src: fillHeart[2].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png'), className: "ratingHeart", onClick: function () { return handleClick(fillHeart[2].id); } }),
            react_1["default"].createElement("img", { alt: "heart", src: fillHeart[3].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png'), className: "ratingHeart", onClick: function () { return handleClick(fillHeart[3].id); } }),
            react_1["default"].createElement("img", { alt: "heart", src: fillHeart[4].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png'), className: "ratingHeart", onClick: function () { return handleClick(fillHeart[4].id); } }))));
}
exports["default"] = Suggestion;
