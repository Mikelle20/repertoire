"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var playlistSlice_1 = require("../features/playlistSlice");
var PlaylistContainer_1 = __importDefault(require("../components/Playlists/PlaylistContainer"));
var errorSlice_1 = require("../features/errorSlice");
function Playlist() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || '{}';
    var accessToken = JSON.parse(stringifiedToken);
    if (!accessToken)
        window.location.href = '/login';
    var playlistId = window.location.pathname.split('/').at(-1);
    var playlist = (0, react_redux_1.useSelector)(function (store) { return store.playlist; }).playlist;
    var error = (0, react_redux_1.useSelector)(function (store) { return store.error; }).error;
    var headers = {
        Authorization: "Bearer ".concat(accessToken.token)
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = react_1["default"].useState(null), data = _a[0], setData = _a[1];
    react_1["default"].useEffect(function () {
        axios_1["default"].post('/suggestion/getSuggestions', { playlistId: playlistId }, { withCredentials: true, headers: headers }).then(function (res) {
            dispatch((0, playlistSlice_1.setSuggestions)(res.data.reverse()));
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
        axios_1["default"].post('/playlist/friendsAccess', { playlistInfo: { playlistId: playlistId, isPrivate: playlist.isPrivate } }, { withCredentials: true, headers: headers }).then(function (res) {
            dispatch((0, playlistSlice_1.setFriends)(res.data));
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
        axios_1["default"].post('/playlist/getPlaylist', { playlistId: playlistId }, { withCredentials: true, headers: headers }).then(function (res) {
            // console.log(res.data);
            if (res.data.ownership === false) {
                window.location.href = '/home';
            }
            else {
                setData(res.data);
            }
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    }, []);
    return (react_1["default"].createElement("div", { className: "pageContainer" }, error.isError
        ? react_1["default"].createElement("div", { className: "loadingScreen" }, error.error)
        : (react_1["default"].createElement("div", { className: "container" }, data && react_1["default"].createElement(PlaylistContainer_1["default"], { playlist: data, playlistId: playlistId })))));
}
exports["default"] = Playlist;
