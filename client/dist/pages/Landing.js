"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable global-require */
/* eslint-disable no-trailing-spaces */
var react_1 = __importDefault(require("react"));
var framer_motion_1 = require("framer-motion");
function Landing() {
    var variants = {
        visibleY: {
            y: 0,
            transition: {
                delay: 0.7,
                type: 'spring',
                damping: 15
            }
        },
        fade1: {
            opacity: 0,
            transition: {
                repeat: Infinity,
                delay: 7,
                duration: 10,
                repeatDelay: 34,
                repeatType: 'reverse'
            }
        },
        fade2: {
            opacity: 0,
            transition: {
                repeat: Infinity,
                delay: 24,
                duration: 10,
                repeatDelay: 7,
                repeatType: 'reverse'
            }
        },
        fade3: {
            opacity: 0,
            transition: {
                repeat: Infinity,
                delay: 41,
                duration: 10,
                repeatDelay: 7,
                repeatType: 'reverse'
            }
        },
        fadeOut: {
            opacity: 1,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 7,
                duration: 10,
                repeatDelay: 7
            }
        },
        fadeIn: {
            opacity: 0,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 7,
                duration: 10,
                repeatDelay: 7
            }
        },
        fadeIn2: {
            opacity: 0,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 7,
                duration: 10,
                repeatDelay: 7
            }
        }
    };
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: "landerContainer" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h1", { className: "landingTitle" },
                react_1["default"].createElement("img", { className: "logo", alt: "", src: require('../assets/logos/listening-music.png') }),
                "Repertoire")),
        react_1["default"].createElement(framer_motion_1.motion.div, { className: "contentContainer", initial: { y: -1000 }, variants: variants, animate: "visibleY" },
            react_1["default"].createElement("div", { className: "landingAlbums" },
                react_1["default"].createElement("div", { className: "landingAlbum1" },
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 0 }, animate: "fadeOut", src: require('../assets/landingImgs/caprisongs.jpeg'), alt: "fka twigs", className: "albumImg" }),
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 1 }, animate: "fadeIn", src: require('../assets/landingImgs/janet.jpeg'), className: "albumImg2" })),
                react_1["default"].createElement("div", { className: "landingAlbum2" },
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 0 }, animate: "fadeOut", src: require('../assets/landingImgs/phantasies.jpeg'), className: "albumImg" }),
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 1 }, animate: "fadeIn", src: require('../assets/landingImgs/dance_fever.jpeg'), className: "albumImg2" })),
                react_1["default"].createElement("div", { className: "landingAlbum3" },
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 0 }, animate: "fadeOut", src: require('../assets/landingImgs/small-things.jpeg'), className: "albumImg" }),
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 1 }, animate: "fadeIn", src: require('../assets/landingImgs/deacon.jpeg'), className: "albumImg2" })),
                react_1["default"].createElement("div", { className: "landingAlbum4" },
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 0 }, animate: "fadeOut", src: require('../assets/landingImgs/james_blake.jpeg'), className: "albumImg" }),
                    react_1["default"].createElement(framer_motion_1.motion.img, { variants: variants, initial: { opacity: 1 }, animate: "fadeIn", src: require('../assets/landingImgs/jubilee.jpeg'), className: "albumImg2" }))),
            react_1["default"].createElement("div", { className: "landingBreaker" }),
            react_1["default"].createElement("div", { className: "breakerRight" },
                react_1["default"].createElement("h2", { className: "landingHeader" }, "Music Recommendation Made Easy."),
                react_1["default"].createElement("h3", { className: "landingText" }, "Recommend, rate, and discuss the music you and your friends are currently listening to."),
                react_1["default"].createElement(framer_motion_1.motion.button, { className: "signIn", whileTap: { scale: 0.9 }, onClick: function () { window.location.href = '/login'; } },
                    react_1["default"].createElement("p", null, "Sign In"))))));
}
exports["default"] = Landing;
