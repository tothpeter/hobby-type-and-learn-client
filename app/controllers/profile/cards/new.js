import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  model: {
    sideA: '',
    sideB: '',
    proficiencyLevel: 0,
    labels: []
  },

  displayValidation: false,

  actions: {
    createCard: function() {
      if(!this.get('isValid')) {
        this.set('displayValidation', true);
      }

      return this.get('isValid');
    }
  },

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});