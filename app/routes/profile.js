import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    createLabel: function() {
      var controller = this.controllerFor('profile.labels');
      var label = this.store.createRecord('label', controller.getProperties('title'));
      var _this = this;
      
      label.save().then(function() {
        _this.send('removeModal');
        controller.set('title', '');
      },
      function(message) {
        alert('Error: ' + message);
      });
    },

    updateLabel: function(options) {
      var controller = this.controllerFor('profile.labels'),
          label = options.model,
          _this = this;

      label.setProperties(controller.getProperties('title'));
      
      label.save().then(function() {
        _this.send('removeModal');
        controller.set('title', '');
      },
      function(message) {
        label.rollback();
        alert('Error: ' + message);
      });
    }
  }
});
