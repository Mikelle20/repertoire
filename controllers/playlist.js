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
var AxiosResponse = require('axios').AxiosResponse;
var axios = require('axios').default;
var Op = require('sequelize').Op;
var getAccessToken = require('../helpers/auth').getAccessToken;
var setPlaylists = require('../helpers/playlists').setPlaylists;
var db = require('../models');
var createPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_3, _a, title_1, isPrivate, accessList, description, data, accessToken, url, headers, playlistCreated_1, playlistAccess, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                user_3 = req.user;
                _a = req.body.formData, title_1 = _a.title, isPrivate = _a.isPrivate, accessList = _a.accessList, description = _a.description;
                data = {
                    name: title_1,
                    description: description,
                    public: !isPrivate,
                };
                return [4 /*yield*/, getAccessToken(user_3.user_id)];
            case 1:
                accessToken = _b.sent();
                url = "https://api.spotify.com/v1/users/".concat(user_3.user_id, "/playlists");
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                return [4 /*yield*/, axios.post(url, data, { headers: headers }).then(function (resp) {
                        playlistCreated_1 = resp.data;
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                _b.sent();
                return [4 /*yield*/, db.Playlist.create({
                        playlist_id: playlistCreated_1.id,
                        title: title_1,
                        author_id: playlistCreated_1.owner.id,
                        is_private: isPrivate,
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                _b.sent();
                playlistAccess = accessList.map(function (element) { return ({
                    playlist_id: playlistCreated_1.id,
                    title: title_1,
                    user_id: user_3.user_id,
                    friend_id: element,
                }); });
                return [4 /*yield*/, db.PlaylistAccess.bulkCreate(playlistAccess)];
            case 4:
                _b.sent();
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, headers, dataPlaylists, playlists, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 2:
                accessToken = _a.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                return [4 /*yield*/, db.Playlist.findAll({
                        attributes: ['playlist_id', 'is_private'],
                        where: { author_id: user.user_id },
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                dataPlaylists = _a.sent();
                return [4 /*yield*/, setPlaylists(dataPlaylists, headers)];
            case 4:
                playlists = _a.sent();
                res.status(200).send(playlists);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, user, playlistOwner, accessToken, headers, url, playlist_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playlistId = req.body.playlistId;
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db.Playlist.findOne({ where: { playlist_id: playlistId } }).catch(function (error) { return console.log(error); })];
            case 2: return [4 /*yield*/, (_a.sent()).dataValues.author_id];
            case 3:
                playlistOwner = _a.sent();
                console.log(playlistOwner);
                if (user.user_id !== playlistOwner)
                    return [2 /*return*/, res.status(200).json({ success: true, ownership: false })];
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 4:
                accessToken = _a.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                url = "https://api.spotify.com/v1/playlists/".concat(playlistId);
                return [4 /*yield*/, axios.get(url, { headers: headers }).then(function (resp) {
                        playlist_1 = resp.data;
                    }).catch(function (error) { return console.log(error); })];
            case 5:
                _a.sent();
                res.status(200).json({
                    success: true,
                    description: playlist_1.description,
                    followers: playlist_1.followers,
                    images: playlist_1.images,
                    name: playlist_1.name,
                    items: playlist_1.tracks,
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var deletePlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, playlistId, accessToken, headers, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                user = req.user;
                playlistId = req.body.playlistId;
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 1:
                accessToken = _a.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                return [4 /*yield*/, axios.delete("https://api.spotify.com/v1/playlists/".concat(playlistId, "/followers"), { headers: headers }).catch(function (error) { return console.log(error); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.Playlist.destroy({
                        where: {
                            author_id: user.user_id,
                            playlist_id: playlistId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.PlaylistAccess.destroy({
                        where: {
                            user_id: user.user_id,
                            playlist_id: playlistId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 4:
                _a.sent();
                return [4 /*yield*/, db.Suggestion.destroy({
                        where: {
                            receiver_id: user.user_id,
                            playlist_id: playlistId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 5:
                _a.sent();
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var friendsAccess = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistInfo, user, isPrivate, users_1, arr_1, friends_1, friendsProfiles, users, arr_2, error_5;
    var _a, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                playlistInfo = req.body.playlistInfo;
                user = req.user;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 8, , 9]);
                return [4 /*yield*/, db.Playlist.findOne({
                        where: {
                            playlist_id: playlistInfo.playlistId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 2: return [4 /*yield*/, ((_d = (_e.sent())) === null || _d === void 0 ? void 0 : _d.dataValues.is_private)];
            case 3:
                isPrivate = _e.sent();
                if (!isPrivate) return [3 /*break*/, 6];
                return [4 /*yield*/, db.PlaylistAccess.findAll({
                        attributes: ['friend_id'],
                        where: {
                            user_id: user.user_id,
                            playlist_id: playlistInfo.playlistId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 4:
                users_1 = _e.sent();
                arr_1 = [];
                users_1.forEach(function (element) {
                    arr_1.push({ user_id: element.dataValues.friend_id });
                });
                friends_1 = [];
                return [4 /*yield*/, db.User.findAll({
                        attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
                        where: (_a = {},
                            _a[Op.or] = arr_1,
                            _a),
                    }).catch(function (error) { return console.log(error); })];
            case 5:
                friendsProfiles = _e.sent();
                friendsProfiles.forEach(function (friend) {
                    friends_1.push(__assign({}, friend.dataValues));
                });
                return [2 /*return*/, res.status(200).send(friends_1)];
            case 6: return [4 /*yield*/, db.Friend.findAll({
                    where: (_b = {},
                        _b[Op.or] = [
                            { user_1: user.user_id },
                            { user_2: user.user_id },
                        ],
                        _b),
                }).catch(function (error) { return console.log(error); })];
            case 7:
                users = _e.sent();
                arr_2 = [];
                users.forEach(function (element) {
                    if (element.dataValues.user_2 === user.user_id) {
                        arr_2.push({ user_id: element.dataValues.user_1 });
                    }
                    else {
                        arr_2.push({ user_id: element.dataValues.user_2 });
                    }
                });
                db.User.findAll({
                    attributes: ['user_id', 'profile_image', 'rating', 'email', 'display_name'],
                    where: (_c = {},
                        _c[Op.or] = arr_2,
                        _c),
                }).then(function (resp) {
                    var friends = [];
                    for (var i = 0; i < resp.length; i++) {
                        friends.push(__assign({}, resp[i].dataValues));
                    }
                    return res.status(200).send(friends);
                }).catch(function (error) { return console.log(error); });
                return [3 /*break*/, 9];
            case 8:
                error_5 = _e.sent();
                console.log(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createPlaylist: createPlaylist,
    getPlaylists: getPlaylists,
    getPlaylist: getPlaylist,
    friendsAccess: friendsAccess,
    deletePlaylist: deletePlaylist,
};
