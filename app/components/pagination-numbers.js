import Ember from 'ember';

export default Ember.Component.extend({
  meta: null,

  display: Ember.computed('meta.total-pages', function() {
    return this.get('meta.total-pages') > 1;
  }),

  prevPage: function() {
    return this.get('meta.prev-page');
  }.property('meta.prev-page'),

  nextPage: function() {
    return this.get('meta.next-page');
  }.property('meta.next-page'),

  pageRange: function () {
    var result = Ember.A();

    for(var i = 1; i <= this.get('meta.total-pages'); i++) {
      result.push(i);
    }

    return result;
  }.property('meta.total-pages')
});
