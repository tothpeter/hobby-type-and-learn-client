import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  showErrors: true,

  actions: {
    createCard: function() {
      return this.get('isValid');
    },

    cancel: function() {
      this.get('model').rollbackAttributes();
      this.send('removeModal');
    }
  },

  selectedLabels: Ember.computed('session.currentUser.labels', 'model.labels', function() {
    return this.get('model').get('labels').toArray();
  }),

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});