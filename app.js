var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require("./models/User");

//設定ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs-locals'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//設定 cookie 與 session 時間
app.use(cookieParser("chub"));
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 6
    },
    resave: true,
    secret: "chub",
    saveUninitialized: true
}));

//設定靜態資源
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(logger('dev'));

app.use(function (req, res, next) {
    console.log(req.session);
    if (req.session.isLogin) {
        User.findOne({
            where: {
                id: req.session.userid
            }
        }).then(function (user) {
            req.user = user;
            next();
        });
    } else {
        next();
    }
});

//error handle
app.use(function (err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
});

app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/projects', require('./routes/projects'));
app.use('/banners', require('./routes/banners'));
app.use('/chubers', require('./routes/chubers'));
app.use('/space', require('./routes/space'));

app.get('/', function (req, res) {
    res.render('landingPage', {
        title: 'Home'
    });
});

app.get('*', function (req, res, next) {
    res.status(404).send('Page not found');
});

app.listen(process.env.PORT || 8000);
console.log("running on port 8000");