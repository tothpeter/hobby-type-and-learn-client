import Ember from 'ember';

export default Ember.Controller.extend({
  model: {
    sideA: '',
    sideB: '',
    proficiencyLevel: 0,
    labels: []
  },

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  })
});