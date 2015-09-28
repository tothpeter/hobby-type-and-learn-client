import Ember from 'ember';

export default Ember.Service.extend({
  socketService: Ember.inject.service('websockets'),

  socket: null,

  subscribe: function(event, eventParams = {}) {

    if (this.get('socket') === null) {
      this.set('socket', this.get('socketService').socketFor('ws://localhost:9292/'));
      this.get('socket').on('message', this.messageHandler, this);
    }

    var message = {
      "type":"subscribe",
      "event": eventParams
    };

    message.event['type'] = event;

    this.get('socket').on('open', function() {
      this.send(JSON.stringify(message));
    }, this.get('socket'));

  },

  messageHandler: function(event) {
    var response = JSON.parse(event.data);

    if (response.type === 'event') {
      this.eventHandler(response.event)
    }
  },

  eventHandler: function(event) {
    if (event.type === 'cards.import.finished') {
      alert('Your card import has been finished.');
      this.get('socket').close();
      this.set('socket', null);
    }
  }
});
