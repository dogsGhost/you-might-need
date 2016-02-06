import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(() => {
      // catch errors here
    });
  },

  actions: {
    signOut() {
      this.get('session').close();
    }
  }
});
