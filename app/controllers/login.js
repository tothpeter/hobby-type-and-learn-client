import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');

      if (!credentials.identification || !credentials.password) {
        return false;
      }

      var _this = this;

      this.get('session').authenticate('simple-auth-authenticator:devise', credentials).then(function() {
        _this.session.setCurrentUser();
        _this.transitionToRoute('profile');
      }, function(response) {
        // authentication failed
        alert(response.errors);
      });
    }
  }
});