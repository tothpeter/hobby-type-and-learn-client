import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['title:asc'],

  labels: Ember.computed.sort('session.currentUser.labels', 'sortProperties')
});