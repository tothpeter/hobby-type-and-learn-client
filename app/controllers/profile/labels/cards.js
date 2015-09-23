import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    sortOrder: 'sort_order',
    searchTerm: 's',
    page: 'page'
  },

  sortBy: null,
  page: 1,
  sortOrder: 'desc',

  actions: {
    changeSort: function(column) {
      var order;

      if (column !== this.get('sortBy')) {
        order = 'desc';
      }
      else {
        if (this.get('sortOrder') === 'desc') {
          order = 'asc';
        }
        else if(this.get('sortOrder') === 'asc'){
          order = 'desc';
          column = null;
        }
      }
      
      this.set('sortBy', column);
      this.set('sortOrder', order);
    }
  }
});