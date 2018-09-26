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
	var project_id = parseInt(req.params.id);
	Project.findById(project_id).then(project => {
		res.send(project);
	})
})

router.post('/update/:id', function (req, res) {
	var project_id = parseInt(req.params.id);
	Project.update(req.body, {
		where:{
			id: project_id
		}
	}).then(function(){
		res.send("更新成功");
	})
})

router.get('/delete/:id', function (req, res) {
	var project_id = parseInt(req.params.id);
	Project.destroy({
		where:{
			id: project_id
		}
	}).then(function(){
		res.send("刪除成功");
	})
	// Project.findById(project_id).then(item => {
	// 	item.destroy();
	// 	res.send("刪除成功");
	// })
})

router.post('/add', function (req, res) {
	Project.create(req.body).then(function(new_project) {
		res.send(new_project);
	})
})

module.exports = router;