"use strict";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var React = __importStar(require("react"));
var AppBar_1 = __importDefault(require("@mui/material/AppBar"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Menu_1 = __importDefault(require("@mui/material/Menu"));
var Menu_2 = __importDefault(require("@mui/icons-material/Menu"));
var Container_1 = __importDefault(require("@mui/material/Container"));
var Avatar_1 = __importDefault(require("@mui/material/Avatar"));
var Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
function ResponsiveAppBar() {
    var _this = this;
    var accessToken = window.sessionStorage.getItem('accessToken');
    var pages = [['Home', '/home'], ['Friends', '/friends'], ['Suggestion', '/suggestion'], ['Playlists', '/playlists'], ['About', '/about']];
    var headers = {
        Authorization: "Bearer ".concat(accessToken)
    };
    var _a = React.useState(null), data = _a[0], setData = _a[1];
    var _b = React.useState(null), anchorElNav = _b[0], setAnchorElNav = _b[1];
    var handleOpenNavMenu = function (event) {
        setAnchorElNav(event.currentTarget);
    };
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const handleOpenNavMenu = (event: React.SyntheticEvent) => {
    //   setAnchorElNav(event.currentTarget);
    // };
    var handleCloseNavMenu = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setAnchorElNav(null);
            return [2 /*return*/];
        });
    }); };
    var handleClick = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]["delete"]('/authorize/logout', { withCredentials: true }).then(function () {
                        setData(null);
                        // window.sessionStorage.removeItem('accessToken')
                        window.sessionStorage.clear();
                    }).then(function () {
                        window.location.href = '/login';
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        if (accessToken) {
            axios_1["default"].get('/authorize/getUser', { headers: headers, withCredentials: true }).then(function (res) {
                setData(res.data);
            });
        }
    }, [accessToken]);
    return (React.createElement(AppBar_1["default"], { position: "static", style: { backgroundColor: '#2A3564', color: '#c3cbeb' } },
        React.createElement(Container_1["default"], { maxWidth: "xl" },
            React.createElement(Toolbar_1["default"], { disableGutters: true },
                React.createElement(Typography_1["default"], { variant: "h6", noWrap: true, component: "a", href: "/Home", sx: {
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        color: 'inherit',
                        textDecoration: 'none'
                    } }, "Repertoire"),
                React.createElement(Box_1["default"], { sx: { flexGrow: 1, display: { xs: 'flex', md: 'none' } } },
                    React.createElement(IconButton_1["default"], { size: "large", "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", onClick: handleOpenNavMenu, color: "inherit" },
                        React.createElement(Menu_2["default"], null)),
                    React.createElement(Menu_1["default"], { id: "menu-appbar", anchorEl: anchorElNav, anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        }, keepMounted: true, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left'
                        }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, sx: {
                            display: { xs: 'block', md: 'none' }
                        } }, !accessToken
                        ? (React.createElement(React.Fragment, null,
                            React.createElement(MenuItem_1["default"], null,
                                React.createElement(react_router_dom_1.NavLink, { className: "navLink", to: "/register" }, "Register")),
                            React.createElement(MenuItem_1["default"], null,
                                React.createElement(react_router_dom_1.NavLink, { className: "navLink", to: "/login" }, "Login")),
                            React.createElement(MenuItem_1["default"], null,
                                React.createElement(react_router_dom_1.NavLink, { className: "navLink", to: "/about" }, "About"))))
                        : (React.createElement(React.Fragment, null,
                            pages.map(function (page) { return (React.createElement(MenuItem_1["default"], { key: page[0], onClick: handleCloseNavMenu },
                                React.createElement(react_router_dom_1.NavLink, { className: "navLink", to: page[1] },
                                    React.createElement("span", null, page[0])))); }),
                            accessToken
                                ? (React.createElement(MenuItem_1["default"], { onClick: handleCloseNavMenu },
                                    React.createElement("span", { className: "navLink", onClick: handleClick }, "Logout")))
                                : (React.createElement(MenuItem_1["default"], { onClick: handleCloseNavMenu },
                                    React.createElement(react_router_dom_1.NavLink, { className: "navLink", to: "/login" }, "Login"))))))),
                React.createElement("img", { alt: "logo", src: require('../assets/logos/listening-music-light.png'), className: "navLogo" }),
                React.createElement(Typography_1["default"], { variant: "h5", noWrap: true, component: "a", href: "/Home", sx: {
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 900,
                        fontSize: '2rem',
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none'
                    } }, "Repertoire"),
                React.createElement(Box_1["default"], { sx: { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }, !accessToken
                    ? (React.createElement(React.Fragment, null,
                        React.createElement(react_router_dom_1.NavLink, { className: "navLinkFull", to: "/register" }, "Register"),
                        React.createElement(react_router_dom_1.NavLink, { className: "navLinkFull", to: "/login" }, "Login"),
                        React.createElement(react_router_dom_1.NavLink, { className: "navLinkFull", to: "/about" }, "About")))
                    : (React.createElement(React.Fragment, null,
                        pages.map(function (page) { return (React.createElement(react_router_dom_1.NavLink, { to: page[1], className: "navLinkFull", key: page[0], onClick: handleCloseNavMenu },
                            React.createElement("span", null, page[0]))); }),
                        accessToken ? React.createElement("span", { className: "navLinkFull", onClick: handleClick }, "Logout") : React.createElement(react_router_dom_1.NavLink, { className: "navLinkFull", to: "/login" /* sx={{ my: 2, color: 'white', display: 'block' }} */ }, "Login")))),
                React.createElement(Box_1["default"], { sx: { flexGrow: 0 } }, (data === null || data === void 0 ? void 0 : data.user) && (React.createElement(Tooltip_1["default"], { title: data.user.user_id },
                    React.createElement(Avatar_1["default"], { alt: data.user.display_name, src: data.user.profile_image }))))))));
}
exports["default"] = ResponsiveAppBar;
