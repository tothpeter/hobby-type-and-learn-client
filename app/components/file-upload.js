import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['file-upload-dropzone'],
  acceptedFiles: null,
  success: null,

  insertDropzone: function() {
    var _this = this;

    this.$().dropzone({
      url: this.get('url'),
      previewsContainer: false,
      acceptedFiles: this.get('acceptedFiles'),
      headers: { 'Authorization': this.get('session.authorizationHeader') },

      error: function(file, error, xhr) {
        if (_this.get('error')) {
          _this.sendAction('error', file, error, xhr);
          return false;
        }

        if (xhr === undefined) {
          alert(error);
        }
        else {
          if (xhr.status === 401) {
            if (_this.get('referenceToOutside')) {
              _this.get('referenceToOutside').send('error', JSON.parse(xhr.response));
              return true;
            }
          }
          alert('Something went wrong, please try later.');
        }
      },

      success: function(file, response, xhrEvent) {
        _this.sendAction('success', file, response, xhrEvent);
      }
    });
  }.on('didInsertElement')
});
