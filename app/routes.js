var express 					= require('express');
var router 						= express.Router();

// var serviceCatalog 				= 	require('../app/apiRoutes.js');

module.exports = function(app) {
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	// app.all('/*', function(req, res, next) {
	//   // CORS headers
	//   res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	//   // Set custom headers for CORS
	//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	//   if (req.method == 'OPTIONS') {
	//   	res.status(200).end();
	//   } else {
	//   	next();
	//   }
	// });
	app.use('/', require('../app/apiRoutes.js')); // load api endpoint routes
};