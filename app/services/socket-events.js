import Ember from 'ember';

export default Ember.Service.extend({
  socket: null,

  subscribe: function(event, eventParams = {}) {

    var _this = this,
        message = {
      "type":"subscribe",
      "event": eventParams
    };

    message.event['type'] = event;

    if (this.get('socket') === null) {
      this.set('socket', new WebSocket('ws://localhost:9292'));
    }

    this.get('socket').onopen = function() {
      _this.get('socket').send(JSON.stringify(message));
    };
    
    this.get('socket').onmessage = function(event) {
      _this.messageHandler(event);
    };

  },

  messageHandler: function(event) {
    var message = JSON.parse(event.data);

    if (message.type === 'event') {
      this.eventHandler(message.event);
    }
  },

  eventHandler: function(event) {
    var eventHandlers = {
      'cards.import.finished': 'cardsImportFinished'
    };

    if (eventHandlers[event.type] === undefined) {
      console.log('Unhandled even has come back from server');
    }
    else {
      this[eventHandlers[event.type]]();
    }
  },

  cardsImportFinished: function() {
    alert('Your card import has been finished.');
    this.get('socket').close();
    this.set('socket', null);
  }
});
