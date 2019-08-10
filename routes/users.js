var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render("users", {"title":"cloud"});
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
