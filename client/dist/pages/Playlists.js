"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable max-len */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
var react_redux_1 = require("react-redux");
var axios_1 = __importDefault(require("axios"));
var Playlist_1 = __importDefault(require("../components/Playlists/Playlist"));
var PlaylistModal_1 = __importDefault(require("../components/Playlists/PlaylistModal"));
var PlaylistModalSlice_1 = require("../features/PlaylistModalSlice");
function Playlists() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || '{}';
    var accessToken = JSON.parse(stringifiedToken);
    if (!accessToken)
        window.location.href = '/login';
    var isOpen = (0, react_redux_1.useSelector)(function (store) { return store.playlistModal; }).isOpen;
    var headers = {
        Authorization: "Bearer ".concat(accessToken.token)
    };
    var error = (0, react_redux_1.useSelector)(function (store) { return store.error; }).error;
    var _a = react_1["default"].useState([]), playlists = _a[0], setPlaylists = _a[1];
    var _b = react_1["default"].useState([]), friends = _b[0], setFriends = _b[1];
    var _c = react_1["default"].useState(false), newPlaylist = _c[0], setNewPlaylist = _c[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    react_1["default"].useEffect(function () {
        axios_1["default"].get('/friends/getFriends', { withCredentials: true, headers: headers }).then(function (res) {
            setFriends(res.data);
        });
        axios_1["default"].get('/playlist/getPlaylists', { withCredentials: true, headers: headers }).then(function (res) {
            setPlaylists(res.data.reverse());
        });
    }, [newPlaylist]);
    var removePlaylist = function (id) {
        setPlaylists(function (prev) { return prev.filter(function (playlist) { return playlist.id !== id; }); });
    };
    var renderPlaylists = function () {
        setNewPlaylist(function (prev) { return !prev; });
    };
    var playlistCards = playlists.map(function (playlist) { return react_1["default"].createElement(Playlist_1["default"], { key: playlist.id, removePlaylist: removePlaylist, playlist: playlist }); });
    return (react_1["default"].createElement("div", { className: "landingContainer" }, error.isError
        ? react_1["default"].createElement("div", { className: "loadingScreen" }, error.error)
        : (react_1["default"].createElement("div", { className: "pageContainer" },
            isOpen && react_1["default"].createElement(PlaylistModal_1["default"], { renderPlaylists: renderPlaylists, friends: friends }),
            react_1["default"].createElement("div", { className: "playlistContainer" },
                playlists && playlistCards,
                accessToken && (react_1["default"].createElement(framer_motion_1.motion.button, { tabIndex: 0, className: "newPlaylistBtn", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: function () { return dispatch((0, PlaylistModalSlice_1.openModal)()); } },
                    react_1["default"].createElement("img", { alt: "", src: require('../assets/icons/newPlaylist.png') }))))))));
}
exports["default"] = Playlists;
