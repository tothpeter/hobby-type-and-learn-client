import Ember from 'ember';

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function() {
    if (this.session.get('isAuthenticated')) {
      const currentUserPayload = Ember.$('meta[name=current-user]')[0],
            _this = this;
      
      if (!currentUserPayload) {
        return this.session.fetchCurrentUser().then(
        function() {
          _this.session.logout();
        },
        function() {
          _this.transitionTo('/');
        });
      }
      
      this.session.setCurrentUser(JSON.parse(currentUserPayload.content));
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
    },

    logout: function() {
      this.get('session').logout();
      this.transitionTo('/');
    }
  }
});