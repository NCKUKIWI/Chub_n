var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require("../models/User");

//註冊
router.post("/", function(req, res) {
    User.findOne({ where: { username: req.body.username } }).then(function(user) {
		if (user) {
            res.send("帳號已有人使用");
        } else {
            bcrypt.hash(req.body.password, 5, function(err, hash) {
                req.body.password = hash;
                User.create(req.body).then(function(result) {
                    res.send("ok");
                }).catch(function(err) {
                    res.send(handleError(err));
                });
            });
        }
	});
});

//登入驗證
router.post("/auth", function(req, res) {
	User.findOne({ where: { username: req.body.username } }).then(function(user) {
		if (user) {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (result == true) {
                    req.session.isLogin = 1;
                    req.session.userid = user.id;
                    res.send("ok");
				} else {
					res.send("密碼錯誤");
				}
			});
		} else {
			res.send("找不到用戶");
		}
	});
});

//登出
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect("/admin/login");
    });
});

function handleError(err) {
	var errmsg = [];
	for (var i in err.errors) {
		errmsg.push(err.errors[i].message);
	}
	return errmsg;
}

module.exports = router;
