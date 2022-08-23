var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var auth = require('./routes/auth');
var suggestion = require('./routes/suggestion');
var home = require('./routes/home');
var friends = require('./routes/friends');
var playlist = require('./routes/playlist');
var corsOptions = require('./corsOptions/config').corsOptions;
require('dotenv').config();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.use('/authorize', auth);
app.use('/suggestion', suggestion);
app.use('/home', home);
app.use('/friends', friends);
app.use('/playlist', playlist);
// if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use('/static', express.static(path.join(__dirname, 'client/public')))
//   // Express serve up index.html file if it doesn't recognize route
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client', 'public', 'index.html'));
//   });
// }
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("listening on port: ".concat(PORT));
});
