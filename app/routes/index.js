import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('session').content.isAuthenticated) {
      this.transitionTo('home');
    }
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('email', '');
    controller.set('password', '');
  }
});
