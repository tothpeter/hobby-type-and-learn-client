import Ember from 'ember';

export default Ember.Component.extend({
  model: null,

  actions: {
    ok: function() {
      this.sendAction('ok', {model: this.get('model')});
    }
  },

  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
