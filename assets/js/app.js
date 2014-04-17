// Set up paths for libraries
require.config({
	paths: {
		'jquery': '../libraries/jQuery/jquery',
		'text': '../libraries/Require/Plugins/Text/text',
		'ehbs': '../libraries/Require/Plugins/EHBS/ehbs',
		//'ember': '../libraries/Ember/ember',
		'ember': '../libraries/Ember/ember-debug',
		'ember-data': '../libraries/EmberData/ember-data.min',
		'bootstrap': '../libraries/Bootstrap/js/bootstrap.min',
		'handlebars': '../libraries/Handlebars/handlebars',
		'leaflet': '../libraries/Leaflet/leaflet'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'ember': {
			deps: ['jquery', 'handlebars'],
			exports: 'Ember'
		},
		'ember-data': {
			deps: ['ember'],
			exports: 'DS'
		},
		'ehbs': {
			deps: ['text', 'setup']
		},
		'setup': {
			deps: ['jquery', 'ember', 'ember-data']
		}
	},
	ehbs: {
		paths: {
			templates: "../templates",
			views: "Views/"
			//controllers: "foo/bar/controllers",
			//helpers: "foo/bar/helpers"
		}
	}
});

// Require libraries and run application
require(
	[
		'bootstrap',
		'ehbs',
		'ehbs!application',
		'ehbs!index',
		'ehbs!me',
		'ehbs!events',
		'ehbs!event',
		'ehbs!globalNavigation'
	], function() {
		App.advanceReadiness();
	}
);

