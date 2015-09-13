import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  model: {
    sideA: '',
    sideB: '',
    proficiencyLevel: 0,
    labels: []
  },

  showErrors: false,
  isSaving: false,

  isNotSaving: Ember.computed('isSaving', function() {
    return !this.get('isSaving');
  }),

  actions: {
    createCard: function() {
      if(!this.get('isValid')) {
        this.set('showErrors', true);
      }
      else {
        this.set('isSaving', true);
      }

      return this.get('isValid');
    }
  },

  successfulSave: function() {
    this.set('isSaving', false);
    this.set('showErrors', false);

    this.set('model.sideA', '');
    this.set('model.sideB', '');
    this.set('model.proficiency_level', 0);
    this.set('model.labels', []);

    var _this = this;

    Ember.run.later(function() {
      _this.send('removeModal');
    }, 0);
  },

  failedSave: function(message) {
    this.set('isSaving', false);
    alert('Error: ' + message);
  },

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});