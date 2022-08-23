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
var _a = require('express'), Request = _a.Request, Response = _a.Response;
var nanoid = require('nanoid');
var Op = require('sequelize').Op;
var axios = require('axios').default;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var sgMail = require('@sendgrid/mail');
var db = require('../models');
var _b = require('../helpers/auth'), getAccess = _b.getAccess, setAccount = _b.setAccount, generateAccessToken = _b.generateAccessToken;
require('dotenv').config();
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, emailRegex, isEmail, userFound, hashedPassword, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                res.json();
                _a = req.body, email = _a.email, password = _a.password;
                emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                isEmail = emailRegex.test(email);
                return [4 /*yield*/, db.User.findOne({ where: { email: (_b = {}, _b[Op.iLike] = email, _b) } }).catch(function (error) { return console.log(error); })];
            case 1:
                userFound = _c.sent();
                if (password.length <= 7)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Password must be greater than 7 characters.' })];
                if (!isEmail)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Please enter valid email.' })];
                if (userFound)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'User already associated with email.' })];
                hashedPassword = bcrypt.hashSync(password, 10);
                return [4 /*yield*/, db.User.create({
                        password: hashedPassword,
                        email: email,
                        user_id: nanoid(),
                    })];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).json({ success: true })];
            case 3:
                error_1 = _c.sent();
                console.log(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessCode, _a, email, password, user, hashedPassword, passwordsMatch, userData, accessToken, decode, refreshToken, accessToken, decode, refreshToken, error_2;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 10, , 11]);
                accessCode = req.body.accessCode || null;
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, db.User.findOne({ where: { email: (_b = {}, _b[Op.iLike] = email, _b) } }).catch(function (error) { return console.log(error); })];
            case 1: return [4 /*yield*/, (_d.sent())];
            case 2:
                user = (_d.sent()) || null;
                hashedPassword = user ? user.dataValues.password : '';
                passwordsMatch = bcrypt.compareSync(password, hashedPassword);
                if (!accessCode) return [3 /*break*/, 7];
                if (!user)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Incorrect Username or password.' })];
                if (!passwordsMatch)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Incorrect Username or password.' })];
                return [4 /*yield*/, setAccount(accessCode, email)];
            case 3:
                _d.sent();
                return [4 /*yield*/, db.User.findOne({ where: { email: (_c = {}, _c[Op.iLike] = email, _c) } }).catch(function (error) { return console.log(error); })];
            case 4: return [4 /*yield*/, (_d.sent())];
            case 5:
                userData = _d.sent();
                accessToken = generateAccessToken({
                    display_name: userData.dataValues.display_name,
                    profile_image: userData.dataValues.profile_image,
                    refresh_token: userData.dataValues.refresh_token,
                    spotify_connected: userData.dataValues.spotify_connected,
                    email: userData.dataValues.email,
                    user_id: userData.dataValues.user_id,
                });
                decode = jwt.decode(accessToken);
                refreshToken = jwt.sign({
                    email: userData.dataValues.email,
                    user_id: userData.dataValues.user_id,
                }, process.env.REFRESH_TOKEN_SECRET);
                return [4 /*yield*/, db.User.update({ server_refresh_token: refreshToken }, {
                        where: { email: email },
                    }).catch(function (error) { return console.log(error); })];
            case 6:
                _d.sent();
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                });
                res.status(200).json({
                    success: true,
                    accessToken: {
                        token: accessToken,
                        exp: decode.exp,
                    },
                });
                return [3 /*break*/, 9];
            case 7:
                if (!user)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Incorrect Username or password.' })];
                if (!passwordsMatch)
                    return [2 /*return*/, res.status(200).json({ success: false, error: 'Incorrect Username or password.' })];
                accessToken = generateAccessToken({
                    display_name: user.dataValues.display_name,
                    profile_image: user.dataValues.profile_image,
                    refresh_token: user.dataValues.refresh_token,
                    spotify_connected: user.dataValues.spotify_connected,
                    email: user.dataValues.email,
                    user_id: user.dataValues.user_id,
                });
                decode = jwt.decode(accessToken);
                refreshToken = jwt.sign({
                    email: user.dataValues.email,
                    user_id: user.dataValues.user_id,
                }, process.env.REFRESH_TOKEN_SECRET);
                return [4 /*yield*/, db.User.update({ server_refresh_token: refreshToken }, {
                        where: { user_id: user.dataValues.user_id },
                    }).catch(function (error) { return console.log(error); })];
            case 8:
                _d.sent();
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                });
                res.status(200).json({
                    success: true,
                    accessToken: {
                        token: accessToken,
                        exp: decode.exp,
                    },
                });
                _d.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_2 = _d.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
var getUserToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, decodedToken, userData_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                refreshToken = req.body.token;
                if (!refreshToken)
                    return [2 /*return*/, res.sendStatus(401)];
                decodedToken = jwt.decode(refreshToken);
                return [4 /*yield*/, db.User.findOne({
                        attributes: ['display_name', 'user_id', 'profile_image', 'email', 'spotify_connected'],
                        where: { user_id: decodedToken.user_id },
                    }).catch(function (error) { return console.log(error); })];
            case 1:
                userData_1 = _a.sent();
                if (!userData_1)
                    return [2 /*return*/, res.sendStatus(403)];
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
                    if (err)
                        return res.sendStatus(403);
                    var accessToken = generateAccessToken({
                        display_name: userData_1.dataValues.display_name,
                        profile_image: userData_1.dataValues.profile_image,
                        spotify_connected: userData_1.dataValues.spotify_connected,
                        email: userData_1.dataValues.email,
                        user_id: userData_1.dataValues.user_id,
                    });
                    var decode = jwt.decode(accessToken);
                    res.status(200).json({
                        success: true,
                        user: __assign({}, userData_1.dataValues),
                        accessToken: {
                            token: accessToken,
                            exp: decode.exp,
                        },
                    });
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedToken = jwt.decode(req.refreshToken);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.User.update({ server_refresh_token: null }, {
                        where: { email: decodedToken.email },
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                _a.sent();
                res.clearCookie('refreshToken');
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var accountConnected = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var check, email, user, error_5;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                check = (req.body || null).check;
                email = req.body.email;
                if (!check) return [3 /*break*/, 3];
                return [4 /*yield*/, db.User.findOne({ attributes: ['spotify_connected'], where: { email: (_a = {}, _a[Op.iLike] = email, _a) } })];
            case 1: return [4 /*yield*/, ((_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.dataValues)];
            case 2:
                user = _c.sent();
                if (user.spotify_connected)
                    return [2 /*return*/, res.status(200).json({ success: true })];
                if (user.spotify_connected === false)
                    return [2 /*return*/, res.status(200).json({ success: false })];
                _c.label = 3;
            case 3:
                db.User.update({ spotify_connected: true }, {
                    where: { email: email },
                })
                    .then(res.status(200).json({ success: true, accountConnected: true }))
                    .catch(function (error) { return console.log(error); });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _c.sent();
                console.log(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getRefreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, accessCode, email_1, params, basicAuth, basicAuthHeaders, refreshToken_1, accessToken, bearerAuth, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, accessCode = _a.accessCode, email_1 = _a.email;
                params = "grant_type=authorization_code&code=".concat(accessCode, "&redirect_uri=").concat(process.env.REDIRECT_URI);
                basicAuth = "Basic ".concat(Buffer.from("".concat(process.env.CLIENT_ID, ":").concat(process.env.CLIENT_SECRET)).toString('base64'));
                basicAuthHeaders = {
                    Authorization: basicAuth,
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                return [4 /*yield*/, axios.post('https://accounts.spotify.com/api/token', params, { headers: basicAuthHeaders }).then(function (resp) {
                        refreshToken_1 = resp.data.refresh_token;
                    }).catch(function (error) { return console.log(error); })];
            case 1:
                _b.sent();
                return [4 /*yield*/, db.User.update({ refresh_token: refreshToken_1 }, {
                        where: { email: email_1 },
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                _b.sent();
                return [4 /*yield*/, getAccess(refreshToken_1)];
            case 3:
                accessToken = _b.sent();
                bearerAuth = {
                    Accept: 'accept/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                // const userInfo = await (await axios.get('https://api.spotify.com/v1/me', { headers: bearerAuth })).data
                axios.get('https://api.spotify.com/v1/me', { headers: bearerAuth }).then(function (resp) {
                    var userInfo = resp.data;
                    if (userInfo.images[0]) {
                        db.User.update({
                            display_name: userInfo.display_name,
                            profile_image: userInfo.images[0].url,
                            user_id: userInfo.id,
                        }, {
                            where: { email: email_1 },
                        });
                    }
                    else {
                        db.User.update({
                            display_name: userInfo.display_name,
                            user_id: userInfo.id,
                        }, {
                            where: { email: email_1 },
                        });
                    }
                })
                    .then(function () { return res.status(200).json({ success: true }); })
                    .catch(function (error) { return console.log(error); });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                console.log(error_6);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getAccessToken = function (req, res) {
    try {
        var refreshToken = req.body.refreshToken;
        var params = "grant_type=refresh_token&refresh_token=".concat(refreshToken);
        var basicAuth = "Basic ".concat(Buffer.from("".concat(process.env.CLIENT_ID, ":").concat(process.env.CLIENT_SECRET)).toString('base64'));
        var headers = {
            Authorization: basicAuth,
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: params,
            headers: headers,
        }).then(function (resp) {
            res.json({ success: true, accessToken: resp.data.access_token });
        }).catch(function (error) { return console.log(error); });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var server_refresh_token, decodedToken, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                server_refresh_token = req.cookies.refreshToken;
                decodedToken = jwt.decode(server_refresh_token);
                return [4 /*yield*/, db.User.findOne({
                        attributes: ['user_id', 'profile_image'],
                        where: { email: decodedToken.email },
                    }).catch(function (error) { return console.log(error); })];
            case 1:
                user = _a.sent();
                res.status(200).json({
                    success: true,
                    user: __assign({}, user.dataValues),
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var checkToken = function (req, res) {
    res.status(200).json({
        accessToken: req.updatedToken,
    });
};
var sendResetLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, msg, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                email = req.body.email;
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                return [4 /*yield*/, db.User.findOne({ where: { email: (_a = {}, _a[Op.iLike] = email, _a) } }).catch(function (error) { return console.log(error); })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                token = jwt.sign({ email: email }, process.env.RESET_TOKEN, { expiresIn: '1h' });
                return [4 /*yield*/, db.User.update({ reset_token: token }, { where: { email: email } })];
            case 2:
                _b.sent();
                msg = {
                    to: email,
                    from: 'repertoire.manager@gmail.com',
                    subject: 'Password Reset Link',
                    text: "click here to reset password: https://repertoireapp.herokuapp.com/reset_password/?token=".concat(token),
                    html: "<strong>click here to reset password: https://repertoireapp.herokuapp.com/reset_password/?token=".concat(token, "</strong>"),
                };
                sgMail.send(msg)
                    .then(function () {
                    console.log('Email sent');
                })
                    .catch(function (error) {
                    console.log(error);
                });
                _b.label = 3;
            case 3:
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 5];
            case 4:
                error_8 = _b.sent();
                console.log(error_8);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, token_1, hashedPassword_1;
    return __generator(this, function (_b) {
        try {
            _a = req.body, password = _a.password, token_1 = _a.token;
            if (password.length <= 7)
                return [2 /*return*/, res.status(200).json({ success: false, error: 'Password must be greater than 7 characters.' })];
            hashedPassword_1 = bcrypt.hashSync(password, 10);
            jwt.verify(token_1, process.env.RESET_TOKEN, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err)
                                return [2 /*return*/, res.status(200).json({ sucess: false, error: 'Token has expired, please send another email.' })];
                            return [4 /*yield*/, db.User.update({ password: hashedPassword_1 }, { where: { reset_token: token_1 } }).catch(function (error) { return console.log(error); })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, db.User.update({ reset_token: null }, { where: { email: user.email } }).catch(function (error) { return console.log(error); })];
                        case 2:
                            _a.sent();
                            res.status(200).json({ success: true });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
        return [2 /*return*/];
    });
}); };
module.exports = {
    getRefreshToken: getRefreshToken,
    getAccessToken: getAccessToken,
    deleteToken: deleteToken,
    loginUser: loginUser,
    resetPassword: resetPassword,
    registerUser: registerUser,
    getUser: getUser,
    sendResetLink: sendResetLink,
    getUserToken: getUserToken,
    accountConnected: accountConnected,
    checkToken: checkToken,
};
