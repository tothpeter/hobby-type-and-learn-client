import Ember from 'ember';

export function initialize(application) {
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

      setAuthCookie(this.get('content.secure.token'), 365);
    },

    authorizationHeader: Ember.computed('content.secure.token', function() {
      return 'Token token="%@"'.fmt(this.get('content.secure.token'));
    }),

    fetchCurrentUser: function() {
      const _this = this,
            adapter = application.container.lookup('adapter:application');

      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          url: adapter.buildURL() + '/current_user',
          beforeSend: function(request) {
            request.setRequestHeader('Authorization', _this.get('authorizationHeader'));
          },
        })
        .done(function(currentUser) {
          Ember.run(function() {
            if (currentUser == null) {
              _this.invalidate();
              reject();
            }
            else {
              _this.setCurrentUser(currentUser);
              resolve();
            }
          });
        })
        .fail(function() {
          Ember.run(function() {
            setAuthCookie('', -1);
            reject();
          });
        });

      });

      return promise;
    },

    logout: function() {
      const token =  this.get('content.secure.token'),
            adapter = application.container.lookup('adapter:application');
      
      this.invalidate();

      Ember.$.ajax({
        url: adapter.buildURL() + '/sessions/' + token,
        method: 'DELETE'
      });

      setAuthCookie('', -1);
    }
  });

  var setAuthCookie = function setAuthCookie(val, days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = '; expires=' + date.toUTCString();

      document.cookie = 'auth_token_for_web=' + val + expires + '; path=/; domain=' + location.host + ';';
  };
}

export default {
  name: 'custom-session',
  initialize: initialize
};