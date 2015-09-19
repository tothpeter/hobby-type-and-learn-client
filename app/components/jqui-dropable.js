import Ember from 'ember';

export default Ember.Component.extend({

  _inbound_actions_setup: function() {
    Ember.run.schedule('afterRender', this, function() {
      this.set('actionReceiver', this);
    });
  }.on('init'),

  contentUpdated: function() {
    this.setup();
  },

  setup: Ember.on('didInsertElement', function() {
    var _this = this;

    this.$().find(this.get('itemSelector')).droppable({
      hoverClass: "ui-state-hover",

      drop: function(event, ui) {
        _this.sendAction('drop', {event: event, ui: ui});
      }
    });

  })
});
