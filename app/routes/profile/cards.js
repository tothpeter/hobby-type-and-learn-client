import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  model: function(params) {
    var query = {};

    if(Ember.isPresent(params.page)) {
      query.page = params.page;
    }

    return this.store.query('card', query);
  }
});
