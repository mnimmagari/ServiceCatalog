'use strict';

var dataService     = require('../../services/fileAttachment');

var controller = {}

controller.getAll     = getAll;
controller.create     = create;

controller.getOneByrefDoc = getOneByrefDoc;
controller.updateByrefDoc = updateByrefDoc;
controller.deleteByrefDoc = deleteByrefDoc;

module.exports = controller;

function getAll(req,res){
  dataService.getAll()
    .then(function(userList){
        if (userList){
            res.send(userList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getOneByrefDoc(req,res){
  dataService.getOneByrefDoc(req.params.refDoc)
    .then(function(userList){
        if (userList){
            res.send(userList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function create(req, res) {
  dataService.create(req.body)
    .then(function () {
        res.status(200).send("Doc added successfully");
    })
    .catch(function (err) {
        console.log("cntrl create: err - " + err);
        res.status(500).send(err);
    });
}

function deleteByrefDoc(req, res) {
  dataService.deleteByrefDoc(req.params.refDoc)
    .then(function () {
        res.status(200).send("Doc deleted successfully");
    })
    .catch(function (err) {
        console.log("controller delete err: " + err);
        res.status(500).send(err);
    });
}

function updateByrefDoc(req, res) {
  dataService.updateByrefDoc(req.params.refDoc, req.body)
    .then(function () {
        res.status(200).send("Doc updated successfully");
    }) 
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}
