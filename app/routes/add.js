import Ember from 'ember';

export default Ember.Route.extend({
  model() {

  },

  beforeModel() {
    if (!this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  }
});
