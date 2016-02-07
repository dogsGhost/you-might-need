import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(() => {
      // catch errors here
    });
  },

  actions: {
    signIn(email, password) {
      this
        .get('session')
        .open('firebase', {
          provider: 'password',
          email,
          password
        })
        .then((data) => {
          console.log(data);
          this.transitionTo('home');
        });
    },

    signOut() {
      this.get('session').close();
      this.transitionTo('index');
    }
  }
});
