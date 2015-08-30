import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    createLabel: function() {
      var controller = this.controllerFor('profile.labels');
      var label = this.store.createRecord('label', controller.getProperties('title'));
      var _this = this;
      
      label.save().then(function() {
        $('.modal').modal('hide');
        _this.send('removeModal');
      },
      function(message) {
        alert('Error: ' + message);
      });
    }
  }
});
