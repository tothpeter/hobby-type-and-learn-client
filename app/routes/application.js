import Ember from 'ember';

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function(transition) {
    if (this.session.get('isAuthenticated')) {
      return this.session.setCurrentUser(window.setupPreloadedUserParams);
    }
  }
});