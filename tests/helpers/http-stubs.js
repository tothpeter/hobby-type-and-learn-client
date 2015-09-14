export default {
  stubGetCurrentUser: function(pretender, data) {
    pretender.get('current_user', function() {
      return [200, {"Content-Type": "application/json"}, JSON.stringify(data)];
    });
  }
};