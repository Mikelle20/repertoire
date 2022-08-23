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
/* eslint-disable no-unused-vars */
var axios_1 = __importDefault(require("axios"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var framer_motion_1 = require("framer-motion");
var searchModalSlice_1 = require("../../features/searchModalSlice");
var SearchFriends_1 = __importDefault(require("./SearchFriends"));
var FriendPlaylist_1 = __importDefault(require("./FriendPlaylist"));
var errorSlice_1 = require("../../features/errorSlice");
function SearchModal() {
    var search = (0, react_redux_1.useSelector)(function (store) { return store.searchModal; }).search;
    var friends = (0, react_redux_1.useSelector)(function (store) { return store.friends; }).friends;
    var dispatch = (0, react_redux_1.useDispatch)();
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var _a = react_1["default"].useState({
        song_id: search.songId,
        friend_id: '',
        playlist_id: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1["default"].useState([]), friendPlaylists = _b[0], setFriendPlaylists = _b[1];
    var _c = react_1["default"].useState(friends), modalFriends = _c[0], setModalFriends = _c[1];
    react_1["default"].useEffect(function () {
        if (formData.friend_id) {
            (0, axios_1["default"])({
                method: 'POST',
                url: '/suggestion/accessedPlaylists',
                withCredentials: true,
                headers: headers,
                data: { friend: formData.friend_id }
            }).then(function (res) {
                setFriendPlaylists(res.data);
            })["catch"](function () {
                dispatch((0, errorSlice_1.setError)(true));
            });
        }
    }, [formData.friend_id]);
    var handleClick = function (id) {
        setFormData(function (prevState) { return (__assign(__assign({}, prevState), { friend_id: prevState.friend_id === id ? '' : id })); });
        setModalFriends(function (prevState) { return prevState.map(function (friend) { return (friend.user_id === id ? __assign(__assign({}, friend), { checked: !friend.checked }) : __assign(__assign({}, friend), { checked: false })); }); });
    };
    var selectPlaylist = function (id) {
        setFormData(function (prevState) { return (__assign(__assign({}, prevState), { playlist_id: prevState.playlist_id === id ? '' : id })); });
        setFriendPlaylists(function (prevState) { return prevState.map(function (playlist) { return (playlist.playlistId === id ? __assign(__assign({}, playlist), { checked: !playlist.checked }) : __assign(__assign({}, playlist), { checked: false })); }); });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        (0, axios_1["default"])({
            method: 'POST',
            url: '/suggestion/suggest',
            withCredentials: true,
            headers: headers,
            data: __assign({}, formData)
        }).then(function () {
            dispatch((0, searchModalSlice_1.closeModal)());
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    };
    var friendIcons = modalFriends.map(function (friend) { return (react_1["default"].createElement(SearchFriends_1["default"], { key: friend.user_id, friend: friend, handleClick: handleClick })); });
    var friendPlaylistIcons = friendPlaylists.map(function (element) { return (react_1["default"].createElement(FriendPlaylist_1["default"], { key: element.playlistId, playlist: element, selectPlaylist: selectPlaylist })); });
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "searchModal" },
        react_1["default"].createElement("div", { className: "searchModalTop" },
            react_1["default"].createElement("img", { alt: search.title, src: search.cover, className: "searchModalImg" }),
            react_1["default"].createElement("div", { className: "searchModalText" },
                search.title.length >= 15 ? "".concat(search.title.split(' ').slice(0, 3).join(' '), "...") : search.title,
                ' ',
                search.explicit && react_1["default"].createElement("img", { alt: "explicit", src: require('../../assets/icons/explicit.png'), className: "modalPng" })),
            react_1["default"].createElement("div", { className: "searchModalText" }, search.artist)),
        react_1["default"].createElement("div", { className: "searchModalBottom" },
            react_1["default"].createElement("div", { className: "modalFriends" }, friendIcons.length === 0 ? react_1["default"].createElement("span", { className: "empty" }, "No Friends Yet") : friendIcons)),
        formData.friend_id
            && (react_1["default"].createElement("div", { className: "modalFriendsPlaylists" }, friendPlaylistIcons.length === 0 ? react_1["default"].createElement("span", { className: "empty" }, "No Playlists Yet") : friendPlaylistIcons)),
        react_1["default"].createElement("div", { className: "buttonModalContainer" },
            react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, style: { marginRight: '20%' }, whileTap: { scale: 0.9 }, onClick: function () { return dispatch((0, searchModalSlice_1.closeModal)()); }, className: "modalBtn" }, "Close"),
            formData.playlist_id && (react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, whileTap: { scale: 0.9 }, onClick: handleSubmit, className: "modalBtn" }, "Add")))));
}
exports["default"] = SearchModal;
