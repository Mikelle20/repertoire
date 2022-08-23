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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('express'), Request = _a.Request, Response = _a.Response;
var AxiosResponse = require('axios').AxiosResponse;
var axios = require('axios').default;
var getAccessToken = require('../helpers/auth').getAccessToken;
var ratingAvg = require('../helpers/rating').ratingAvg;
var stripPlaylists = require('../helpers/suggestion').stripPlaylists;
var db = require('../models');
var search = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search_1, user, arr, accessToken, endPoint, bearer, headers, url, tracks_2, _i, tracks_1, element, track, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                search_1 = req.body.search;
                user = req.user;
                arr = [];
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 1:
                accessToken = _a.sent();
                endPoint = 'https://api.spotify.com/v1/search?q=';
                bearer = "Bearer ".concat(accessToken);
                headers = {
                    Accept: 'application/json',
                    Authorization: bearer,
                    'Content-Type': 'application/json',
                };
                url = "".concat(endPoint, "track%3A").concat(search_1, "&type=track&market=ES&limit=10");
                return [4 /*yield*/, axios.get(url, { headers: headers }).then(function (resp) {
                        tracks_2 = resp.data.tracks.items;
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                _a.sent();
                for (_i = 0, tracks_1 = tracks_2; _i < tracks_1.length; _i++) {
                    element = tracks_1[_i];
                    track = {
                        title: element.name,
                        cover: element.album.images[0].url,
                        artist: element.artists[0].name,
                        explicit: element.explicit,
                        songId: element.id,
                    };
                    arr.push(track);
                }
                res.status(200).json(arr);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var suggest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, friend_id, song_id, playlist_id, user, accessToken, bearer, headers, url, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, friend_id = _a.friend_id, song_id = _a.song_id, playlist_id = _a.playlist_id;
                user = req.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db.Suggestion.create({
                        song_id: song_id,
                        playlist_id: playlist_id,
                        sender_id: user.user_id,
                        receiver_id: friend_id,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, getAccessToken(friend_id)];
            case 3:
                accessToken = _b.sent();
                bearer = "Bearer ".concat(accessToken);
                headers = {
                    Accept: 'application/json',
                    Authorization: bearer,
                    'Content-Type': 'application/json',
                };
                url = "https://api.spotify.com/v1/playlists/".concat(playlist_id, "/tracks?uris=spotify%3Atrack%3A").concat(song_id);
                return [4 /*yield*/, axios.post(url, null, { headers: headers }).catch(function (error) { return console.log(error); })];
            case 4:
                _b.sent();
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2.response);
                res.status(500).json({
                    success: false,
                    error: 'Something went wrong server side.',
                });
                db.Suggestion.destroy({
                    where: {
                        song_id: song_id,
                        playlist_id: playlist_id,
                        sender_id: user.user_id,
                        receiver_id: friend_id,
                    },
                }).catch(function (error) { return console.log(error); });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var rate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, receiverId, songId, playlistId, user, ratingExist, ratings, ratingSum, newRating, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, receiverId = _a.receiverId, songId = _a.songId, playlistId = _a.playlistId;
                user = req.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, db.Rating.findOne({
                        where: {
                            sender_id: user.user_id,
                            reciever_id: receiverId,
                            playlist_id: playlistId,
                            song_id: songId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 2:
                ratingExist = _b.sent();
                if (!ratingExist) return [3 /*break*/, 4];
                return [4 /*yield*/, db.Rating.update({
                        rating: rating,
                    }, {
                        where: {
                            sender_id: user.user_id,
                            reciever_id: receiverId,
                            playlist_id: playlistId,
                            song_id: songId,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, db.Rating.create({
                    sender_id: user.user_id,
                    reciever_id: receiverId,
                    song_id: songId,
                    playlist_id: playlistId,
                    rating: rating,
                }).catch(function (error) { return console.log(error); })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, db.Rating.findAll({
                    where: {
                        reciever_id: receiverId,
                    },
                    attributes: ['rating'],
                }).catch(function (error) { return console.log(error); })];
            case 7:
                ratings = _b.sent();
                ratingSum = ratings.reduce(function (accumulator, object) { return accumulator + object.rating; }, 0);
                newRating = ratingAvg(ratingSum, ratings.length);
                return [4 /*yield*/, db.User.update({ rating: newRating }, {
                        where: { user_id: receiverId },
                    }).catch(function (error) { return console.log(error); })];
            case 8:
                _b.sent();
                res.status(200).json({
                    success: true,
                });
                return [3 /*break*/, 10];
            case 9:
                error_3 = _b.sent();
                console.log(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var getAccessedPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friend, user, playlistsAccessed, accessToken, headers_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                friend = req.body.friend;
                user = req.user;
                playlistsAccessed = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getAccessToken(friend)];
            case 2:
                accessToken = _a.sent();
                headers_1 = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                return [4 /*yield*/, db.PlaylistAccess.findAll({
                        attributes: ['playlist_id'],
                        where: {
                            user_id: friend,
                            friend_id: user.user_id,
                        },
                    }).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, stripPlaylists(resp, headers_1)];
                                case 1:
                                    playlistsAccessed = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (error) { return console.log(error); })];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.Playlist.findAll({
                        attributes: ['playlist_id'],
                        where: {
                            author_id: friend,
                            is_private: false,
                        },
                    }).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                        var otherPlaylists;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, stripPlaylists(resp, headers_1)];
                                case 1:
                                    otherPlaylists = _a.sent();
                                    playlistsAccessed = __spreadArray(__spreadArray([], playlistsAccessed, true), otherPlaylists, true);
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (error) { return console.log(error); })];
            case 4:
                _a.sent();
                res.status(200).send(playlistsAccessed);
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getSuggestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, user, arr, accessToken, headers, suggestions, _loop_1, i, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playlistId = req.body.playlistId;
                user = req.user;
                arr = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, getAccessToken(user.user_id)];
            case 2:
                accessToken = _a.sent();
                headers = {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(accessToken),
                };
                return [4 /*yield*/, db.Suggestion.findAll({
                        attributes: ['song_id', 'sender_id'],
                        where: {
                            playlist_id: playlistId,
                            receiver_id: user.user_id,
                        },
                    }).catch(function (error) { return console.log(error); })];
            case 3:
                suggestions = _a.sent();
                _loop_1 = function (i) {
                    var sender, song, rating;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, db.User.findOne({
                                    attributes: ['display_name', 'profile_image'],
                                    where: {
                                        user_id: suggestions[i].dataValues.sender_id,
                                    },
                                }).catch(function (error) { return console.log(error); })];
                            case 1:
                                sender = _b.sent();
                                return [4 /*yield*/, axios({
                                        method: 'GET',
                                        url: "https://api.spotify.com/v1/tracks/".concat(suggestions[i].dataValues.song_id),
                                        headers: headers,
                                    }).then(function (resp) {
                                        song = resp.data;
                                    }).catch(function (error) { return console.log(error); })];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, db.Rating.findOne({
                                        attributes: ['rating'],
                                        where: {
                                            playlist_id: playlistId,
                                            song_id: suggestions[i].dataValues.song_id,
                                            sender_id: user.user_id,
                                            reciever_id: suggestions[i].dataValues.sender_id,
                                        },
                                    }).catch(function (error) { return console.log(error); })];
                            case 3:
                                rating = _b.sent();
                                arr.push({
                                    songId: suggestions[i].dataValues.song_id,
                                    senderId: suggestions[i].dataValues.sender_id,
                                    senderImage: sender.dataValues.profile_image,
                                    senderName: sender.dataValues.display_name,
                                    songName: song.name,
                                    songImage: song.album.images[0].url,
                                    rating: rating ? rating.dataValues.rating : 0,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < suggestions.length)) return [3 /*break*/, 7];
                return [5 /*yield**/, _loop_1(i)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                res.status(200).send(arr);
                return [3 /*break*/, 9];
            case 8:
                error_5 = _a.sent();
                console.log(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    search: search,
    suggest: suggest,
    rate: rate,
    getAccessedPlaylists: getAccessedPlaylists,
    getSuggestions: getSuggestions,
};
