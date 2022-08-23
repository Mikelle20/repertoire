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
var AxiosError = require('axios').AxiosError;
var AxiosResponse = require('axios').AxiosResponse;
var axios = require('axios').default;
var Op = require('sequelize').Op;
var _a = require('express'), Request = _a.Request, Response = _a.Response;
var sort = require('sort-array');
var getAccessToken = require('../helpers/auth').getAccessToken;
var db = require('../models');
var setHome = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userData, accessToken, headers, suggestions, playlists, friendships, friends_1, i, friendsListens, _loop_1, i, homeSuggestions, homePlaylists, _loop_2, i, _loop_3, i, items_1, tracks_1, sortedPlaylists, sortedSuggestions, sortedListens, error_1;
    var _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                user = req.user;
                console.log(user);
                _e.label = 1;
            case 1:
                _e.trys.push([1, 22, , 23]);
                return [4 /*yield*/, db.User.findOne({
                        attributes: ['rating', 'display_name', 'profile_image', 'user_id', 'email'],
                        where: { email: user.email },
                    })];
            case 2: return [4 /*yield*/, ((_b = (_e.sent())) === null || _b === void 0 ? void 0 : _b.dataValues)];
            case 3:
                userData = _e.sent();
                return [4 /*yield*/, getAccessToken(userData.user_id)];
            case 4:
                accessToken = _e.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                console.log(headers);
                return [4 /*yield*/, db.Suggestion.findAll({
                        where: {
                            receiver_id: user.user_id,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 5:
                suggestions = _e.sent();
                return [4 /*yield*/, db.Playlist.findAll({
                        where: {
                            author_id: user.user_id,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 6:
                playlists = _e.sent();
                return [4 /*yield*/, db.Friend.findAll({
                        where: (_a = {
                                status: 'friend'
                            },
                            _a[Op.or] = [
                                { user_1: user.user_id },
                                { user_2: user.user_id },
                            ],
                            _a),
                    }).catch(function (error) { return console.log(error); })];
            case 7:
                friendships = _e.sent();
                friends_1 = [];
                for (i = 0; i < friendships.length; i++) {
                    if (friendships[i].dataValues.user_1 === user.user_id) {
                        friends_1.push({ friendId: friendships[i].dataValues.user_2 });
                    }
                    else {
                        friends_1.push({ friendId: friendships[i].dataValues.user_1 });
                    }
                }
                friendsListens = [];
                if (!(friends_1.length !== 0)) return [3 /*break*/, 11];
                _loop_1 = function (i) {
                    var friendToken, friend, friendHeaders, recentListen;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, getAccessToken(friends_1[i].friendId)];
                            case 1:
                                friendToken = _f.sent();
                                return [4 /*yield*/, db.User.findOne({
                                        where: { user_id: friends_1[i].friendId },
                                    })];
                            case 2: return [4 /*yield*/, ((_c = (_f.sent())) === null || _c === void 0 ? void 0 : _c.dataValues)];
                            case 3:
                                friend = _f.sent();
                                friendHeaders = {
                                    Authorization: "Bearer ".concat(friendToken),
                                };
                                return [4 /*yield*/, axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers: friendHeaders }).then(function (resp) {
                                        recentListen = resp.data;
                                    }).catch(function (error) { return console.log(error.response); })];
                            case 4:
                                _f.sent();
                                friendsListens.push({
                                    friendName: friend.display_name,
                                    friendImage: friend.profile_image,
                                    songName: recentListen.items[0].track.name,
                                    songImage: recentListen.items[0].track.album.images[0].url,
                                    playedAt: recentListen.items[0].played_at,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _e.label = 8;
            case 8:
                if (!(i < friends_1.length)) return [3 /*break*/, 11];
                return [5 /*yield**/, _loop_1(i)];
            case 9:
                _e.sent();
                _e.label = 10;
            case 10:
                i++;
                return [3 /*break*/, 8];
            case 11:
                homeSuggestions = [];
                homePlaylists = [];
                if (!(suggestions.length !== 0)) return [3 /*break*/, 15];
                _loop_2 = function (i) {
                    var song, sender;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0: return [4 /*yield*/, axios({
                                    method: 'GET',
                                    url: "https://api.spotify.com/v1/tracks/".concat(suggestions[i].dataValues.song_id),
                                    headers: headers,
                                }).then(function (resp) {
                                    song = resp.data;
                                }).catch(function (error) { return console.log(error); })];
                            case 1:
                                _g.sent();
                                return [4 /*yield*/, db.User.findOne({
                                        where: { user_id: suggestions[i].sender_id },
                                    }).catch(function (error) { return console.log(error); })];
                            case 2: return [4 /*yield*/, ((_d = (_g.sent())) === null || _d === void 0 ? void 0 : _d.dataValues)];
                            case 3:
                                sender = _g.sent();
                                homeSuggestions.push({
                                    songId: suggestions[i].dataValues.song_id,
                                    songImage: song.album.images,
                                    songName: song.name,
                                    playlistId: suggestions[i].dataValues.playlist_id,
                                    senderId: sender.user_id,
                                    senderImage: sender.profile_image,
                                    senderName: sender.display_name,
                                    createdAt: suggestions[i].dataValues.createdAt,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _e.label = 12;
            case 12:
                if (!(i < suggestions.length)) return [3 /*break*/, 15];
                return [5 /*yield**/, _loop_2(i)];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 12];
            case 15:
                if (!(playlists !== 0)) return [3 /*break*/, 19];
                _loop_3 = function (i) {
                    var playlist_1;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0: return [4 /*yield*/, axios({
                                    method: 'GET',
                                    url: "https://api.spotify.com/v1/playlists/".concat(playlists[i].dataValues.playlist_id),
                                    headers: headers,
                                }).then(function (resp) {
                                    playlist_1 = resp.data;
                                }).catch(function (error) { return console.log(error); })];
                            case 1:
                                _h.sent();
                                homePlaylists.push({
                                    type: 0,
                                    playlistId: playlists[i].dataValues.playlist_id,
                                    playlistImage: playlist_1.images,
                                    playlistName: playlist_1.name,
                                    createdAt: playlists[i].dataValues.createdAt,
                                    isPrivate: playlists[i].dataValues.is_private,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _e.label = 16;
            case 16:
                if (!(i < playlists.length)) return [3 /*break*/, 19];
                return [5 /*yield**/, _loop_3(i)];
            case 17:
                _e.sent();
                _e.label = 18;
            case 18:
                i++;
                return [3 /*break*/, 16];
            case 19: return [4 /*yield*/, axios({
                    method: 'GET',
                    url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0',
                    headers: headers,
                }).then(function (resp) {
                    items_1 = resp.data;
                }).catch(function (error) { return console.log(error); })];
            case 20:
                _e.sent();
                return [4 /*yield*/, axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0', { headers: headers }).then(function (resp) {
                        tracks_1 = resp.data;
                    }).catch(function (error) { return console.log(error); })];
            case 21:
                _e.sent();
                sortedPlaylists = sort(homePlaylists, { order: 'desc', by: 'createdAt' });
                sortedSuggestions = sort(homeSuggestions, { order: 'desc', by: 'createdAt' });
                sortedListens = sort(friendsListens, { order: 'desc', by: 'playedAt' });
                res.status(200).json({
                    success: true,
                    homePlaylists: sortedPlaylists,
                    homeSuggestions: sortedSuggestions,
                    items: items_1.items,
                    tracks: tracks_1.items,
                    friendListens: sortedListens,
                    user: __assign({}, userData),
                });
                return [3 /*break*/, 23];
            case 22:
                error_1 = _e.sent();
                console.log(error_1.response);
                res.sendStatus(500);
                return [3 /*break*/, 23];
            case 23: return [2 /*return*/];
        }
    });
}); };
var getSocials = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, headers, socials, ratings, i, song, sender, playlistAdded, _loop_4, i, friends_2, friendIds, i, friendId, friend, sortedFriends, sortedSocials, error_2;
    var _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                user = req.user;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 21, , 22]);
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 2:
                accessToken = _e.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                socials = [];
                return [4 /*yield*/, db.Rating.findAll({
                        where: {
                            reciever_id: user.user_id,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                ratings = _e.sent();
                if (!(ratings.length !== 0)) return [3 /*break*/, 10];
                i = 0;
                _e.label = 4;
            case 4:
                if (!(i < ratings.length)) return [3 /*break*/, 10];
                return [4 /*yield*/, axios({
                        method: 'GET',
                        url: "https://api.spotify.com/v1/tracks/".concat(ratings[i].dataValues.song_id),
                        headers: headers,
                    })];
            case 5: return [4 /*yield*/, ((_b = (_e.sent())) === null || _b === void 0 ? void 0 : _b.data)];
            case 6:
                song = _e.sent();
                return [4 /*yield*/, db.User.findOne({
                        where: {
                            user_id: ratings[i].dataValues.sender_id,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 7: return [4 /*yield*/, ((_c = (_e.sent())) === null || _c === void 0 ? void 0 : _c.dataValues)];
            case 8:
                sender = _e.sent();
                socials.push({
                    type: 1,
                    rating: ratings[i].dataValues.rating,
                    senderName: sender.display_name,
                    senderImage: sender.profile_image,
                    createdAt: ratings[i].dataValues.createdAt,
                    songName: song.name,
                    songImage: song.album.images,
                    songArtist: song.album.artists[0].name,
                });
                _e.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 4];
            case 10: return [4 /*yield*/, db.PlaylistAccess.findAll({
                    where: {
                        friend_id: user.user_id,
                    },
                }).catch(function (error) { return console.log(error); })];
            case 11:
                playlistAdded = _e.sent();
                if (!(playlistAdded.length !== 0)) return [3 /*break*/, 15];
                _loop_4 = function (i) {
                    var playlist_2, owner;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, axios({
                                    method: 'GET',
                                    url: "https://api.spotify.com/v1/playlists/".concat(playlistAdded[i].dataValues.playlist_id),
                                    headers: headers,
                                }).then(function (resp) {
                                    playlist_2 = resp.data;
                                }).catch(function (error) { return console.log(error); })];
                            case 1:
                                _f.sent();
                                return [4 /*yield*/, db.User.findOne({
                                        where: {
                                            user_id: playlistAdded[i].dataValues.user_id,
                                        },
                                    }).catch(function (error) { return console.log(error); })];
                            case 2: return [4 /*yield*/, ((_d = (_f.sent())) === null || _d === void 0 ? void 0 : _d.dataValues)];
                            case 3:
                                owner = _f.sent();
                                socials.push({
                                    playlistOwner: playlistAdded[i].dataValues.user_id,
                                    createdAt: playlistAdded[i].dataValues.createdAt,
                                    ownerName: owner.display_name,
                                    ownerImage: owner.profile_image,
                                    playlistName: playlist_2.name,
                                    playlistImage: playlist_2.images,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _e.label = 12;
            case 12:
                if (!(i < playlistAdded.length)) return [3 /*break*/, 15];
                return [5 /*yield**/, _loop_4(i)];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 12];
            case 15:
                friends_2 = [];
                return [4 /*yield*/, db.Friend.findAll({
                        where: (_a = {
                                status: 'friend'
                            },
                            _a[Op.or] = [
                                { user_1: user.user_id },
                                { user_2: user.user_id },
                            ],
                            _a),
                    }).catch(function (error) { return console.log(error); })];
            case 16:
                friendIds = _e.sent();
                i = 0;
                _e.label = 17;
            case 17:
                if (!(i < friendIds.length)) return [3 /*break*/, 20];
                friendId = void 0;
                if (friendIds[i].dataValues.user_1 === user.user_id) {
                    friendId = friendIds[i].dataValues.user_2;
                }
                else {
                    friendId = friendIds[i].dataValues.user_1;
                }
                return [4 /*yield*/, db.User.findOne({
                        where: { user_id: friendId },
                        attributes: ['user_id', 'display_name', 'profile_image'],
                    }).catch(function (error) { return console.log(error); })];
            case 18:
                friend = _e.sent();
                friends_2.push(friend === null || friend === void 0 ? void 0 : friend.dataValues);
                _e.label = 19;
            case 19:
                i++;
                return [3 /*break*/, 17];
            case 20:
                sortedFriends = sort(friends_2, { by: 'display_name' });
                sortedSocials = sort(socials, { order: 'desc', by: 'createdAt' });
                res.status(200).json({
                    success: true,
                    friends: sortedFriends,
                    socials: sortedSocials,
                });
                return [3 /*break*/, 22];
            case 21:
                error_2 = _e.sent();
                console.log(error_2.response);
                res.sendStatus(500);
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    setHome: setHome,
    getSocials: getSocials,
};
