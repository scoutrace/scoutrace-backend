App.FocusedTextField = Ember.TextField.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});
