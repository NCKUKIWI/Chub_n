var express = require('express');
var router = express.Router();
var multer = require('multer');
var helper = require('../helper');
var fs = require("fs");

var coverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if (!fs.existsSync(`${__dirname}/../uploads/activity/${req.params.id}`)){
        //   fs.mkdirSync(`${__dirname}/../uploads/activity/${req.params.id}`);
        // }
        cb(null, `${__dirname}/../uploads/`);
    },
    filename: function (req, file, cb) {
        cb(null, "logo.png");
    }
});

var coverUpload = multer({
    storage: coverStorage
}).single("cover");

//後台首頁
router.get('/', helper.checkLoginAdmin(), function (req, res) {
    res.render('admin/main');
});

//登入頁
router.get('/login', function (req, res) {
    req.session.destroy(function (err) {
        res.render('admin/login');
    });
});

router.get('/crop', function (req, res) {
    res.render('crop');
});



router.post('/upload', function (req, res) {
    coverUpload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.send({
                error: err
            })
        } else {
            // 壓縮圖片
            // sharp(`${__dirname}/../uploads/activity/${req.params.id}/logo.png`)
            //   .resize(30)
            //   .toFile(`${__dirname}/../uploads/activity/${req.params.id}/logo_tiny.png`, function(err) {
            // });
            // activity.hasCover = 1;
            // activity.save(function(err){
            //   if(err){
            //     console.log(err);
            //     res.send({error:err});
            //   }
            //   else{
            //     res.send("ok");
            //   }
            // });
            res.send("ok");
        }
    });
})


module.exports = router;