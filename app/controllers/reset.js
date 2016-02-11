import Ember from 'ember';
import Firebase from 'firebase';
import ENV from 'you-might-need/config/environment';

export default Ember.Controller.extend({
  email: '',
  resetSuccess: false,
  errorMsg: '',

  actions: {
    resetPassword() {
      const ref = new Firebase(ENV.firebase);

      ref.resetPassword({ email: this.get('email') }, (err) => {
        if (err) {
          switch (err.code) {
            case 'INVALID_USER':
              this.set(
                'errorMsg',
                'The specified user account does not exist.'
              );
              break;
            default:
              this.set(
                'errorMsg',
                'Sorry, there was an error resetting your password'
              );
          }
        } else {
          this.set('showErrorMsg', false);
          this.set('resetSuccess', true);
          this.set('email', '');
        }
      });
    }
  }
});
