var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var rimraf = require('rimraf');
var bcrypt = require('bcrypt');
var Project = require("../models/Project");
var Image = require("../models/Image");

var coverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    	if (!fs.existsSync(`${__dirname}/../uploads/project`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project`);
        }
        if (!fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project/${req.params.id}`);
        }
        if (fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}/cover.png`)) {
            rimraf.sync(`${__dirname}/../uploads/project/${req.params.id}/cover.png`);
        }
        cb(null, `${__dirname}/../uploads/project/${req.params.id}`);
    },
    filename: function (req, file, cb) {
        cb(null, "cover.png");
    }
});

var coverUpload = multer({
    storage: coverStorage
}).single("cover");

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    	if (!fs.existsSync(`${__dirname}/../uploads/project`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project`);
        }
        if (!fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project/${req.params.id}`);
        }
        if (!fs.existsSync(`${__dirname}/../uploads/project/${req.params.id}/${req.params.type}`)) {
            fs.mkdirSync(`${__dirname}/../uploads/project/${req.params.id}/${req.params.type}`);
        }
        cb(null, `${__dirname}/../uploads/project/${req.params.id}/${req.params.type}`);
    },
    filename: function (req, file, cb) {
    	var filename = req.params.type;
    	if (req.params.type == "gallery" || req.params.type == 'gallerypreview') {
        	filename = new Date().getTime();
    	}

        cb(null, filename + ".jpg");
    }
});

var imageUpload = multer({
    storage: imageStorage
}).single("image");

router.get('/', function (req, res) {
    Project.findAll().then(projects => {
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
        Image.findAll({
            where: {
                project_id: id,
            }
        }).then(images => {
            project["galleryPreview"] = [];
            project["gallery"] = [];
            project["cover"] = [];
            project["coverPreview"] = [];
            for (var i in images) {
                if (images[i].type == "cover") {
                    project["cover"].push(images[i]);
                } else if (images[i].type == "coverpreview") {
                    project["coverPreview"].push(images[i]);
                } else if (images[i].type == "gallery") {
                    project["gallery"].push(images[i]);
                } else if (images[i].type == "gallerypreview") {
                    project["galleryPreview"].push(images[i]);
                }
            }
            res.send(project);
        });
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
    });
});

router.post('/image/:type/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var type = req.params.type;
    imageUpload(req, res, function (err) {
        if (err) {
            res.send({
                error: err
            });
        } else {
            Image.create({
                "project_id": id,
                "name": req.file.filename,
                "type": type
            }).then(function (image) {
                res.send({
                    "result":"ok",
                    "images": image
                });
            });
        }
    });
});

router.delete('/image/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Image.findById(id).then(img => {
        console.log(img);
        Image.destroy({
            where: {
                id: id
            }
        }).then(function () {
            rimraf.sync(`${__dirname}/../uploads/project/${img.project_id}/${img.type}/${img.name}`);
            res.send("刪除成功");
        });
    });
});

router.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    Project.destroy({
        where: {
            id: id
        }
    }).then(function () {
        Image.destroy({
            where: {
                project_id: id
            }
        }).then(function () {
            rimraf.sync(`${__dirname}/../uploads/project/${id}`);
            res.send("刪除成功");
        });
    });
});

module.exports = router;