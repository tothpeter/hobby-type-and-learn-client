import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    createLabel: function() {
      var controller = this.controllerFor('profile.labels.new'),
          label = this.store.createRecord('label', controller.get('model'));

      // label.set('position', this.get('session.currentUser.labels.length') + 1);
      
      label.save().then(function() {
        controller.successfulSave();
      },
      function(message) {
        controller.failedSave(message);
      });
    },

    updateLabel: function(options) {
      var label = options.model,
          controller = this.controllerFor('profile.labels.edit');

      label.save().then(function() {
        controller.successfulSave();
      },
      function(message) {
        label.rollbackAttributes();
        controller.failedSave(message);
      });
    },

    removeLabel: function(label) {
      if (window.confirm('Are you sure, you want to delete this label?')) {
        label.destroyRecord();
      }
      // TODO: redirect to profile if we stay on the deleted path
    }
  }
});
