// Remove previous content
$('.noJS').remove();

Ember.LOG_BINDINGS = true;

// Initialize the app
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});
App.deferReadiness();

// Set up routes
App.Router.map(function() {
	this.resource('login');
	this.resource('events', function() {
		this.resource('event', {path: ':event_id'});
	});
	this.resource('me');
});

// Create navigation view
/*App.GlobalNavigationView = Ember.View.extend({
 templateName: 'global-navigation'
 });*/

// Set up the REST adapter
App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: '',
	primaryKey: 'identifier'
});

//App.ApplicationSerializer = DS.RESTSerializer.extend({
App.ApplicationSerializer = DS.JSONSerializer.extend({
	primaryKey: 'identifier',
	serialize: function(record, options) {
		// Use the original serializer as a starting point
		var json = this._super(record, options);

		// Add custom identifier field
		json.__identity = record.get('id');
		delete json.identifier;

		return json;
	}/**/
});

// Models
App.Event = DS.Model.extend({
	identifier: DS.attr('string'),
	title: DS.attr('string')
});

// Index route
App.IndexRoute = Ember.Route.extend({
	/*model: function() {
		return this.store.find('event');
	}*/
	model: function() {
		return {
			currentEvents: [
				{
					name: 'Det bedste løb',
					isAdmin: true,
					adminStatistics: {
						teams: 20,
						active: 10,
						finished: 5
					}
				},
				{
					name: 'Det løb hvor du deltager',
					isParticipant: true,
					participantStatistics: {
						activities: 20,
						finished: 5
					}
				},
				{
					name: 'Det andet løb hvor du deltager',
					isParticipant: true,
					participantStatistics: {
						finished: 5
					}
				},
				{
					name: 'Der hvor du er post',
					isCrew: true,
					activityStatistics: {
						teams: 20,
						active: 5,
						finished: 3
					}
				}
			]
		};
	}
});

// Events index route
App.EventsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('event');
	}
});

// Single event route
App.EventRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('event', params.event_id);
	}
});

// Event controller
App.EventController = Ember.ObjectController.extend({
	isEditing: false,
	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		doneEditing: function() {
			this.set('isEditing', false);

			if (Ember.isEmpty(this.get('model.title'))) {
				this.set('model.title', 'Unavngivet løb');
			}
			this.get('model').save().then(
				function() {},
				function(response) {
					console.log('response', response);
					alert('Løbet kunne desværre ikke gemmes.\nPrøv igen lige om lidt.\nFejlkode: ' + response.status);
				}
			);
		},
		cancelEditing: function() {
			this.set('isEditing', false);
			this.get('model').rollback();
		}
	}
});