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
      this.set('currentUser', user);
    }
  });
}

export default {
  initialize: initialize
};