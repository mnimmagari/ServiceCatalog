var express 					= require('express');
var router 						= express.Router();


var serviceCatalog 				= 	require('./api/serviceCatalog.js');
var fileAttachRef					= require('./api/fileAttachment');

//List of services for service catalog for senior mangers
router.get('/api/v1/secure/serviceCatalog', serviceCatalog.getAll);
router.get('/api/v1/secure/serviceCatalog/:id', serviceCatalog.getOneById);
router.post('/api/v1/secure/serviceCatalog', serviceCatalog.create);
router.put('/api/v1/secure/serviceCatalog/:id', serviceCatalog.updateById);
router.delete('/api/v1/secure/serviceCatalog/:id', serviceCatalog.deleteById);

// List of services for file Attachment References
router.get('/api/v1/secure/fileAttachRef', fileAttachRef.getAll);
router.get('/api/v1/secure/fileAttachRef/:refDoc', fileAttachRef.getOneByrefDoc);
router.post('/api/v1/secure/fileAttachRef/:refDoc', fileAttachRef.create);
router.put('/api/v1/secure/fileAttachRef/:refDoc', fileAttachRef.updateByrefDoc);
router.delete('/api/v1/secure/fileAttachRef/:refDoc', fileAttachRef.deleteByrefDoc);

module.exports = router;
