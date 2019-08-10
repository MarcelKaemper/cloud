var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var path = require("path");

var dbFile = path.resolve(__dirname,"../database/users.db");
var db = new sqlite3.Database(dbFile);


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("login", {title:"Login"});
});

router.post('/login', (req, res, next) => {
	db.get("select * from login_data where username='"+req.body.username+"';",(err, row) => {
		if(req.body.password == row.password){
			req.session.loggedIn = true;
			req.session.user = row.username.charAt(0).toUpperCase() + row.username.slice(1);
			res.redirect("/");
		}
	});
});

module.exports = router;
