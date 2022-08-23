"use strict";
exports.__esModule = true;
exports.setError = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    error: {
        isError: false,
        error: '(500) Internal Server Error.'
    }
};
var errorSlice = (0, toolkit_1.createSlice)({
    name: 'error',
    initialState: initialState,
    reducers: {
        setError: function (state, _a) {
            var payload = _a.payload;
            state.error.isError = payload;
        }
    }
});
exports.setError = errorSlice.actions.setError;
exports["default"] = errorSlice.reducer;
