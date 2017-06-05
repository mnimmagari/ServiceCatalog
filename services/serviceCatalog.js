'use strict';

var Q               = require('q');
var _ 				= require('underscore');
var model           = require('../models/serviceCatalog.js');

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;
service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;


module.exports = service;

function getAll(){
       var deferred = Q.defer();

    model.find(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            deferred.resolve(list);
    });
	return deferred.promise;
} // getAll method ends

function getOneById(id){
    var deferred = Q.defer();

    model
        .findOne({ _id: id })        
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                console.log(item);
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends

function create(data) {
    var deferred = Q.defer();

    console.log("Saving Group........");
    console.log(data);
    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve(doc);
            // if(doc!=null){
            //     emailController.ticketCreation(doc._id);
            // }
        }
    });

    return deferred.promise;
}


function updateById(id, data) {
    console.log("update")
    console.log(data);
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
    console.log(" inside else update")
            console.log(doc)
            deferred.resolve(doc);
            // if(doc!=null){
            //    emailController.ticketStatusForUser(doc._id);
            // }
        }
    });

    return deferred.promise;

}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}