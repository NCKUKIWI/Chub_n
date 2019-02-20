var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var rimraf = require('rimraf');
var bcrypt = require('bcrypt');
var Banner = require("../models/Banner");

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/banner`)) {
            fs.mkdirSync(`${__dirname}/../uploads/banner`);
        }
        if (!fs.existsSync(`${__dirname}/../uploads/banner/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/banner/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/banner/${req.params.id}/image.png`)) {
            rimraf.sync(`${__dirname}/../uploads/banner/${req.params.id}/image.png`);
        }
        cb(null, `${__dirname}/../uploads/banner/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "image.png");
    }
});

var imageUpload = multer({
    storage: imageStorage
}).single("image");

var imageMobileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/banner`)) {
            fs.mkdirSync(`${__dirname}/../uploads/banner`);
        }
        if (!fs.existsSync(`${__dirname}/../uploads/banner/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/banner/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/banner/${req.params.id}/imageMobile.png`)) {
            rimraf.sync(`${__dirname}/../uploads/banner/${req.params.id}/imageMobile.png`);
        }
        cb(null, `${__dirname}/../uploads/banner/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "imageMobile.png");
    }
});

var imageMobileUpload = multer({
    storage: imageMobileStorage
}).single("imageMobile");

router.get('/', function (req, res) {
    Banner.findAll().then(ad => {
        res.send(ad);
    });
});

router.post('/', function (req, res) {
    Banner.create(req.body).then(function (ad) {
        res.send(ad);
    });
});

// router.get('/:id', function (req, res) {
//     var id = parseInt(req.params.id);
//     Banner.findById(id).then(ad => {
//         res.send(ad);
//     })
// })

router.post('/update/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Banner.update(req.body, {
        where: {
            id: id
        }
    }).then(function () {
        res.send("更新成功");
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Banner.destroy({
        where: {
            id: id
        }
    }).then(function () {
        rimraf.sync(`${__dirname}/../uploads/banner/${req.params.id}`);
        res.send("刪除成功");
    });
});

router.post('/image/:id', function (req, res) {
    var id = parseInt(req.params.id);
    imageUpload(req, res, function(err){
        if (err) {
            console.log(err);
            res.send({error:err})
        } else {
        	res.send("ok");
        }
    });
});

router.post('/imageMobile/:id', function (req, res) {
    var id = parseInt(req.params.id);
    imageMobileUpload(req, res, function(err){
        if (err) {
            console.log(err);
            res.send({error:err})
        } else {
			res.send("ok");
        }
    });
});

module.exports = router;