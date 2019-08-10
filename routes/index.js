var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var path = require('path');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.loggedIn){
		res.render('index', { title: 'Cloud', user: req.session.user});
	}else{
		res.redirect('/login');
	}
});

router.post("/upload", (req,res,next) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		let oldPath = files.filetoupload.path;
		let newPath = path.resolve(__dirname,"../data/"+files.filetoupload.name);
		mv(oldPath, newPath, (err) => {
			if (err) throw (err);
			res.redirect('/');
		});
	});
});

module.exports = router;
