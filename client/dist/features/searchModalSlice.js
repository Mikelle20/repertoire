"use strict";
var _a;
exports.__esModule = true;
exports.closeModal = exports.openModal = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    search: {},
    isOpen: false
};
var searchModalSlice = (0, toolkit_1.createSlice)({
    name: 'searchModal',
    initialState: initialState,
    reducers: {
        openModal: function (state, _a) {
            var payload = _a.payload;
            state.search = payload;
            state.isOpen = true;
        },
        closeModal: function (state) {
            state.search = {};
            state.isOpen = false;
        }
    }
});
exports.openModal = (_a = searchModalSlice.actions, _a.openModal), exports.closeModal = _a.closeModal;
exports["default"] = searchModalSlice.reducer;
