import Ember from 'ember';
import Firebase from 'firebase';
import ENV from 'you-might-need/config/environment';

export default Ember.Controller.extend({
  showErrorMsg: false,

  signUpSuccess: false,

  actions: {
    signUp() {
      const newUser = {
        email: this.get('email'),
        password: this.get('password')
      };
      const ref = new Firebase(ENV.firebase);

      ref.createUser(newUser, (error) => {
        this.set('newUserSubmitted', true);
        this.set('showErrorMsg', false);

        if (error) {
          this.set('showErrorMsg', true);
          this.set('email', '');
          this.set('password', '');
          // console.log("Error creating user:", error);
        } else {
          this.set('showErrorMsg', false);
          this.set('signUpSuccess', true);
          this.set('email', '');
          this.set('password', '');
          // console.log("Successfully created user account with uid:", userData.uid);
          // this.transitionTo('index');
        }
      });
    }
  }
});
