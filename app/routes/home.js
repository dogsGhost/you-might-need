import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (!this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  },

  // model() {
  //   return this.store.query('item', {
  //     orderBy: 'userId',
  //     equalTo: this.get('session').uid
  //   });
  // }
});
