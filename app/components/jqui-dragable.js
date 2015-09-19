import Ember from 'ember';

export default Ember.Component.extend({
  setup: Ember.on('didInsertElement', function() {

    this.$().find('.list-group-item').draggable({
      appendTo: 'body',
      cursorAt: {
        left: -14,
        top: -1
      },
      helper: function(event) {
        return '<div class="label-drag-helper">' + $(this).find('a').text() + '</div>';
      }
    });
  })
});
