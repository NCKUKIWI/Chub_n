var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var rimraf = require('rimraf');
var bcrypt = require('bcrypt');
var Project = require("../models/Project");
var Image = require("../models/Image");

var bannerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}/banner.png`)) {
            rimraf.sync(`${__dirname}/../uploads/project/${req.params.id}/banner.png`);
        }
        cb(null, `${__dirname}/../uploads/project/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "banner.png");
    }
});

var bannerUpload = multer({
    storage: bannerStorage
}).single("banner");

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project/${req.params.id}`);
        }
        cb(null, `${__dirname}/../uploads/project/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        var timestamp = new Date().getTime();
        cb(null, timestamp + ".jpg");
    }
});

var imageUpload = multer({
    storage: imageStorage
}).single("image");

router.get('/', function (req, res) {
    Project.findAll().then(projects => {
        console.log(projects);
        res.send(projects);
    });
});

router.post('/', function (req, res) {
    Project.create(req.body).then(function (project) {
        res.send(project);
    });
});

router.get('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Project.findById(id).then(project => {
        res.send(project);
    })
})

router.post('/update/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Project.update(req.body, {
        where: {
            id: id
        }
    }).then(function () {
        res.send("更新成功");
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Project.destroy({
        where: {
            id: id
        }
    }).then(function () {
        rimraf.sync(`${__dirname}/../uploads/project/${req.params.id}`);
        res.send("刪除成功");
    });
});

router.post('/banner/:id', function (req, res) {
    var id = parseInt(req.params.id);
    bannerUpload(req, res, function (err) {
        if (err) {
            res.send({
                error: err
            });
        } else {
            Project.update({
                banner: 1
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

router.post('/image/:id', function (req, res) {
    var id = parseInt(req.params.id);
    imageUpload(req, res, function (err) {
        if (err) {
            res.send({
                error: err
            });
        } else {
            Image.create({
                "project_id": id,
                "name": req.file.filename
            }).then(function (image) {
                res.send(image);
            });
        }
    });
});

module.exports = router;