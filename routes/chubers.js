var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var rimraf = require('rimraf');
var bcrypt = require('bcrypt');
var Chuber = require("../models/Chuber");

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/chuber/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/chuber/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/chuber/${req.params.id}/image.png`)) {
            rimraf.sync(`${__dirname}/../uploads/chuber/${req.params.id}/image.png`);
        }
        cb(null, `${__dirname}/../uploads/chuber/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "image.png");
    }
});

var imageUpload = multer({
    storage: imageStorage
}).single("image");

router.get('/', function (req, res) {
    Chuber.findAll().then(chubers => {
        res.send(chubers);
    });
});

router.post('/', function (req, res) {
		console.log(req.body);
    Chuber.create(req.body).then(function (chuber) {
        res.send(chuber);
    });
});

// router.get('/:id', function (req, res) {
//     var id = parseInt(req.params.id);
//     Project.findById(id).then(project => {
//         res.send(project);
//     })
// })

router.post('/update/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Chuber.update(req.body, {
        where: {
            id: id
        }
    }).then(function () {
        res.send("更新成功");
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Chuber.destroy({
        where: {
            id: id
        }
    }).then(function () {
        rimraf.sync(`${__dirname}/../uploads/chuber/${req.params.id}`);
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
            Chuber.update({
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