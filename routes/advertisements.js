var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var rimraf = require('rimraf');
var bcrypt = require('bcrypt');
var Advertisement = require("../models/Advertisement");

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/advertisement/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/advertisement/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/advertisement/${req.params.id}/image.png`)) {
            rimraf.sync(`${__dirname}/../uploads/advertisement/${req.params.id}/image.png`);
        }
        cb(null, `${__dirname}/../uploads/advertisement/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "image.png");
    }
});

var imageUpload = multer({
    storage: imageStorage
}).single("image");

router.get('/', function (req, res) {
    Advertisement.findAll().then(ad => {
        res.send(ad);
    });
});

router.post('/', function (req, res) {
    Advertisement.create(req.body).then(function (ad) {
        res.send(ad);
    });
});

// router.get('/:id', function (req, res) {
//     var id = parseInt(req.params.id);
//     Advertisement.findById(id).then(ad => {
//         res.send(ad);
//     })
// })

router.post('/update/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Advertisement.update(req.body, {
        where: {
            id: id
        }
    }).then(function () {
        res.send("更新成功");
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Advertisement.destroy({
        where: {
            id: id
        }
    }).then(function () {
        rimraf.sync(`${__dirname}/../uploads/advertisement/${req.params.id}`);
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
            Advertisement.update({
                image: 1
            }, {
                where: {
                    id: id
                }
            }).then(function () {
                res.send("ok");
            });
        }
    });
});

module.exports = router;