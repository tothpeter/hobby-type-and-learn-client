import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');

  this.route('profile', function() {
    this.route('labels', {path: 'labels/:id'}, function() {
      this.route('cards');
    });
  });
  this.route('login');
});

export default Router;
