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
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var FriendResult_1 = __importDefault(require("./FriendResult"));
var errorSlice_1 = require("../../features/errorSlice");
function FriendSearchBar() {
    var _a = react_1["default"].useState({
        search: ''
    }), formData = _a[0], setFormData = _a[1];
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var error = (0, react_redux_1.useSelector)(function (store) { return store.error; }).error;
    var dispatch = (0, react_redux_1.useDispatch)();
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var _b = react_1["default"].useState([]), friendsResults = _b[0], setFriendsResults = _b[1];
    var _c = react_1["default"].useState(0), updateStatus = _c[0], setUpdateStatus = _c[1];
    var handleSubmit = function (id) {
        axios_1["default"].post('/friends/addFriend', { friend: id }, { withCredentials: true, headers: headers }).then(function () {
            setUpdateStatus(function (prev) {
                var count = prev + 1;
                return count;
            });
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    };
    var handleDelete = function (id) {
        (0, axios_1["default"])({
            method: 'DELETE',
            url: '/friends/deleteFriend',
            withCredentials: true,
            headers: headers,
            data: { friend: id }
        }).then(function () {
            setUpdateStatus(function (prev) { return prev - 1; });
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    };
    react_1["default"].useEffect(function () {
        if (formData.search.length) {
            axios_1["default"].post('/friends/searchFriends', formData, { withCredentials: true, headers: headers }).then(function (res) {
                setFriendsResults(res.data);
            })["catch"](function () {
                dispatch((0, errorSlice_1.setError)(true));
            });
        }
    }, [formData.search, updateStatus]);
    var handleChange = function (Event) {
        var target = Event.target;
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[target.name] = target.value, _a)));
        });
    };
    var searches = friendsResults.map(function (friend) { return react_1["default"].createElement(FriendResult_1["default"], { key: friend.user_id, friend: friend, addFriend: handleSubmit, deleteFriend: handleDelete }); });
    return (react_1["default"].createElement("div", null, error.isError
        ? (react_1["default"].createElement("div", { className: "pageContainer" },
            react_1["default"].createElement("div", { className: "loadingScreen" }, error.error)))
        : (react_1["default"].createElement("div", { className: "searchContainer" },
            react_1["default"].createElement("div", { className: "searchInputContainer" },
                react_1["default"].createElement("input", { className: "searchInput", name: "search", placeholder: "Enter Spotify Username...", value: formData.search, onChange: handleChange }),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("img", { alt: "search icon", src: require('../../assets/icons/search.png'), className: "searchIcon" }))),
            formData.search.length !== 0
                && (react_1["default"].createElement("div", { className: "friendResultsContainer" }, searches.length === 0 ? react_1["default"].createElement("span", { className: "noResultsText" }, "No Results Found") : searches))))));
}
exports["default"] = FriendSearchBar;
