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
          _this = this;

      label.save().then(function() {
        _this.send('removeModal');
      },
      function(message) {
        label.rollback();
        alert('Error: ' + message);
      });
    }
  }
});
