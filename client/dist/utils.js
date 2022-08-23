"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.axiosAuth = void 0;
/* eslint-disable import/prefer-default-export */
var axios_1 = __importDefault(require("axios"));
var accessToken = window.sessionStorage.getItem('accessToken');
exports.axiosAuth = axios_1["default"].create({
    baseURL: 'https://repertoireapp.herokuapp.com/authorize',
    headers: { Authorization: "Bearer ".concat(accessToken) }
});
