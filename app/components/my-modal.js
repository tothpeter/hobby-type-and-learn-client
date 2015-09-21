import Ember from 'ember';

export default Ember.Component.extend({
  model: null,
  isLoading: false,

  actions: {
    ok: function() {
      this.sendAction('ok', {model: this.get('model')});
    }
  },

  show: function() {
    this.$('.modal').modal()
    .on('hidden.bs.modal', function(event) {
      if (Ember.$(event.currentTarget).data('fire-close-action') !== false) {
        this.sendAction('close');
      }
    }.bind(this))
    .on('shown.bs.modal', function () {
      Ember.$(this).find('input').eq(0).focus();
    })
    .on('hide.bs.modal', function(event) {
      if(this.get('isLoading')) {
        alert('Loading please wait...');
        event.preventDefault();
      }
    }.bind(this));
  }.on('didInsertElement')
});
