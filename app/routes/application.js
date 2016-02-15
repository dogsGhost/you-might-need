import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(() => {
      // catch errors here
    });
  },

  actions: {
    signIn(email, password) {
      const creds = {
        email,
        password,
        provider: 'password'
      };
      const testing = Ember.testing;
      const waiter = () => false;

      if (testing) { Ember.Test.registerWaiter(waiter); }

      this.get('session').open('firebase', creds).then(() => {
        if (testing) { Ember.Test.unregisterWaiter(waiter); }
        window.scrollTo(0, 0);
        this.transitionTo('home');
      });
    },

    signOut() {
      this.get('session').close();
      this.store.unloadAll();
      this.transitionTo('index');
    }
  }
});
