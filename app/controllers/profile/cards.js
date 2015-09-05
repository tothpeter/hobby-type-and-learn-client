import Ember from 'ember';

export default Ember.Controller.extend({
  sideA: "",
  sideB: "",
  proficiencyLevel: 0,
  // selectedLabel: null,
  selectedLabels: Ember.computed('session.currentUser.labels', 'model.labels', function() {
    return this.get('model').get('labels').toArray();
  }),

  labels: Ember.computed('session.currentUser.labels', function() {
    return this.store.peekAll('label').toArray();
  }),

  // selection: Ember.computed('labels', function() {
  //   return this.get('labels')[0];
  // })

  
});