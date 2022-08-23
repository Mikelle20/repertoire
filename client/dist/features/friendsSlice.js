"use strict";
exports.__esModule = true;
exports.setFriends = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    friends: []
};
var friendSlice = (0, toolkit_1.createSlice)({
    name: 'friends',
    initialState: initialState,
    reducers: {
        setFriends: function (state, _a) {
            var payload = _a.payload;
            state.friends = payload;
        }
    }
});
exports.setFriends = friendSlice.actions.setFriends;
exports["default"] = friendSlice.reducer;
