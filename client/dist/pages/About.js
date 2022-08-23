"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable max-len */
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
function About() {
    return (react_1["default"].createElement("div", { className: "landingContainer" },
        react_1["default"].createElement("div", { className: "pageContainer" },
            react_1["default"].createElement("div", { className: "infoContainer" },
                react_1["default"].createElement("div", { className: "aboutContainer" },
                    react_1["default"].createElement("h1", { className: "aboutHeader" }, "About"),
                    react_1["default"].createElement("p", { className: "aboutParagraph" },
                        "Founded in 2022, Repertoire is an independent created social media web application oriented around music, letting users recommend and rate music to and from their friends. Striving to create a community for music fans that are seeking to build their repertoires. Repertoire was created by",
                        ' ',
                        react_1["default"].createElement(material_1.Tooltip, { title: (react_1["default"].createElement("div", { className: "toolTip" },
                                react_1["default"].createElement("div", null, "Email: mikellewade@gmail.com"),
                                react_1["default"].createElement("div", null,
                                    "My Spotify:",
                                    react_1["default"].createElement("a", { className: "link", href: "https://open.spotify.com/user/mikellewade?si=c6dc1f6dd2f64a73" }, "elle \uD83C\uDF44\uD83C\uDF52")))) },
                            react_1["default"].createElement("span", { id: "myname" }, "Mikelle")),
                        ' ',
                        "(they/them), a black and queer web developer.",
                        ' ')),
                react_1["default"].createElement("div", { className: "faqContainer" },
                    react_1["default"].createElement("h1", { className: "aboutHeader" }, "FAQs"),
                    react_1["default"].createElement("h2", { className: "faqSubHead" }, "Do I need a Spotify account?"),
                    react_1["default"].createElement("p", { className: "paragraph" }, "Yes. As of right now, the only music platform that Repertoire works with is Spotify premium accounts. I am working towards integrating Apple Music, Tidal, Amazon, and other music streaming platforms in the near future."),
                    react_1["default"].createElement("h2", { className: "faqSubHead" }, "Can I still add songs to my Repertoire playlists?"),
                    react_1["default"].createElement("p", { className: "paragraph" }, "Yes, you can. However, they will not show up on Repertoire. This is because Repertoire only tracks items added to the playlists through the website by other users."),
                    react_1["default"].createElement("h2", { className: "faqSubHead" }, "My username search isn't showing results, why?"),
                    react_1["default"].createElement("p", { className: "paragraph" }, "Spotify usernames are case sensitive. Please make sure you are entering them correctly."))))));
}
exports["default"] = About;
