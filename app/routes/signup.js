import Ember from 'ember';
import Firebase from 'firebase';
import ENV from './../config/environment';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('session').content.isAuthenticated) {
      this.transitionTo('index');
    }
  },

  actions: {
    signUp(email, password) {
      const ref = new Firebase(ENV.firebase);
      ref.createUser({
        email,
        password
      }, (error, userData) => {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          this.set('signUpSuccess', true);
          console.log("Successfully created user account with uid:", userData.uid);
          // this.transitionTo('index');
        }
      });

    }
  }
});
