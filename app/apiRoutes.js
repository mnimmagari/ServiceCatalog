var express 					= require('express');
var router 						= express.Router();


var serviceCatalog 				= 	require('./api/serviceCatalog.js');

//List of services for service catalog for senior mangers
router.get('/api/v1/secure/serviceCatalog', serviceCatalog.getAll);
router.get('/api/v1/secure/serviceCatalog/:id', serviceCatalog.getOneById);
router.post('/api/v1/secure/serviceCatalog', serviceCatalog.create);
router.put('/api/v1/secure/serviceCatalog/:id', serviceCatalog.updateById);
router.delete('/api/v1/secure/serviceCatalog/:id', serviceCatalog.deleteById);


module.exports = router;
