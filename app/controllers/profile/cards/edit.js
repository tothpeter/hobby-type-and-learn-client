import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  showErrors: true,
  isSaving: false,

  actions: {
    updateCard: function() {
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
  },

  selectedLabels: Ember.computed('session.currentUser.labels', 'model.labels', function() {
    return this.get('model').get('labels').toArray();
  }),

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});