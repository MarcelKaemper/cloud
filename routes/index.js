var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var path = require('path');
var fs = require('fs');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.loggedIn){
		let filePath = path.resolve(__dirname, "../data");
		fs.readdir(filePath,(err, files)=>{
			if (err) throw err;
			console.log(files)
			res.render('index', { title: 'Cloud', user: req.session.user, files:files});
		});
	}else{
		res.redirect('/login');
	}
});

router.post("/download", (req,res,next) =>{
	res.download(path.resolve(__dirname,"../data/"+req.body.name));
});

router.post("/delete", (req,res,next)=>{
	fs.unlink(path.resolve(__dirname, "../data/"+req.body.name),()=>{
		res.redirect("/");
	});
});

router.post("/upload", (req,res,next) => {
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		let oldPath = files.filetoupload.path;
		let newPath = path.resolve(__dirname,"../data/"+files.filetoupload.name);
		mv(oldPath, newPath, (err) => {
			if (err) throw (err);
			res.redirect('/');
		});
	});
});

module.exports = router;
