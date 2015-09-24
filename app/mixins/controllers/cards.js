import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    sortBy: 'sort',
    sortOrder: 'sort_order',
    searchTerm: 's',
    page: 'page'
  },

  sortBy: 'created_at',
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
        else {
          order = 'desc';
        }
      }
      
      this.set('sortBy', column);
      this.set('sortOrder', order);
    }
  }
});
