import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', function() {
    this.route('add');
  });
  this.route('demo', function() {});
  this.route('signup');
  this.route('reset');
});

export default Router;
