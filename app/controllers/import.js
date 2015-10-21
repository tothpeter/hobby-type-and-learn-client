import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  socketEvents: Ember.inject.service(),
  notify: Ember.inject.service(),

  postImportUrl: Ember.computed(function() {
    var adapter = this.container.lookup('adapter:application');
    return adapter.buildURL() + '/cards/import';
  }),

  postPreviewImportUrl: Ember.computed(function() {
    var adapter = this.container.lookup('adapter:application');
    return adapter.buildURL() + '/cards/preview_import';
  }),

  importText: '',
  separatorType: 'tab',
  separatorOther: '',

  setupTextarea: function() {
    Ember.run.schedule('afterRender', function() {
      Ember.$('.ember-text-area').on('keydown', function(event) {
        if (event.keyCode === 9) {

          // get caret position/selection
          var val = this.value,
              start = this.selectionStart,
              end = this.selectionEnd;

          // set textarea value to: text before caret + tab + text after caret
          this.value = val.substring(0, start) + '\t' + val.substring(end);

          // put caret at right position again
          this.selectionStart = this.selectionEnd = start + 1;

          // prevent the focus lose
          event.preventDefault();
          return false;
        }
      });
    });
  }.on('init'),


  separator: Ember.computed('separatorType', 'separatorOther', function() {
    const separators = {
      'tab': '\t',
      'other': this.get('separatorOther')
    };

    return separators[this.get('separatorType')];
  }),

  cardsFromText: Ember.computed('importText', 'separator', function() {
    var cards = [],
        importText = this.get('importText');

    if (Ember.isEmpty(importText)) {
      return [];
    }

    var lines = importText.split('\n'),
        line = '',
        card;

    for (var i = 0, len = lines.length; i < len; i++) {
      line = lines[i].split(this.get('separator'));

      card = {
        sideA: line[0],
        sideB: line[1],
        proficiencyLevel: line[2] || 0
      };

      if (card.proficiencyLevel > 5) {
        card.proficiencyLevel = 5;
      }

      if (card.proficiencyLevel < 0) {
        card.proficiencyLevel = 0;
      }

      if (Ember.isEmpty(card.sideA) || Ember.isEmpty(card.sideB)) {
        card.invalid = true;
      }

      cards.push(card);
    }

    return cards;
  }),

  cardsFromFile: {},

  actions: {
    uploaded: function(file, response /*, xhrEvent*/) {
      var cards = response.cards;
      
      for (var i = 0, len = cards.length; i < len; i++) {
        
        if (cards[i].proficiencyLevel > 5) {
          cards[i].proficiencyLevel = 5;
        }

        if (cards[i].proficiencyLevel < 0) {
          cards[i].proficiencyLevel = 0;
        }

        if (Ember.isEmpty(cards[i].sideA) || Ember.isEmpty(cards[i].sideB)) {
          cards[i].invalid = true;
        }
      }

      this.set('cardsFromFile', cards);
    },

    import: function(cardsType) {
      var _this = this,
          cards = this.get(cardsType).toArray(),
          cardsToSave = [];

      for(var i = cards.length; i--;){
        if (!cards[i].invalid) {
          cardsToSave.push(cards[i]);
        }
      }

      Ember.$.ajax({
        url: this.get('postImportUrl'),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify({cards: cardsToSave}),
      })
      .done(function() {
        if (cardsType === 'cardsFromFile') {
          _this.set(cardsType, []);
        }
        else {       
          _this.set('importText', '');
        }

        _this.get('socketEvents').subscribe('cards.import.finished', {user_id: _this.get('session.currentUser.id') * 1});

        _this.get('notify').success('We got your request, it is now in our processing queue.');
      })
      .fail(function() {
        alert('Something went wrong, please try later.');
      });
    }
  }
});