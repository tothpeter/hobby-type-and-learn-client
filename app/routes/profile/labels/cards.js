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

      var controller = this.controllerFor('profile.cards');
      var card = this.store.createRecord('card', controller.getProperties('sideA', 'sideB', 'proficiencyLevel'));
      var _this = this;

      card.set('user', this.get('session.currentUser'));

      if (controller.get('selectedLabel')) {
        card.get('labels').pushObjects(controller.get('selectedLabel'));
      }

      card.save().then(function() {
        _this.send('removeModal');

        controller.set('sideA', '');
        controller.set('sideB', '');
        controller.set('proficiency_level', 0);
      },
      function(message) {
        alert('Error: ' + message);
      });
    }
  }
});
