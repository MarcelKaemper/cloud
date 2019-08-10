var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

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
		let path = __dirname+"/"+files.filetoupload.name;
		mv(oldPath, path, (err) => {
			if (err) throw err;
			res.redirect('/');
		});
	});
});

module.exports = router;
