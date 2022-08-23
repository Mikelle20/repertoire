"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var SearchBar_1 = __importDefault(require("../components/Suggestion/SearchBar"));
var friendsSlice_1 = require("../features/friendsSlice");
var SearchModal_1 = __importDefault(require("../components/Suggestion/SearchModal"));
var errorSlice_1 = require("../features/errorSlice");
function Suggestion() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || null;
    var accessToken = JSON.parse(stringifiedToken);
    if (!accessToken)
        window.location.href = '/login';
    var isOpen = (0, react_redux_1.useSelector)(function (store) { return store.searchModal; }).isOpen;
    var error = (0, react_redux_1.useSelector)(function (store) { return store.error; }).error;
    var dispatch = (0, react_redux_1.useDispatch)();
    var headers = {
        Authorization: "Bearer ".concat(accessToken.token)
    };
    react_1["default"].useEffect(function () {
        axios_1["default"].get('/friends/getFriends', { withCredentials: true, headers: headers }).then(function (res) {
            dispatch((0, friendsSlice_1.setFriends)(res.data));
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    }, []);
    return (react_1["default"].createElement("div", { className: "landingContainer" }, error.isError
        ? react_1["default"].createElement("div", { className: "loadingScreen" }, error.error)
        : (react_1["default"].createElement("div", { className: "pageContainer" },
            isOpen && react_1["default"].createElement(SearchModal_1["default"], null),
            react_1["default"].createElement(SearchBar_1["default"], null)))));
}
exports["default"] = Suggestion;
