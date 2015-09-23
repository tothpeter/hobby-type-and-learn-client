import Ember from 'ember';
import PostValidations from 'type-and-learn-client/mixins/validations/post';

export default Ember.Controller.extend(PostValidations, {
  postImportUrl: Ember.computed(function() {
    var adapter = this.container.lookup('adapter:application');
    return adapter.buildURL() + '/cards/import';
  }),

  actions: {
    uploaded: function(/*file, response, xhrEvent*/) {
      alert('Upload was successful.');
    }
  }
});