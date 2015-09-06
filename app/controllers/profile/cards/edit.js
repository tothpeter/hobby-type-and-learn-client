import Ember from 'ember';

export default Ember.Controller.extend({
  selectedLabels: Ember.computed('session.currentUser.labels', 'model.labels', function() {
    return this.get('model').get('labels').toArray();
  }),

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});