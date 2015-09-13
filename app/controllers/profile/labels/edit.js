import Ember from 'ember';
import LabelValidations from 'type-and-learn-client/mixins/validations/label';

export default Ember.Controller.extend(LabelValidations, {
  showErrors: true,
  isSaving: false,

  actions: {
    updateLabel: function() {
      if (this.get('isValid')) {
        this.set('isSaving', true);
      }

      return this.get('isValid');
    },

    cancel: function() {
      this.get('model').rollbackAttributes();
      this.send('removeModal');
    }
  },

  successfulSave: function() {
    this.set('isSaving', false);

    var _this = this;

    Ember.run.later(function() {
      _this.send('removeModal');
    }, 0);
  },

  failedSave: function(message) {
    this.set('isSaving', false);
    alert('Error: ' + message);
  }
});