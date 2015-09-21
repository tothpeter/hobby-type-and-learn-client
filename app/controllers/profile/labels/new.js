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

    Ember.run.schedule('afterRender', this, function(){
      this.send('removeModal');
    });
  },

  failedSave: function(error) {
    this.set('isSaving', false);
    
    if (error.errors.status === 422) {
      // TODO handle validation errors
      return false;
    }
    // alert('Error: ' + error);

    this.send('error', error);
  }
});