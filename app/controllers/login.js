import Ember from 'ember';

export default Ember.Controller.extend({
  isLoading: false,

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');

      if (!credentials.identification || !credentials.password) {
        return false;
      }

      this.set('isLoading', true);

      var _this = this;

      this.get('session').authenticate('simple-auth-authenticator:devise', credentials).then(function() {
        _this.session.setCurrentUser();
        _this.transitionToRoute('profile');
        _this.set('isLoading', false);
      }, function(response) {
        _this.set('isLoading', false);
        alert(response.errors);
      });
    }
  }
});