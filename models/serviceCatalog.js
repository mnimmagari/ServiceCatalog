'use strict';

var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var serviceCatalogSchema = new mongoose.Schema({
	
	title					: { type: String, trim: true },
	description				: { type: String, trim: true },
    // sizing				    : { type: String, trim: true, enum: ['small', 'medium', 'large']},
    small					:{
    turnaround				: { type: String, trim: true },
    price                   : { type: Number},
    },
    medium					:{
    turnaround				: { type: String, trim: true },
    price                   : { type: Number},
    },
    large					:{
    turnaround				: { type: String, trim: true },
    price                   : { type: Number},
    },
    // turnaround				: [{ type: String, trim: true }],
    // price                   : [{ type: Number}],
    category				: { type: String, trim: true, enum: ['Design', 'Development', 'Data science']},
    subCategory				: { type: String, trim: true},
	material				: { type: String, trim: true},
	postedBy				: { type: Schema.Types.ObjectId, ref: 'User' },
	postedDate				: { type: Date, default: Date.now },
	status					: { type: String, enum: ['open','ordered', 'deleted'], trim: true },
	actionBy				: { type: Schema.Types.ObjectId, ref: 'User' }
		
});

module.exports = mongoose.model('service_catalog', serviceCatalogSchema, 'service_catalog');