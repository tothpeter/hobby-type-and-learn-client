import Ember from 'ember';
import CardsRouteMixin from 'type-and-learn-client/mixins/routes/cards';

export default Ember.Route.extend(CardsRouteMixin, {
  model: function(params) {
    var query = {};

    if (Ember.isPresent(params.page)) {
      query.page = params.page;
    }

    if (Ember.isPresent(params.sortBy)) {
      query.sort = params.sortBy;
      query.sort_order = params.sortOrder;
    }

    return this.store.query('card', query);
  }
});
