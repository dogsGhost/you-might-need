import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  }
});
