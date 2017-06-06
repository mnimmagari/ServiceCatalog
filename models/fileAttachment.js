'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var fileAttachmentRefSchema = new mongoose.Schema({

	refDoc						: { type: String },
  	attachment					: [{ type: String}]
	});

module.exports = mongoose.model('fileAttachment_ref', fileAttachmentRefSchema);