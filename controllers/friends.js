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
var Op = require('sequelize').Op;
var _a = require('express'), Request = _a.Request, Response = _a.Response;
var getStatus = require('../helpers/friends').getStatus;
var db = require('../models');
var addFriend = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friend, user, friendshipExists, error_1;
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                friend = req.body.friend;
                return [4 /*yield*/, db.User.findOne({ where: { user_id: req.user.user_id } }).catch(function (error) { return console.log(error); })];
            case 1: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.dataValues)];
            case 2:
                user = _d.sent();
                return [4 /*yield*/, db.Friend.findOne({
                        attributes: ['user_1', 'user_2', 'status'],
                        where: (_a = {},
                            _a[Op.or] = [
                                {
                                    user_1: user.user_id,
                                    user_2: friend,
                                },
                                {
                                    user_1: friend,
                                    user_2: user.user_id,
                                },
                            ],
                            _a),
                    })];
            case 3:
                friendshipExists = _d.sent();
                if (friendshipExists) {
                    db.Friend.update({ status: 'friend' }, {
                        where: (_b = {},
                            _b[Op.or] = [
                                {
                                    user_1: user.user_id,
                                    user_2: friend,
                                },
                                {
                                    user_2: user.user_id,
                                    user_1: friend,
                                },
                            ],
                            _b),
                    }).catch(function (error) { return console.log(error); });
                }
                else {
                    db.Friend.create({
                        user_1: user.user_id,
                        user_2: friend,
                        status: 'pending',
                    });
                }
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                res.sendStatus(500);
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getFriends = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_3, userFriends, friends_1, error_2;
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db.User.findOne({ where: { user_id: req.user.user_id } }).catch(function (error) { return console.log(error); })];
            case 1: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.dataValues)];
            case 2:
                user_3 = _d.sent();
                return [4 /*yield*/, db.Friend.findAll({
                        attributes: ['user_2', 'user_1'],
                        where: (_a = {
                                status: 'friend'
                            },
                            _a[Op.or] = [
                                { user_1: user_3.user_id },
                                { user_2: user_3.user_id },
                            ],
                            _a),
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                userFriends = _d.sent();
                friends_1 = [];
                userFriends.forEach(function (element) {
                    if (element.dataValues.user_2 === user_3.user_id) {
                        friends_1.push({ user_id: element.dataValues.user_1 });
                    }
                    else {
                        friends_1.push({ user_id: element.dataValues.user_2 });
                    }
                });
                db.User.findAll({
                    attributes: ['user_id', 'profile_image', 'rating', 'display_name'],
                    where: (_b = {},
                        _b[Op.or] = friends_1,
                        _b),
                }).then(function (resp) {
                    res.status(200).send(resp);
                }).catch(function (error) { return console.log(error); });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var searchFriends = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, user, users, friendStatus, userFriends, _i, users_1, friend, _a, friendStatus_1, status_1, error_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                search = req.body.search;
                user = req.user;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db.User.findAll({
                        attributes: ['profile_image', 'display_name', 'user_id'],
                        where: (_b = {},
                            _b[Op.not] = [
                                { user_id: user.user_id },
                            ],
                            _b.user_id = (_c = {},
                                _c[Op.startsWith] = [
                                    search,
                                ],
                                _c),
                            _b),
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                users = _d.sent();
                return [4 /*yield*/, getStatus(user.user_id, users)];
            case 3:
                friendStatus = _d.sent();
                userFriends = [];
                for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                    friend = users_1[_i];
                    for (_a = 0, friendStatus_1 = friendStatus; _a < friendStatus_1.length; _a++) {
                        status_1 = friendStatus_1[_a];
                        if (status_1.status === 'friend') {
                            userFriends.push(__assign(__assign({}, friend.dataValues), { status: 3 }));
                        }
                        else if (status_1.status === 'pending') {
                            if (status_1.user_1 !== user.user_id) {
                                userFriends.push(__assign(__assign({}, friend.dataValues), { status: 2 }));
                            }
                            else {
                                userFriends.push(__assign(__assign({}, friend.dataValues), { status: 1 }));
                            }
                        }
                        else {
                            userFriends.push(__assign(__assign({}, friend.dataValues), { status: 0 }));
                        }
                    }
                }
                res.status(200).send(userFriends);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _d.sent();
                console.log(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteFriend = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friend, user, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                friend = req.body.friend;
                user = req.user;
                return [4 /*yield*/, db.Friend.destroy({
                        where: (_a = {},
                            _a[Op.or] = [
                                {
                                    user_1: user.user_id,
                                    user_2: friend,
                                },
                                {
                                    user_2: user.user_id,
                                    user_1: friend,
                                },
                            ],
                            _a),
                    }).catch(function (error) { return console.log(error); })];
            case 1:
                _b.sent();
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    addFriend: addFriend,
    getFriends: getFriends,
    searchFriends: searchFriends,
    deleteFriend: deleteFriend,
};
