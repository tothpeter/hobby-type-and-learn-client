import Ember from 'ember';

export default Ember.Component.extend({

  _inbound_actions_setup: function() {
    Ember.run.schedule('afterRender', this, function() {
      this.set('actionReceiver', this);
    });
  }.on('init'),

  contentUpdated: function() {
    if (this.$() !== undefined) {
      this.setup();
    }
  },

  setup: Ember.on('didInsertElement', function() {
    var _this = this;

    this.$().find(this.get('itemSelector')).draggable({
      appendTo: 'body',
      cursorAt: {
        left: -14,
        top: 12,  
      },
      helper: function() {
        return '<div class="label-drag-helper">' + Ember.$(this).find(_this.get('helperTextSelector')).text() + '</div>';
      }
    });
  })
});
