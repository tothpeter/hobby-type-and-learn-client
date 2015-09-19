import Ember from 'ember';

export default Ember.Component.extend({
  setup: Ember.on('didInsertElement', function() {
    var _this = this;

    this.$().find('.list-group-item').droppable({
      hoverClass: "ui-state-hover",

      drop: function(event, ui) {
        _this.sendAction('drop', {event: event, ui: ui});
      }
    });

  })
});
