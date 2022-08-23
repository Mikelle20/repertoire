"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var HomeContainer_1 = __importDefault(require("../components/Home/HomeContainer"));
function Home() {
    var stringifiedToken = window.sessionStorage.getItem('accessToken') || null;
    var accessToken = JSON.parse(stringifiedToken);
    if (!accessToken)
        window.location.href = '/login';
    var _a = react_1["default"].useState(null), data = _a[0], setData = _a[1];
    var _b = react_1["default"].useState(null), socials = _b[0], setSocials = _b[1];
    var _c = react_1["default"].useState({
        isError: false,
        error: ''
    }), error = _c[0], setError = _c[1];
    var headers = {
        Authorization: "Bearer ".concat(accessToken.token)
    };
    react_1["default"].useEffect(function () {
        axios_1["default"].get('/home/setHome', { withCredentials: true, headers: headers }).then(function (res) {
            setData(res.data);
        })["catch"](function () {
            setError({
                isError: true,
                error: '(500) Internal Server Error.'
            });
        });
        axios_1["default"].get('/home/getSocials', { withCredentials: true, headers: headers }).then(function (res) {
            setSocials(res.data);
        })["catch"](function () {
            setError({
                isError: true,
                error: '(500) Internal Server Error.'
            });
        });
    }, []);
    return (react_1["default"].createElement("div", { className: "landingContainer" }, accessToken && (react_1["default"].createElement("div", { className: "pageContainer" }, socials && data !== null
        ? react_1["default"].createElement(HomeContainer_1["default"], { data: data, socials: socials })
        : (react_1["default"].createElement("div", { className: "loadingScreen" }, error.isError ? error.error : 'Loading...'))))));
}
exports["default"] = Home;
