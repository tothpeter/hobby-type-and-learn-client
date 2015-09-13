import Ember from 'ember';
import LabelValidations from 'type-and-learn-client/mixins/validations/label';

export default Ember.Controller.extend(LabelValidations, {
  model: {
    title: ''
  },

  showErrors: false,
  isSaving: false,

  actions: {
    createLabel: function() {
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
    this.set('showErrors', false);
    this.set('isSaving', false);

    this.set('model.title', '');

    var _this = this;

    Ember.run.later(function() {
      _this.send('removeModal');
    }, 0);
  },

  failedSave: function(message) {
    alert('Error: ' + message);
  }
});