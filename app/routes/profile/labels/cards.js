import Ember from 'ember';
import CardsRouteMixin from 'type-and-learn-client/mixins/routes/cards';

export default Ember.Route.extend(CardsRouteMixin, {
  model: function(params) {
    var label = this.modelFor('profile.labels');
    
    var query = {
      label_id: label.get('id')
    };

    if(Ember.isPresent(params.page)) {
      query.page = params.page;
    }

    return this.store.query('card', query);
  },

  afterModel: function() {
    if (this.controllerFor(this.routeName).get('jquiDroppable') !== undefined) {
      Ember.run.schedule('afterRender', this, function() {
        this.controllerFor(this.routeName).get('jquiDroppable').contentUpdated();
      });
    }
  }
});
