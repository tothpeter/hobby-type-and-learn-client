import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },
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
  
  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    controller.set('totalPages', model.get('meta.total-pages'));
  },

  actions: {
    createCard: function() {
      var controller = this.controllerFor('profile.cards.new'),
          card = this.store.createRecord('card', controller.get('model'));

      card.set('user', this.get('session.currentUser'));

      card.save().then(function() {
        controller.successfulSave();
      },
      function(message) {
        controller.failedSave(message);
      });
    },

    updateCard: function(options) {
      var card = options.model,
          _this = this;

      var controller = this.controllerFor('profile.cards.edit');
      card.set('labels', controller.get('selectedLabels'));
      // TODO: remove and add card to corresponding labels (has many there)

      card.save().then(function() {
        _this.send('removeModal');
      },
      function(message) {
        card.rollbackAttributes();
        controller.failedSave(message);
      });
    }
  }
});
