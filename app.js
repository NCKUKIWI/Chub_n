var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var admin = require('./routes/admin');

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("secretString"));
app.use("/public", express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs-locals'));
app.use(logger('dev'));
app.use('/users', users);
app.use('/admin', admin);

/* GET home page. */
app.get('/', function(req, res) {
    res.render('landingPage', {
        title: 'Home'
    });
});

app.use(function(err, req, res, next) {
    res.status(500).send(err);
});

app.get('*', function(req, res, next) {
	res.status(404).send('Page not found');
});

app.listen( process.env.PORT || 3000);
console.log("running on port 3000");