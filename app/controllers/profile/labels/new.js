import Ember from 'ember';
import LabelValidations from 'type-and-learn-client/mixins/validations/label';

export default Ember.Controller.extend(LabelValidations, {
  model: {
    title: ''
  },

  showErrors: false,

  actions: {
    createLabel: function() {
      if(!this.get('isValid')) {
        this.set('showErrors', true);
      }

      return this.get('isValid');
    }
  },

  successfulSave: function() {
    this.send('removeModal');

    this.set('showErrors', false);

    this.set('model.title', '');
  },

  failedSave: function(message) {
    alert('Error: ' + message);
  }
});