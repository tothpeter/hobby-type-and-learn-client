import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');

      if (!credentials.identification || !credentials.password) {
        return false;
      }

      this.get('session').authenticate('simple-auth-authenticator:devise', credentials).then(function() {
        // authentication was successful
      }, function() {
        // authentication failed
      });
    }
  }
});