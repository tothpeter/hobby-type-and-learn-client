import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var label = this.modelFor('profile.labels');
    return label.songs;
  }
});
