import Ember from 'ember';

export default Ember.Component.extend({
  setup: Ember.on('didInsertElement', function() {
    var _this = this;

    this.$().find(this.get('itemSelector')).draggable({
      appendTo: 'body',
      cursorAt: {
        left: -14,
        top: -1
      },
      helper: function() {
        return '<div class="label-drag-helper">' + Ember.$(this).find(_this.get('helperTextSelector')).text() + '</div>';
      }
    });
  })
});
