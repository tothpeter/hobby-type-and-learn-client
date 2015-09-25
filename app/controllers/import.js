import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  postImportUrl: Ember.computed(function() {
    var adapter = this.container.lookup('adapter:application');
    return adapter.buildURL() + '/cards/import';
  }),

  importText: '',
  separatorType: 'tab',
  separatorOther: '',

  separator: Ember.computed('separatorType', 'separatorOther', function() {
    const separators = {
      'tab': '\t',
      'other': this.get('separatorOther')
    }

    return separators[this.get('separatorType')];
  }),

  cards: Ember.computed('importText', 'separator', function() {
    var cards = [],
        importText = this.get('importText');

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

  actions: {
    uploaded: function(/*file, response, xhrEvent*/) {
      alert('Upload was successful.');
    },

    import: function(importFromText = true) {
      if (importFromText) {
        Ember.$.ajax({
          url: this.get('postImportUrl'),
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: 'JSON',
          data: JSON.stringify({cards: this.get('cards').toArray()}),
        })
        .done(function() {
          console.log("success");
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });
        
      }
      else {
        
      }
    }
  }
});