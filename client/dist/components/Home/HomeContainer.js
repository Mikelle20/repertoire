"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
var react_1 = __importDefault(require("react"));
var toolkit_1 = require("@reduxjs/toolkit");
var SocialItem_1 = __importDefault(require("./SocialItem"));
var SideItem_1 = __importDefault(require("./SideItem"));
var SuggestionItem_1 = __importDefault(require("./SuggestionItem"));
var PlaylistItem_1 = __importDefault(require("./PlaylistItem"));
var PlaylistFriend_1 = __importDefault(require("../Playlists/PlaylistFriend"));
var RecentItem_1 = __importDefault(require("./RecentItem"));
var TrackItems_1 = __importDefault(require("./TrackItems"));
function HomeContainer(props) {
    var data = props.data, socials = props.socials;
    console.log(socials);
    var time = new Date();
    var hours = time.getHours();
    var greeting;
    if (hours > 4 && hours < 12)
        greeting = 'Morning';
    if (hours >= 12 && hours < 18)
        greeting = 'Afternoon';
    if (hours <= 4 || hours >= 18)
        greeting = 'Evening';
    var artists = data.items.map(function (artist) { return (react_1["default"].createElement(SideItem_1["default"], { artist: artist, key: artist.id })); });
    var suggestions = data.homeSuggestions.map(function (suggestion) { return react_1["default"].createElement(SuggestionItem_1["default"], { key: (0, toolkit_1.nanoid)(), suggestion: suggestion }); });
    var listens = data.friendListens.map(function (listen) { return react_1["default"].createElement(RecentItem_1["default"], { key: (0, toolkit_1.nanoid)(), listen: listen }); });
    var playlists = data.homePlaylists.map(function (playlist) { return react_1["default"].createElement(PlaylistItem_1["default"], { key: (0, toolkit_1.nanoid)(), playlist: playlist }); });
    var socialItems = socials.socials.map(function (social) { return react_1["default"].createElement(SocialItem_1["default"], { key: (0, toolkit_1.nanoid)(), social: social }); });
    var friendIcons = socials.friends.map(function (friend) { return react_1["default"].createElement(PlaylistFriend_1["default"], { key: (0, toolkit_1.nanoid)(), friend: friend }); });
    var tracks = data.tracks.map(function (track) { return react_1["default"].createElement(TrackItems_1["default"], { key: (0, toolkit_1.nanoid)(), track: track }); });
    return (react_1["default"].createElement("div", { className: "homeContainer" },
        react_1["default"].createElement("div", { className: "leftHome" },
            react_1["default"].createElement("h1", { className: "homeTitle" },
                react_1["default"].createElement("img", { alt: data.user.display_name, src: data.user.profile_image, className: "profilePic" }),
                "Good",
                ' ',
                greeting,
                ",",
                ' ',
                data.user.display_name),
            react_1["default"].createElement("h2", { className: "homeHeader" }, "Your top artist"),
            react_1["default"].createElement("div", { className: "sideScrollDiv" }, artists.length !== 0 ? artists : react_1["default"].createElement("div", { className: "empty" }, "No Top Artists!")),
            react_1["default"].createElement("h2", { className: "homeHeader" }, "Your top tracks"),
            react_1["default"].createElement("div", { className: "sideScrollDiv" }, tracks.length !== 0 ? tracks : react_1["default"].createElement("div", { className: "empty" }, "No Top Tracks!")),
            react_1["default"].createElement("h1", { className: "homeHeader" }, "Suggestions from friends"),
            react_1["default"].createElement("div", { className: "sideScrollDiv" }, suggestions.length !== 0 ? suggestions : react_1["default"].createElement("div", { className: "empty" }, "No Suggestions!")),
            react_1["default"].createElement("h2", { className: "homeHeader" }, "Your playlists"),
            react_1["default"].createElement("div", { className: "sideScrollDiv" }, playlists.length !== 0 ? playlists : react_1["default"].createElement("div", { className: "empty" }, "No Playlists!")),
            react_1["default"].createElement("h2", { className: "homeHeader" }, "What friends are listening to"),
            react_1["default"].createElement("div", { className: "sideScrollDiv" }, listens.length !== 0 ? listens : react_1["default"].createElement("div", { className: "empty" }, "No Friends!"))),
        react_1["default"].createElement("div", { className: "rightHome" },
            react_1["default"].createElement("div", { className: "ratingContainer" },
                react_1["default"].createElement("h2", { className: "homeHeader" },
                    "Your Rating:",
                    ' ',
                    data.user.rating.toFixed(2))),
            react_1["default"].createElement("div", { className: "socialDiv" }, socialItems.length !== 0 ? socialItems : react_1["default"].createElement("div", { className: "emptySocials" }, "No Socials")),
            react_1["default"].createElement("div", { className: "ratingContainer" },
                react_1["default"].createElement("h2", { className: "homeHeader" }, "Your Friends")),
            react_1["default"].createElement("div", { className: "friendsHomeContainer" }, friendIcons.length === 0 ? react_1["default"].createElement("div", { className: "emptySocials" }, "No Friends") : friendIcons))));
}
exports["default"] = HomeContainer;
