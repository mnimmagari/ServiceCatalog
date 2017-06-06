var express 					= require('express');
var router 						= express.Router();


module.exports = function(app) {
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.use('/', require('../app/apiRoutes.js')); // load api endpoint routes
};