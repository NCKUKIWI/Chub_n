var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require("fs");

var coverStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (!fs.existsSync(`${__dirname}/../uploads/activity/${req.params.id}`)){
    //   fs.mkdirSync(`${__dirname}/../uploads/activity/${req.params.id}`);
    // }
    cb(null,`${__dirname}/../uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null,"logo.png");
  }
});

var coverUpload = multer({
  storage: coverStorage
}).single("cover");

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.get('/crop', function(req, res, next) {
  res.render('crop', { title: 'Express' });
});

router.post('/upload', function(req, res) {
	coverUpload(req,res,function(err){
	  if(err){
	    console.log(err);
	    res.send({error:err})
	  }else{
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
