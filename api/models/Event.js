/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
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
		},
		activities: {
			collection: 'activity',
			via: 'event',
			dominant: true
		}
	}
};
