import Ember from 'ember';
import PaginationRouteMixin from 'type-and-learn-client/mixins/routes/pagination';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Mixin.create(PaginationRouteMixin, AuthenticatedRouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    sortOrder: {
      refreshModel: true
    }
  },

  afterModel: function() {
    if (this.controller !== undefined) {
      Ember.run.schedule('afterRender', this, function() {
        this.controller.get('jquiDroppable').contentUpdated();
      });
    }
  },

  actions: {
    createCard: function() {
      var controller = this.controllerFor('profile.cards.new'),
          card = this.store.createRecord('card', controller.get('model')),
          _this = this;

      card.set('user', this.get('session.currentUser'));

      card.save().then(function() {
        controller.successfulSave();
        _this.refresh();
      },
      function(error) {
        controller.failedSave(error);
      });
    },

    updateCard: function(options) {
      var card = options.model,
          controller = this.controllerFor('profile.cards.edit');

      card.save().then(function() {
        controller.successfulSave();
      },
      function(error) {
        card.rollbackAttributes();
        controller.failedSave(error);
      });
    },

    updateCardRating: function(params) {
      var card = params.item;

      card.set('proficiencyLevel', params.rating);

      card.save().then(null,
      function() {
        card.rollbackAttributes();
      });
    },

    removeCard: function(card) {
      if (window.confirm('Are you sure, you want to delete this card?')) {
        var _this = this;
        card.destroyRecord().then(function() {
          _this.refresh();
        });
      }
    }
  }
});
