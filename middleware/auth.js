"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios').default;
var jwt = require('jsonwebtoken');
require('dotenv').config();
var authenticateToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        var refreshToken_1 = req.cookies.refreshToken;
        console.log(refreshToken_1);
        var token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.status(401).json({ success: false, error: 'User Not Logged In.' });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
            var url, resp_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 5];
                        if (err.name !== 'TokenExpiredError') {
                            return [2 /*return*/, res.sendStatus(403)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = "".concat(process.env.APP_URL, "/authorize/userToken");
                        return [4 /*yield*/, axios.post(url, { token: refreshToken_1 }).then(function (response) {
                                resp_1 = response.data;
                            }).catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        req.updatedToken = resp_1.accessToken;
                        req.user = resp_1.user;
                        console.log('sent new token', true);
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.response);
                        return [2 /*return*/, res.sendStatus(400)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        req.user = user;
                        console.log('good access token');
                        next();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
var deleteRefreshToken = function (req, res, next) {
    req.refreshToken = req.cookies.refreshToken;
    next();
};
module.exports = {
    authenticateToken: authenticateToken,
    deleteRefreshToken: deleteRefreshToken,
};
