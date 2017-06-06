'use strict';

var Q               = require('q');
var _ 				= require('underscore');
var model           = require('../models/fileAttachment');

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneByrefDoc = getOneByrefDoc;
service.updateByrefDoc = updateByrefDoc;
service.deleteByrefDoc = deleteByrefDoc;

module.exports = service;

function getAll(){
    var deferred = Q.defer();
	model.find(function(err, list){
		if(err) {
            console.log(err);
            deferred.reject(err);
        }
		else{
			deferred.resolve(list);
	   }
    });

	return deferred.promise;
} // getAll method ends


function getOneByrefDoc(refDoc){
    var deferred = Q.defer();
    var score = 0;

    model
        .findOne({ refDoc: refDoc })        
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends


function create(data) {
    var deferred = Q.defer();

    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function updateByrefDoc(refDoc, data) {
    var deferred = Q.defer();

    model.findOneAndUpdate({refDoc : refDoc}, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}

function deleteByrefDoc(refDoc) {
    var deferred = Q.defer();

    model.findOneAndRemove({refDoc : refDoc}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}
