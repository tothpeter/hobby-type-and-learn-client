import Ember from 'ember';

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function() {
    if (this.session.get('isAuthenticated')) {
      const currentUserPayload = Ember.$('meta[name=current-user]')[0],
            _this = this;
      
      if (!currentUserPayload) {
        return this.session.fetchCurrentUser().then(null,
        function() {
          _this.transitionTo('/');
        });
      }
      
      this.session.setCurrentUser(JSON.parse(currentUserPayload.content));
    }
  },

  actions: {
    error: function(error) {

      if (error && error.errors.status === 401) {
        // TODO: show login modal
        // After solve, redirect to the wanted route if there was any:
        // this.transitionTo(transition.targetName);
        this.transitionTo('login');
        return false;
      }
      
      return true;
    },

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