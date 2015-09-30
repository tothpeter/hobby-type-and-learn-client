import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  socketEvents: Ember.inject.service(),

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
        line = '';

    for (var i = 0, len = lines.length; i < len; i++) {
      line = lines[i].split(this.get('separator'));
      
      cards.push({
        sideA: line[0],
        sideB: line[1],
        proficiencyLevel: line[2]
      });
    }

    return cards;
  }),

  cardsFromFile: {},

  actions: {
    uploaded: function(file, response /*, xhrEvent*/) {
      this.set('cardsFromFile', response.cards);
    },

    import: function(cardsType) {
      var _this = this;

      Ember.$.ajax({
        url: this.get('postImportUrl'),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify({cards: this.get(cardsType).toArray()}),
      })
      .done(function() {
        if (cardsType === 'cardsFromFile') {
          _this.set(cardsType, []);
        }
        else {       
          _this.set('importText', '');
        }

        _this.get('socketEvents').subscribe('cards.import.finished', {user_id: _this.get('session.currentUser.id') * 1});

        alert('We got your request, it is now in our processing que.');
      })
      .fail(function() {
        alert('Something went wrong, please try later.');
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

    }
  }
});