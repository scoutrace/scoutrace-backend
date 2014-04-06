/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		id: {
			type: 'uuidv4'
		},
		name : {
			type : 'string',
			required : true
		},
		publicAvailable : {
			type : 'boolean'
		},
		startDate : {
			type : 'date'
		},
		endDate : {
			type : 'date'
		}
	},
	beforeCreate: function(data, callback) {
		var uuid = require('uuid');
		data.id = uuid.v4();
		return callback();
	}
};
