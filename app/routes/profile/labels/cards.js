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
          controller = this.controllerFor('profile.cards.edit');

      card.save().then(function() {
        controller.successfulSave();
      },
      function(message) {
        card.rollbackAttributes();
        controller.failedSave(message);
      });
    },

    removeCard: function(card) {
      if (window.confirm('Are you sure, you want to delete this card?')) {
        card.destroyRecord();
      }
    }
  }
});
