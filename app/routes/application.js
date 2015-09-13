import Ember from 'ember';

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function() {
    if (this.session.get('isAuthenticated')) {
      const currentUserPayload = Ember.$('meta[name=current-user]')[0].content;
      return this.session.setCurrentUser(JSON.parse(currentUserPayload));
    }
  },

  actions: {
    showModal: function(name, model, controller = 'application') {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model,
        controller: controller
      });
    },
    removeModal: function() {
      Ember.$('.modal').modal('hide');
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});