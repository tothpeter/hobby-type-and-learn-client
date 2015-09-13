function initialize(application) {
  var session = application.container.lookup('simple-auth-session:main');

  session.reopen({
    setCurrentUser: function(preloadedUser) {
      if (preloadedUser === undefined) {
        preloadedUser = this.get('content.secure.user');
      }

      var store = application.container.lookup('service:store');

      store.pushPayload('user', preloadedUser);

      var user = store.peekRecord('user', preloadedUser.data.id);
      this.set('content.currentUser', user);

      var date = new Date();
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
      var expires = '; expires=' + date.toUTCString();

      document.cookie = 'auth_token_for_web=' + this.get('content.secure.token') + expires + '; path=/; domain=' + location.host + ';';
    },

    fetchCurrentUser: function() {
      const _this = this;
      const adapter = application.container.lookup('adapter:application');

      var promise = new Promise(function(resolve, reject) {
        $.ajax({
          url: adapter.buildURL() + '/current_user',
          beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Token token="' + _this.get('content.secure.token') + '"');
          },
        })
        .done(function(currentUser) {
          _this.setCurrentUser(currentUser);
          resolve();
        })
        .fail(function() {
          reject();
        });

      });

      return promise;
    }
  });
}

export default {
  initialize: initialize
};