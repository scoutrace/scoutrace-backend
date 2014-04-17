// Set up paths for libraries
require.config({
	paths: {
		'jquery': '../Libraries/jQuery/jquery',
		'text': '../Libraries/Require/Plugins/Text/text',
		'ehbs': '../Libraries/Require/Plugins/EHBS/ehbs',
		//'ember': '../Libraries/Ember/ember',
		'ember': '../Libraries/Ember/ember-debug',
		'ember-data': '../Libraries/EmberData/ember-data.min',
		'bootstrap': '../Libraries/Bootstrap/js/bootstrap.min',
		'handlebars': '../Libraries/Handlebars/handlebars',
		'leaflet': '../Libraries/Leaflet/leaflet'
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

