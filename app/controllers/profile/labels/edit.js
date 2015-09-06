import Ember from 'ember';
import LabelValidations from 'type-and-learn-client/mixins/validations/label';

export default Ember.Controller.extend(LabelValidations, {
  showErrors: true,

  actions: {
    updateLabel: function() {
      return this.get('isValid');
    },

    cancel: function() {
      this.get('model').rollback();
      this.send('removeModal');
    }
  },

  failedSave: function(message) {
    alert('Error: ' + message);
  }
});