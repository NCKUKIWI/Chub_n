var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Project = require("../models/Project");


router.get('/all', function (req, res) {
	Project.findAll().then(projects => {
		console.log(projects);
		res.send(projects);
	})
})

router.get('/:id', function (req, res) {
	var id = parseInt(req.params.id);
	Project.findById(id).then(project => {
		res.send(project);
	})
})

router.post('/update/:id', function (req, res) {
	var id = parseInt(req.params.id);
	Project.update(req.body, {
		where:{
			id: id
		}
	}).then(function(){
		res.send("更新成功");
	})
})

router.delete('/delete/:id', function (req, res) {
	var id = parseInt(req.params.id);
	Project.destroy({
		where:{
			id: id
		}
	}).then(function(){
		res.send("刪除成功");
	});
});

router.post('/add', function (req, res) {
	Project.create(req.body).then(function(project) {
		res.send(project);
	});
});

module.exports = router;