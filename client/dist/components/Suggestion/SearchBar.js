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
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var errorSlice_1 = require("../../features/errorSlice");
var SearchResult_1 = __importDefault(require("./SearchResult"));
function SearchBar() {
    var _a = react_1["default"].useState({
        search: ''
    }), formData = _a[0], setFormData = _a[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var _b = react_1["default"].useState([]), tracks = _b[0], setTracks = _b[1];
    react_1["default"].useEffect(function () {
        (0, axios_1["default"])({
            method: 'POST',
            url: '/suggestion/search',
            data: formData,
            withCredentials: true,
            headers: headers
        }).then(function (res) {
            setTracks(res.data);
        })["catch"](function () {
            dispatch((0, errorSlice_1.setError)(true));
        });
    }, [formData.search]);
    var handleChange = function (Event) {
        var target = Event.target;
        setFormData(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[target.name] = target.value, _a)));
        });
    };
    var searches = tracks.map(function (track) { return (react_1["default"].createElement(SearchResult_1["default"], { key: track.songId, track: track })); });
    return (react_1["default"].createElement("div", { className: "searchContainer" },
        react_1["default"].createElement("div", { className: "searchInputContainer" },
            react_1["default"].createElement("input", { tabIndex: 0, className: "searchInput", name: "search", placeholder: "Song + Artist...", value: formData.search, onChange: handleChange }),
            react_1["default"].createElement("span", null,
                react_1["default"].createElement("img", { alt: "search", src: require('../../assets/icons/search.png'), className: "searchIcon" }))),
        formData.search.length !== 0
            && (react_1["default"].createElement("div", { className: "searchResultsContainer" }, searches.length === 0 ? react_1["default"].createElement("span", { className: "noResultsText" }, "No Results Found") : searches))));
}
exports["default"] = SearchBar;
