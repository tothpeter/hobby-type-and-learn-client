import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'page',
  ],

  page: 1,
  totalPages: null,

  prevPage: function() {
    return this.get('page') - 1;
  }.property('page'),

  nextPage: function() {
    return this.get('page') + 1;
  }.property('page'),

  isFirstPage: function() {
    return this.get('page') === 1;
  }.property('page'),

  isLastPage: function() {
    return this.get('page') >= this.get('totalPages');
  }.property('page', 'totalPages'),

  pageRange: function () {
    var result = Ember.A();

    for(var i = 1; i <= this.get('totalPages'); i++) {
      result.push(i);
    }

    return result;
  }.property('totalPages')
});